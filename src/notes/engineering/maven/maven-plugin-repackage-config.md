# Spring Boot Maven Plugin `repackage` 配置踩坑笔记

## 1. 问题背景

在 `pom.xml` 中经常看到如下配置：

```xml
<plugin>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-maven-plugin</artifactId>
    <version>${spring-boot.version}</version>
    <configuration>
        <excludes>
            <exclude>
                <groupId>org.projectlombok</groupId>
                <artifactId>lombok</artifactId>
            </exclude>
        </excludes>
    </configuration>
    <executions>
        <execution>
            <id>repackage</id>
            <goals>
                <goal>repackage</goal>
            </goals>
        </execution>
    </executions>
</plugin>
```

问题：这段 `<executions>` 中的 `repackage` 有必要配置吗？

## 2. 结论速查

| 场景                                | 是否需要显式配置 `repackage` | 说明                                                   |
| ----------------------------------- | ---------------------------- | ------------------------------------------------------ |
| 继承了 `spring-boot-starter-parent` | 通常不需要                   | parent 的 `pluginManagement` 已默认绑定 `repackage`    |
| 未继承 parent，只导入 BOM           | 需要                         | 不显式声明时，`mvn package` 不会自动生成可执行 fat jar |
| 当前模块是库模块                    | 不需要                       | 库模块不需要可执行 jar，可省略或配置 `skip`            |
| 当前模块是可执行应用模块            | 需要确保 `repackage` 生效    | 继承 parent 可省略 execution；未继承 parent 则保留     |

### 2.1 继承了 `spring-boot-starter-parent`

如果项目继承了：

```xml
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>${spring-boot.version}</version>
</parent>
```

那么 `spring-boot-starter-parent` 已经默认配置了 `spring-boot-maven-plugin` 的 `repackage` execution。

因此通常可以精简为：

```xml
<plugin>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-maven-plugin</artifactId>
    <configuration>
        <excludes>
            <exclude>
                <groupId>org.projectlombok</groupId>
                <artifactId>lombok</artifactId>
            </exclude>
        </excludes>
    </configuration>
</plugin>
```

版本和 `<executions>` 都可以省略，因为 parent 已经管理。

> 注意：如果自己再写一个 `id` 不同的 execution，可能导致 `repackage` 执行两次，容易报错。execution 的 `id` 最好保持默认的 `repackage`。

### 2.2 没有继承 `spring-boot-starter-parent`

如果只是通过 `dependencyManagement` 导入了 `spring-boot-dependencies` BOM，但没有继承 `spring-boot-starter-parent`，那么通常需要显式声明 `repackage` execution。

例如：

```xml
<plugin>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-maven-plugin</artifactId>
    <version>${spring-boot.version}</version>
    <configuration>
        <excludes>
            <exclude>
                <groupId>org.projectlombok</groupId>
                <artifactId>lombok</artifactId>
            </exclude>
        </excludes>
    </configuration>
    <executions>
        <execution>
            <id>repackage</id>
            <goals>
                <goal>repackage</goal>
            </goals>
        </execution>
    </executions>
</plugin>
```

原因：`repackage` 虽然默认绑定到 `package` 阶段，但如果不通过 `<execution>` 声明，Maven 不会在 `mvn package` 时自动执行它。

结果就是：

- `mvn package` 只生成普通 jar
- 不会生成 Spring Boot 可执行 fat jar
- 只能手动执行：

```bash
mvn spring-boot:repackage
```

### 2.3 如果当前模块是库模块

如果这个模块只是被其他模块依赖，不需要通过 `java -jar` 启动，那么不需要 `repackage`。

可以选择：

**方式一：不声明 `spring-boot-maven-plugin`**

```xml
<!-- 不添加该插件 -->
```

**方式二：声明插件但跳过 repackage**

```xml
<plugin>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-maven-plugin</artifactId>
    <configuration>
        <skip>true</skip>
    </configuration>
</plugin>
```

否则库模块可能被错误地打成可执行 jar，导致依赖方使用异常。

### 2.4 踩坑点总结

**坑点一：以为声明了插件就会自动 repackage**

不一定。

- 继承 `spring-boot-starter-parent`：parent 已帮你绑定，通常会自动执行。
- 未继承 parent：必须显式配置 `<executions>`，否则 `mvn package` 不会自动 repackage。

---

**坑点二：继承 parent 后重复配置 execution**

继承 parent 后，如果又自己写了一个 `id` 不同的 `repackage` execution，可能导致重复执行。

建议：

- 继承 parent 时，直接省略 `<executions>`
- 如果保留，`id` 使用默认的 `repackage`

---

**坑点三：库模块误打可执行 jar**

库模块不需要 `repackage`。

如果库模块被打成 Spring Boot fat jar，其他模块依赖它时可能出现类加载、资源路径、依赖冲突等问题。

---

**坑点四：`excludes` 排除 Lombok**

下面这段配置是为了避免 Lombok 被打进最终 fat jar：

```xml
<excludes>
    <exclude>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
    </exclude>
</excludes>
```

通常 Lombok 的 scope 是 `provided`，本身不会被打包，但显式排除更干净。

### 2.5 排查方法

**1. 查看最终生效的 POM**

```bash
mvn help:effective-pom
```

检查 `spring-boot-maven-plugin` 是否已经有 `repackage` execution。

**2. 打包后检查产物**

```bash
mvn clean package
```

观察 `target` 目录：

- 是否生成了可执行 jar
- 是否有 `.original` 文件
- 是否可以通过 `java -jar` 启动

**3. 查看 jar 内部结构**

```bash
jar tf target/your-app.jar
```

如果看到 `BOOT-INF/`、`org/springframework/boot/loader/` 等目录，说明是 Spring Boot fat jar。

### 2.6 推荐配置

**1. 继承 `spring-boot-starter-parent` 的应用模块**

```xml
<plugin>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-maven-plugin</artifactId>
    <configuration>
        <excludes>
            <exclude>
                <groupId>org.projectlombok</groupId>
                <artifactId>lombok</artifactId>
            </exclude>
        </excludes>
    </configuration>
</plugin>
```

**2. 未继承 parent 的应用模块**

```xml
<plugin>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-maven-plugin</artifactId>
    <version>${spring-boot.version}</version>
    <configuration>
        <excludes>
            <exclude>
                <groupId>org.projectlombok</groupId>
                <artifactId>lombok</artifactId>
            </exclude>
        </excludes>
    </configuration>
    <executions>
        <execution>
            <id>repackage</id>
            <goals>
                <goal>repackage</goal>
            </goals>
        </execution>
    </executions>
</plugin>
```

**3. 库模块**

```xml
<plugin>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-maven-plugin</artifactId>
    <configuration>
        <skip>true</skip>
    </configuration>
</plugin>
```

或者直接不声明该插件。

## 3. 一句话总结

继承 `spring-boot-starter-parent` 时，`repackage` execution 通常是冗余配置；未继承 parent 时，必须显式配置，否则 `mvn package` 不会自动生成可执行 Spring Boot jar；库模块则不需要 `repackage`。
