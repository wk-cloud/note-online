# Maven 安装本地 JAR 依赖

## 1. 安装信息占位说明

| 项目 | 示例值 | 说明 |
|------|--------|------|
| JAR 路径 | `D:\libs\your-lib.jar` | 本地 JAR 文件路径 |
| groupId | `com.example` | 与 pom.xml 中 groupId 一致 |
| artifactId | `your-artifact` | 与 pom.xml 中 artifactId 一致 |
| version | `1.0.0` | 与 pom.xml 中 version 一致 |
| packaging | `jar` | 打包类型，一般为 jar |

> 使用时请将上述示例值替换为实际依赖信息。

## 2. 带双引号的安装命令

### 2.1 Windows CMD / PowerShell 单行命令

```bash
mvn install:install-file "-Dfile=D:\libs\your-lib.jar" "-DgroupId=com.example" "-DartifactId=your-artifact" "-Dversion=1.0.0" "-Dpackaging=jar"
```

### 2.2 Windows CMD 多行命令

```bash
mvn install:install-file ^
  "-Dfile=D:\libs\your-lib.jar" ^
  "-DgroupId=com.example" ^
  "-DartifactId=your-artifact" ^
  "-Dversion=1.0.0" ^
  "-Dpackaging=jar"
```

> CMD 多行换行符为 `^`；PowerShell 多行换行符为反引号 `` ` ``。


## 3. 参数说明

| 参数 | 示例值 | 说明 |
|------|--------|------|
| `-Dfile` | `D:\libs\your-lib.jar` | JAR 包本地路径 |
| `-DgroupId` | `com.example` | 与 pom.xml 中 groupId 一致 |
| `-DartifactId` | `your-artifact` | 与 pom.xml 中 artifactId 一致 |
| `-Dversion` | `1.0.0` | 与 pom.xml 中 version 一致 |
| `-Dpackaging` | `jar` | 打包类型 |
| `-DlocalRepositoryPath` | 可选 | 自定义本地仓库路径时使用 |


## 4. 安装后在 pom.xml 中引用

```xml
<dependency>
    <groupId>com.example</groupId>
    <artifactId>your-artifact</artifactId>
    <version>1.0.0</version>
</dependency>
```


## 5. 备用命令

如果执行时提示找不到 `install-file` 插件，可使用完整插件名：

```bash
mvn org.apache.maven.plugins:maven-install-plugin:3.1.1:install-file "-Dfile=D:\libs\your-lib.jar" "-DgroupId=com.example" "-DartifactId=your-artifact" "-Dversion=1.0.0" "-Dpackaging=jar"
```


## 6. 安装结果验证

安装成功后，JAR 会进入本地 Maven 仓库，路径类似：

```text
~/.m2/repository/com/example/your-artifact/1.0.0/
```

其中 `groupId` 中的点会转换为目录层级，例如 `com.example` 对应 `com/example`。


## 7. 注意事项

1. `groupId`、`artifactId`、`version` 必须与 pom.xml 中的依赖配置**完全一致**，且大小写敏感。
2. 路径中包含空格时，使用双引号包裹参数可避免解析问题。
3. 执行命令前确认已安装 Maven，并能正常运行 `mvn -v`。
4. 如果本地仓库路径被自定义，可额外加参数：
   ```bash
   "-DlocalRepositoryPath=你的本地仓库路径"
   ```
5. 安装命令中的 `-Dfile` 建议使用 JAR 文件的完整路径，避免路径解析错误。