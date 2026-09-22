# Maven 多模块 版本号管理

## 1. 问题背景

在 Maven 多模块项目中，希望统一管理父子 POM 的版本号，尝试在 `<properties>` 中自定义一个属性，例如：

```xml
<properties>
    <nexus-version>1.0.0</nexus-version>
</properties>
```

然后在 `<version>` 中引用：

```xml
<version>${nexus-version}</version>
```

**结论：不可行。**

## 2. 错误尝试

### 2.1 父 POM 中使用自定义属性

```xml
<groupId>com.example</groupId>
<artifactId>parent</artifactId>
<version>${nexus-version}</version>
<packaging>pom</packaging>

<properties>
    <nexus-version>1.0.0</nexus-version>
</properties>
```

### 2.2 子 POM 的 `<parent>` 中使用自定义属性

```xml
<parent>
    <groupId>com.example</groupId>
    <artifactId>parent</artifactId>
    <version>${nexus-version}</version>
</parent>
```

以上两种方式均会失败。

## 3. 报错现象

常见报错或警告：

```text
'version' contains an expression but should be a constant.
```

或者 Maven 无法解析父 POM，导致子模块构建失败。

## 4. 原因分析

- Maven 在解析父子关系时，需要**优先确定父 POM 的坐标**。
- `<properties>` 本身定义在 POM 中，Maven 无法在解析 `<version>` 时提前读取你自定义的属性。
- 因此，**自定义属性不能用于 `<version>` 标签**，包括 `<parent>` 中的 `<version>`。
- Maven 官方只允许在 `<version>` 中使用**预定义占位符**，而不是任意属性名。

## 5. 正确方案：CI-Friendly Versions

从 **Maven 3.5.0-beta-1** 开始，官方引入了 **CI-Friendly Versions** 机制，专门用于解决多模块版本统一管理问题。

### 5.1 支持的占位符

| 占位符          | 说明                        |
| --------------- | --------------------------- |
| `${revision}`   | 项目版本号，最常用          |
| `${sha1}`       | Git 提交 SHA                |
| `${changelist}` | 变更列表，通常用于 SNAPSHOT |

**注意：属性名固定，不能改成 `${nexus-version}` 等自定义名称。**

### 5.2 基本用法

父 POM：

```xml
<groupId>com.example</groupId>
<artifactId>parent</artifactId>
<version>${revision}</version>
<packaging>pom</packaging>

<properties>
    <revision>1.0.0</revision>
</properties>
```

子 POM：

```xml
<parent>
    <groupId>com.example</groupId>
    <artifactId>parent</artifactId>
    <version>${revision}</version>
</parent>

<artifactId>child</artifactId>
<!-- 如果继承父版本，可以省略自己的 <version> -->
```

发布时可通过命令行覆盖：

```bash
mvn clean deploy -Drevision=2.0.0
```

## 6. 必须配合 flatten-maven-plugin

直接使用 `${revision}` 后，Maven 在 `install` 或 `deploy` 时会把**包含占位符的原始 POM** 安装到仓库中。  
这会导致其他项目无法正确解析你的构件版本。

因此必须配置 `flatten-maven-plugin`，在发布阶段将 `${revision}` 等占位符替换为实际版本值。

```xml
<build>
    <plugins>
        <plugin>
            <groupId>org.codehaus.mojo</groupId>
            <artifactId>flatten-maven-plugin</artifactId>
            <version>1.5.0</version>
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
</build>
```

配置后，安装到仓库的 POM 会变成实际版本号，例如 `1.0.0`，而不是 `${revision}`。

## 7. 最佳实践

- **统一在父 POM 定义**：将 `<revision>` 的默认值定义在父 POM 的 `<properties>` 中。
- **子 POM 简化引用**：子 POM 的 `<parent>` 中写 `<version>${revision}</version>`，自己的 `<version>` 可省略。
- **命令行覆盖**：发布时通过 `-Drevision=2.0.0` 动态指定版本号，无需修改文件。
- **不要用自定义属性名**：如 `<nexus-version>`，Maven 不支持。
- **必须配合 flatten 插件**：否则仓库中的 POM 会保留占位符，导致下游依赖失败。
- **Maven 4 的改进**：Maven 4 预计原生支持更灵活的“自动父版本”功能，不再强制子 POM 显式声明父版本。

## 8. 避坑清单

- [ ] 不要尝试用 `${自定义属性}` 作为 `<version>`。
- [ ] 父子 POM 统一使用 `${revision}`。
- [ ] 在父 POM 中定义 `<revision>` 默认值。
- [ ] 子 POM 的 `<parent>` 中使用 `${revision}`。
- [ ] 添加 `flatten-maven-plugin` 并配置 `resolveCiFriendliesOnly`。
- [ ] 发布时使用 `-Drevision=xxx` 覆盖版本。
- [ ] 单独构建子模块时，确保 `${revision}` 能被解析。

## 9. 总结

| 方式                          | 是否可行 | 说明                                      |
| ----------------------------- | -------- | ----------------------------------------- |
| `${nexus-version}` 自定义属性 | ❌       | Maven 禁止在 `<version>` 中使用自定义属性 |
| `${revision}` 官方占位符      | ✅       | 需配合 `flatten-maven-plugin`             |
| `${sha1}`、`${changelist}`    | ✅       | CI-Friendly Versions 支持                 |
| 命令行 `-Drevision=1.0.0`     | ✅       | 动态覆盖版本号                            |

**一句话结论**：
父子 POM 的 `<version>` 不能使用自定义属性表达式，但可以使用 Maven 官方的 `${revision}` 占位符，并必须配合 `flatten-maven-plugin` 使用。
