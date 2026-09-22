# 第八章：IDEA集成Github

## 1. 设置Github账号

![image-20220606211501701](../../../assets/posts/git/image-20220606211501701.png)

> 如果出现 401 等情况连接不上的，是因为网络原因，可以使用以下方式连接：
>
> 通过 token 进行连接

![image-20220606211630782](../../../assets/posts/git/image-20220606211630782.png)

> Github 账户设置 token 方式:
>
> 依次点击：settings ---》Developer settings ---》 Personal access tokens

![image-20220606211843156](../../../assets/posts/git/image-20220606211843156.png)

![image-20220606211938768](../../../assets/posts/git/image-20220606211938768.png)

![image-20220606212031277](../../../assets/posts/git/image-20220606212031277.png)

![image-20220606212101532](../../../assets/posts/git/image-20220606212101532.png)

![image-20220606212142642](../../../assets/posts/git/image-20220606212142642.png)

点击生成 token

![image-20220606212200702](../../../assets/posts/git/image-20220606212200702.png)

复制红框中的字符串到idea中

![image-20220606212238478](../../../assets/posts/git/image-20220606212238478.png)

点击登录

![image-20220606212312061](../../../assets/posts/git/image-20220606212312061.png)

## 2. 分享工程到 Github

![image-20220606212836355](../../../assets/posts/git/image-20220606212836355.png)

![image-20220606213016991](../../../assets/posts/git/image-20220606213016991.png)

![image-20220607153659139](../../../assets/posts/git/image-20220607153659139.png)

来到github发现已经帮我们创建好了远程仓库

![image-20220607153753138](../../../assets/posts/git/image-20220607153753138.png)

> 解决分享项目到 Github 或 Gitee 报错问题：==Successfully created project 'Git-Demo' on Gitee, but initial push failed: bad boolean config value '“false”' for 'http.sslverify'==
>
> 在执行此操作之前确保，github或gitee已经设置了ssh免密登录

- **解决Github报错**

![image-20220607193354672](../../../assets/posts/git/image-20220607193354672.png)

- **解决码云报错**

![image-20220607193244680](../../../assets/posts/git/image-20220607193244680.png)

## 3. push 推送本地库到远程库

右键点击项目，可以将当前分支的内容push到 Github 的远程仓库中。

![image-20220607153950673](../../../assets/posts/git/image-20220607153950673.png)

![image-20220607154035301](../../../assets/posts/git/image-20220607154035301.png)

![image-20220607154121310](../../../assets/posts/git/image-20220607154121310.png)

![image-20220607154244993](../../../assets/posts/git/image-20220607154244993.png)

![image-20220607154445711](../../../assets/posts/git/image-20220607154445711.png)

> 记得 push之前 要将修改后的代码提交的本地仓库
>
> 出现下面的提示表示 push 成功

![image-20220607154851085](../../../assets/posts/git/image-20220607154851085.png)

> 注意：push是将本地库代码推送到远程库，**如果本地库代码跟远程库代码版本不一致， push 的操作是会被拒绝的**。**也就是说，要想 push 成功，一定要保证本地库的版本要比远程 库的版本高！**因此一个成熟的程序员在动手改本地代码之前，一定会先检查下远程库跟本地 代码的区别！如果本地的代码版本已经落后，切记要先 pull 拉取一下远程库的代码，将本地 代码更新到最新以后，然后再修改，提交，推送！

## 4. pull 拉取远程库到本地库

右键点击项目，可以将远程仓库的内容pull到本地仓库。

![image-20220607161455519](../../../assets/posts/git/image-20220607161455519.png)

![image-20220607161542099](../../../assets/posts/git/image-20220607161542099.png)

> 注意：pull 是拉取远端仓库代码到本地，如果远程库代码和本地库代码不一致，会自动 合并，如果自动合并失败，还会涉及到手动解决冲突的问题

## 5. clone克隆远程库到本地

### 5.1 在idea起始菜单克隆项目

方式一：从idea 开始菜单，通过 github/码云 将项目克隆下来

![image-20220607170109965](../../../assets/posts/git/image-20220607170109965.png)

![image-20220607170242572](../../../assets/posts/git/image-20220607170242572.png)

### 5.2 在 ieda 工程中进行克隆

方式二：从idea 工程中，通过 github/码云 将项目克隆下来

![image-20220607170524020](../../../assets/posts/git/image-20220607170524020.png)

![image-20220607170744911](../../../assets/posts/git/image-20220607170744911.png)
