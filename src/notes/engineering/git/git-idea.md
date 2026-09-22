# 第七章：IDEA集成 Git

## 1. 配置Git忽略文件

### 1.1 Eclipse 特定文件

![image-20220606124641472](../../../assets/posts/git/image-20220606124641472.png)

### 1.2 IDEA特定文件

![image-20220606124833202](../../../assets/posts/git/image-20220606124833202.png)

### 1.3 Maven工程的target目录

![image-20220606125155920](../../../assets/posts/git/image-20220606125155920.png)

> 问题1：为什么要忽略他们？
>
> 答：与项目的实际功能无关，不参与服务器上部署运行。把它们忽略掉能够屏蔽 IDE 工具之间的差异
>
> 问题2：怎么忽略？
>
> - 创建忽略规则文件 xxxx.ignore（前缀名随便起，建议是 git.ignore）
> - 这个文件的存放位置原则上在哪里都可以，为了便于让 ~/.gitconfig 文件引用，建议放在用户家目录下
> - git.ignore 文件模板内容如下：
>
> ```text
> # Compiled class file
> *.class
>
> # Log file
> *.log
>
> # BlueJ files
> *.ctxt
>
> # Mobile Tools for Java (J2ME)
> .mtj.tmp/
>
> # Package Files #
> *.jar
> *.war
> *.nar
> *.ear
> *.zip
> *.tar.gz
> *.rar
>
> # virtual machine crash logs, see
> http://www.java.com/en/download/help/error_hotspot.xml
> hs_err_pid*
> .classpath
> .project
> .settings
> target
> .idea
> *.iml
> ```
>
> - 在 .gitconfig 文件中引用忽略配置文件（此文件在Windows 的家目录中）
>
> ```text
> [user]
> 	name = china-521
> 	email = 3052236335@qq.com
> [core]
> 	excludesfile = C:/Users/wk/git.ignore
> # 注意：这里要使用“正斜线（/）”，不要使用“反斜线（\）”
> ```

## 2. 定位 Git 程序

![image-20220606145005750](../../../assets/posts/git/image-20220606145005750.png)

## 3. 初始化本地仓库

![image-20220606145140036](../../../assets/posts/git/image-20220606145140036.png)

选择要创建 Git 本地仓库的工程（选择当前工程即可）

![image-20220606145318601](../../../assets/posts/git/image-20220606145318601.png)

## 4. 添加到暂存区

右键点击项目选择 Git -> Add 将项目添加到暂存区

![image-20220606145519511](../../../assets/posts/git/image-20220606145519511.png)

## 5. 提交到本地库

![image-20220606145618101](../../../assets/posts/git/image-20220606145618101.png)

![image-20220606145753993](../../../assets/posts/git/image-20220606145753993.png)

## 6. 切换版本

在 IEDA 的左下角，点击 Git ，然后点击 Log 查看版本

![image-20220606160352440](../../../assets/posts/git/image-20220606160352440.png)

右键选择要切换的版本，然后在菜单里点击 Checkout

![image-20220606160533392](../../../assets/posts/git/image-20220606160533392.png)

## 7. 创建分支

选择 Git，在 Repository 里面，点击Branches 按钮

![image-20220606163506114](../../../assets/posts/git/image-20220606163506114.png)

在弹出的Git Branches框里，点击 New Branch 按钮

![image-20220606163719129](../../../assets/posts/git/image-20220606163719129.png)

填写分支名称，创建 hot-fix1分支

![image-20220606163640142](../../../assets/posts/git/image-20220606163640142.png)

然后在 IDEA 的右下角看到 hot-fix，说明分支创建成功，并且当前已经切换成 hot-fix 分支

![image-20220606164023312](../../../assets/posts/git/image-20220606164023312.png)

> :seedling: 补充：点击 IDEA 右下角中的分支，也可以进行分支的创建等一系列操作

## 8. 切换分支

在 IDEA 窗口的右下角，切换到 master 分支

![image-20220606164721179](../../../assets/posts/git/image-20220606164721179.png)

然后在 IDEA 窗口的右下角看到了master，说明 master 分支切换成功。

![image-20220606165552651](../../../assets/posts/git/image-20220606165552651.png)

## 9. 分支合并

在 IDEA 窗口的右下角，将 hot-fix 分支合并到当前 master 分支

![image-20220606175055507](../../../assets/posts/git/image-20220606175055507.png)

如果代码没有冲突，分支直接合并成功，分支合并成功以后，代码自动提交无需手动提交本地库

## 10. 解决合并冲突

如图所示，如果 master 分支和 hot-fix 分支都修改了代码，在合并分支的时候就会发生冲突

- **master分支代码修改**

![image-20220606175724749](../../../assets/posts/git/image-20220606175724749.png)

- **hot-fix 分支代码修改**

![image-20220606175811523](../../../assets/posts/git/image-20220606175811523.png)

我们现在站在 master 分支上合并hot-fix分支，就会发生代码冲突

![image-20220606175957571](../../../assets/posts/git/image-20220606175957571.png)

点击 Conficts 框里的 Merge 按钮，进行手动合并代码

![image-20220606185910497](../../../assets/posts/git/image-20220606185910497.png)

手动合并完代码后，点击右下角的 Apply 蛋妞

![image-20220606190010565](../../../assets/posts/git/image-20220606190010565.png)

代码冲突解决，自动提交本地库

![image-20220606190056656](../../../assets/posts/git/image-20220606190056656.png)
