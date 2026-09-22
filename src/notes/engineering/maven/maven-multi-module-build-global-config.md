# Maven 多模块父 POM 配置上提笔记：build 中哪些内容适合全局化

> 适用场景：多模块 Maven / Spring Boot 项目，使用顶级父 POM 统一管理版本、插件和构建行为。

## 1. 结论速查

| 配置项                                                 | 是否可放顶级父 POM | 推荐位置                    | 说明                                |
| ------------------------------------------------------ | ------------------ | --------------------------- | ----------------------------------- |
| `maven-compiler-plugin` 版本、source、target、encoding | ✅ 可以            | `<build><pluginManagement>` | 统一 Java 编译配置                  |
| `annotationProcessorPaths`、`-parameters`              | ✅ 可以            | `<build><pluginManagement>` | 统一 Lombok、Spring Boot 配置处理器 |
| `spring-boot-maven-plugin` 版本                        | ✅ 可以            | `<build><pluginManagement>` | 只统一版本                          |
| `spring-boot-maven-plugin` 的 `excludes`               | ✅ 可以            | `<build><pluginManagement>` | 排除 Lombok 等依赖                  |
| `spring-boot-maven-plugin` 的 `repackage`              | ❌ 不建议全局      | 启动模块单独声明            | 否则普通库模块也会被打成可执行 jar  |
| `flatten-maven-plugin` 版本、configuration             | ✅ 可以            | `<build><pluginManagement>` | 统一 `${revision}` 处理             |
| `flatten-maven-plugin` 的 flatten / clean executions   | ✅ 可以            | 父 POM `<build><plugins>`   | 若所有模块都需要 flatten            |
| `resources` 资源目录、过滤规则                         | ✅ 可以            | 父 POM `<build><resources>` | 注意会继承给所有子模块              |
| `${...}.version`、编码、Java 版本等属性                | ✅ 可以            | 顶级父 POM `<properties>`   | 统一版本与构建属性                  |

## 2. 关键原则

### 2.1 `pluginManagement` 与 `plugins` 的区别

- `<pluginManagement>`：管理插件版本和默认配置，子模块声明插件时继承。
- `<plugins>`：父 POM 中声明后，子模块会实际继承并执行该插件。

推荐：

- 版本、configuration 放 `<pluginManagement>`。
- 所有模块都必须执行的插件放 `<plugins>`。
- 只有启动模块需要的插件 execution 放具体模块。

### 2.2 `spring-boot-maven-plugin` 不要全局 `repackage`

`repackage` 会把模块打成 Spring Boot 可执行 jar。

如果放在顶级父 POM 的 `<plugins>` 中，所有子模块都会执行，普通库模块会被打成：

```text
BOOT-INF/
```

这会导致其他模块依赖它时出现问题。

正确做法：

- 父 POM 只管理版本和 `excludes`。
- 启动模块单独声明 `spring-boot-maven-plugin` 和 `repackage` execution。

### 2.3 `resources` 可以全局，但要注意继承范围

顶级父 POM 的 `<build><resources>` 会继承给所有子模块。

如果项目中有普通工具库、非 Web 模块，建议把 Spring Boot / Web 相关资源规则放到中间父 POM，例如：

```text
xxx-spring-boot-parent
```

而不是直接放最顶级父 POM。

### 2.4 `flatten-maven-plugin` 适合统一版本号

如果项目统一使用 `${revision}` 管理版本，`flatten-maven-plugin` 很适合放顶级父 POM，让所有模块统一执行：

- `flatten`
- `flatten.clean`

## 3. 推荐父 POM 结构

**推荐做法：**

```xml
<properties>
    <maven.compiler.source>21</maven.compiler.source>
    <maven.compiler.target>21</maven.compiler.target>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>

    <maven-compiler-plugin.version>...</maven-compiler-plugin.version>
    <lombok.version>...</lombok.version>
    <spring-boot.version>...</spring-boot.version>
    <flatten-maven-plugin.version>...</flatten-maven-plugin.version>
</properties>

<build>
    <pluginManagement>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>${maven-compiler-plugin.version}</version>
                <configuration>
                    <source>${maven.compiler.source}</source>
                    <target>${maven.compiler.target}</target>
                    <encoding>${project.build.sourceEncoding}</encoding>

                    <annotationProcessorPaths>
                        <path>
                            <groupId>org.springframework.boot</groupId>
                            <artifactId>spring-boot-configuration-processor</artifactId>
                        </path>
                        <path>
                            <groupId>org.projectlombok</groupId>
                            <artifactId>lombok</artifactId>
                            <version>${lombok.version}</version>
                        </path>
                    </annotationProcessorPaths>

                    <compilerArgs>
                        <arg>-parameters</arg>
                    </compilerArgs>
                </configuration>
            </plugin>

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
            </plugin>

            <plugin>
                <groupId>org.codehaus.mojo</groupId>
                <artifactId>flatten-maven-plugin</artifactId>
                <version>${flatten-maven-plugin.version}</version>
                <configuration>
                    <updatePomFile>true</updatePomFile>
                    <flattenMode>resolveCiFriendliesOnly</flattenMode>
                </configuration>
            </plugin>
        </plugins>
    </pluginManagement>

    <plugins>
        <!-- 如果所有模块都需要统一 flatten，可放这里 -->
        <plugin>
            <groupId>org.codehaus.mojo</groupId>
            <artifactId>flatten-maven-plugin</artifactId>
            <executions>
                <execution>
                    <id>flatten</id>
                    <phase>process-resources</phase>
                    <goals>
                        <goal>flatten</goal>
                    </goals>
                </execution>
                <execution>
                    <id>flatten.clean</id>
                    <phase>clean</phase>
                    <goals>
                        <goal>clean</goal>
                    </goals>
                </execution>
            </executions>
        </plugin>
    </plugins>

    <resources>
        <resource>
            <directory>src/main/resources</directory>
            <filtering>false</filtering>
        </resource>

        <resource>
            <directory>src/main/webapp/</directory>
        </resource>

        <resource>
            <directory>src/main/resources</directory>
            <includes>
                <include>application*</include>
                <include>bootstrap*</include>
                <include>logback*</include>
            </includes>
            <filtering>true</filtering>
        </resource>
    </resources>
</build>
```

**我的个人常用做法：**

```xml
<properties>
    <maven.compiler.source>21</maven.compiler.source>
    <maven.compiler.target>21</maven.compiler.target>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>

    <maven-compiler-plugin.version>...</maven-compiler-plugin.version>
    <lombok.version>...</lombok.version>
    <spring-boot.version>...</spring-boot.version>
    <flatten-maven-plugin.version>...</flatten-maven-plugin.version>
</properties>
<build>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-compiler-plugin</artifactId>
            <version>${maven-compiler-plugin.version}</version>
            <configuration>
                <source>${maven.compiler.source}</source>
                <target>${maven.compiler.target}</target>
                <encoding>${project.build.sourceEncoding}</encoding>
                <annotationProcessorPaths>
                    <path>
                        <groupId>org.springframework.boot</groupId>
                        <artifactId>spring-boot-configuration-processor</artifactId>
                    </path>
                    <path>
                        <groupId>org.projectlombok</groupId>
                        <artifactId>lombok</artifactId>
                        <!-- 加上版本号，解决 lombok 注解失效问题 -->
                        <version>${lombok.version}</version>
                    </path>
                </annotationProcessorPaths>
                <compilerArgs>
                    <arg>-parameters</arg>
                </compilerArgs>
            </configuration>
        </plugin>
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
        </plugin>
        <!-- 打包时，将 ${revision} 替换为具体的版本号，统一版本号 -->
        <!-- 放在最顶层模块，保证所有模块都要执行 -->
        <plugin>
            <groupId>org.codehaus.mojo</groupId>
            <artifactId>flatten-maven-plugin</artifactId>
            <version>${flatten-maven-plugin.version}</version>
            <configuration>
                <updatePomFile>true</updatePomFile>
                <flattenMode>resolveCiFriendliesOnly</flattenMode>
            </configuration>
            <executions>
                <execution>
                    <id>flatten</id>
                    <phase>process-resources</phase>
                    <goals>
                        <goal>flatten</goal>
                    </goals>
                </execution>
                <execution>
                    <id>flatten.clean</id>
                    <phase>clean</phase>
                    <goals>
                        <goal>clean</goal>
                    </goals>
                 </execution>
            </executions>
        </plugin>
    </plugins>
    <resources>
        <resource>
            <directory>src/main/resources</directory>
            <!-- 关闭过滤 -->
            <filtering>false</filtering>
        </resource>
        <resource>
            <directory>src/main/webapp/</directory>
        </resource>
        <resource>
            <directory>src/main/resources</directory>
            <!-- 引入所有 匹配文件进行过滤 -->
            <includes>
                <include>application*</include>
                <include>bootstrap*</include>
                <include>logback*</include>
            </includes>
            <!-- 启用过滤 即该资源中的变量将会被过滤器中的值替换 -->
            <filtering>true</filtering>
        </resource>
    </resources>
</build>
```

## 4. 启动模块单独配置

只有需要打成 Spring Boot 可执行 jar 的启动模块，才声明 `repackage`：

```xml
<build>
    <plugins>
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
            <!-- 如果父 POM 使用了 pluginManagement 管理了版本号，则这里不需要指定，否则需要手动指定版本 -->
            <!-- <version>${spring-boot.version}</version> -->
            <executions>
                <execution>
                    <id>repackage</id>
                    <goals>
                        <goal>repackage</goal>
                    </goals>
                </execution>
            </executions>
        </plugin>
    </plugins>
</build>
```

## 5. 一句话总结

`properties`、`maven-compiler-plugin`、`flatten-maven-plugin`、`resources` 可以上提顶级父 POM；  
`spring-boot-maven-plugin` 只上提版本和 `excludes`，`repackage` 必须留在启动模块。
