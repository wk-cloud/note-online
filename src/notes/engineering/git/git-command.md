# 第三章：Git常用命令

| 命令名称                             | 作用           |
| ------------------------------------ | -------------- |
| git config --global user.name 用户名 | 设置用户签名   |
| git config --global user.email 邮箱  | 设置用户签名   |
| git init                             | 初始化本地库   |
| git status                           | 查看本地库状态 |
| git add 文件名                       | 添加到暂存区   |
| git commit -m "日志信息" 文件名      | 提交到本地库   |
| git reflog                           | 查看历史记录   |
| git reset --hard 版本号              | 版本穿梭       |
| git remote -v                        | 查看远程地址   |

## 1. 设置用户签名

### 1.1 基本语法

```shell
git config --global user.name 用户名

git config --global user.email 邮箱
```

### 1.2 案例实操

![image-20220601212413314](../../../assets/posts/git/image-20220601212413314.png)

在c盘的wk目录下有一个.gitconfig配置文件，里面有我们的签名信息

![image-20220601212436119](../../../assets/posts/git/image-20220601212436119.png)

> 说明： 签名的作用是区分不同操作者身份。用户的签名信息在每一个版本的提交信息中能够看到，以此确认本次提交是谁做的。
>
> Git 首次安装必须设置一下用户签名，否则无法提交代码。
>
> ※注意：这里设置用户签名和将来登录 GitHub（或其他代码托管中心）的账号没有任何关系。

## 2. 初始化本地仓库

### 2.1 基本语法

```shell
git init
```

### 2.2 案例实操

![image-20220603144612107](../../../assets/posts/git/image-20220603144612107.png)

### 2.3 结果查看

![image-20220603144632449](../../../assets/posts/git/image-20220603144632449.png)

## 3. 查看本地库状态

### 3.1 基本语法

```shell
git status
```

### 3.2 实例操作

#### 3.2.1 首次查看（工作区没有任何文件）

![image-20220603145800490](../../../assets/posts/git/image-20220603145800490.png)

#### 3.2.2 新增文件（hello.text）

```shell
vim hello.txt
```

> 扩展：
>
> 1、进入编辑模式
>
> ```git
> i
> ```
>
> 2、退出编辑模式
>
> ```git
> ESC
> ```
>
> 3、保存并退出命令
>
> ```git
> :wq
> ```
>
> 4、查看当前文件夹下的文件
>
> ```git
> ll
> ```
>
> 5、查看具体文件内容
>
> ```git
> cat 文件名
> ```

#### 3.2.3 再次查看（检测到未追踪的文件）

![image-20220603150809303](../../../assets/posts/git/image-20220603150809303.png)

## 4. 添加暂存区

### 4.1 将工作区的文件添加到暂存区

#### 4.1.1 基本语法

```git
git add 文件名
```

#### 4.1.2 案例实操

![image-20220603151524812](../../../assets/posts/git/image-20220603151524812.png)

### 4.2 查看状态（检测到暂存区有新文件）

![image-20220603151748813](../../../assets/posts/git/image-20220603151748813.png)

```shell
# 删除暂存区文件命令：
git rm --cached hello.txt
```

## 5. 提交本地库(形成历史版本)

### 5.1 将暂存区的文件提交到本地库

#### 5.1.1 基本语法

```shell
git commit -m '日志信息' 文件名
```

#### 5.1.2 案例实操

> 提交本地库后，生成了精简版的版本号： fccf975

![image-20220603153040077](../../../assets/posts/git/image-20220603153040077.png)

### 5.2 查看状态（没有文件需要提交,工作树是干净的）

![image-20220603153218566](../../../assets/posts/git/image-20220603153218566.png)

### 5.3 查看版本信息

1、精简版

```shell
git reflog
```

![image-20220603153426796](../../../assets/posts/git/image-20220603153426796.png)

> 通过这个命令可以看到我们刚才生成的那个简易的历史版本

2、详细版

```shell
git log
```

![image-20220603153541647](../../../assets/posts/git/image-20220603153541647.png)

> 里面包含详细的信息，以及完整版的版本号

## 6. 修改文件（hello.txt）

![image-20220603154743352](../../../assets/posts/git/image-20220603154743352.png)

### 6.1 查看状态（检测到工作区有文件被修改）

![image-20220603154949619](../../../assets/posts/git/image-20220603154949619.png)

### 6.2 将修改的文件再次添加到缓存区

![image-20220603155029651](../../../assets/posts/git/image-20220603155029651.png)

### 6.3 查看状态（工作区的修改添加到了缓存区）

![image-20220603155115966](../../../assets/posts/git/image-20220603155115966.png)

## 7. 历史版本

### 7.1 查看历史版本

#### 7.1.1 基本语法

```shell
 # 查看版本信息
git reflog

# 查看版本详细信息
git log
```

#### 7.1.2 案例实操

![image-20220603160510665](../../../assets/posts/git/image-20220603160510665.png)

> 当前有三个版本

### 7.2 版本穿梭

#### 7.2.1 基本语法

```git
git reset --hard 版本号
```

#### 7.2.2 案例实操

- 首先查看当前的历史记录，可以看到当前是在 b3cb72c 这个版本

![image-20220603162012843](../../../assets/posts/git/image-20220603162012843.png)

- 切换到 320a5c7 的版本，也就是我们第二次提交的版本

![image-20220603162140094](../../../assets/posts/git/image-20220603162140094.png)

- 切换完毕之后再查看历史记录，当前成功切换到了 320a5c7 版本

![image-20220603162228278](../../../assets/posts/git/image-20220603162228278.png)

- 然后查看文件 hello.txt ，发现文件内容已经变化

![image-20220603162319580](../../../assets/posts/git/image-20220603162319580.png)

> Git 切换版本，底层其实是移动的 HEAD 指针，具体原理如下图所示。

![image-20220603162342008](../../../assets/posts/git/image-20220603162342008.png)

### 7.3 版本还原

```shell
git revert 版本号
```

## 8. 远程地址

### 8.1 查看远程地址

```shell
git remote -v
```

![image-20220607150952862](../../../assets/posts/git/image-20220607150952862.png)

### 8.2 新增远程地址

```shell
git remote add origin 远程地址
```

### 8.3 删除远程地址

```shell
git remote remove 远程地址
```

## 9. 将本地代码推送到远程仓库

```shell
git push 别名/远程仓库地址 分支
```

## 10. 为版本号设置标签

### 10.1 新增标签

```shell
git tag 标签名 版本号
```

![image-20231112215656924](../../../assets/posts/git/image-20231112215656924.png)

### 10.2 删除标签

```shell
git tag -d 标签名
```

![image-20231112215714755](../../../assets/posts/git/image-20231112215714755.png)

## 11. 暂存代码

拉取代码有冲突时，需要先把改动暂存，再拉下代码，处理冲突。然后add、commit、push

如下是一个常用的，当拉取代码有冲突时的操作场景：

```text
git stash save 备注信息  // 暂存修改
git pull  // 拉取代码
git stash pop // 恢复暂存的修改 这个指令将缓存堆栈中的第一个stash删除，并将对应修改应用到当前的工作目录下。
```

如下是暂存常用到命令：

```shell
git stash push -- 文件路径：暂存指定的文件

git stash save "message"：暂存所有文件并添加一个描述性文字。
git stash pop：将最近的存储应用到当前分支并从列表中删除它。
git stash list：列出当前所有已保存但未恢复的存储。
git stash apply：将最近的存储应用到当前分支。
git stash apply 'stash@{2}'：应用特定编号的存储到当前分支。
git stash drop 'stash@{0}'：从列表中永久删除一个存储。
git stash clear：删除所有存储。
```

## 12. 补充

> 远程仓库中不小心提交了配置文件，需要删除已经传到远程仓库中的错误文件
>
> （1）git pull origin master
>
> （2）git rm --cache 文件名（只在缓存中删除对应的文件）
>
> （3）提交：git commit -m"本地删除远程文件filename"
>
> （4）git push
