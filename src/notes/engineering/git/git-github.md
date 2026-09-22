# 第六章：GitHub操作

GitHub 网址：https://github.com/

## 1. 创建远程仓库

## 2. 远程仓库操作

| 命令名称                           | 作用                                                      |
| ---------------------------------- | --------------------------------------------------------- |
| git remote -v                      | 查看当前所有远程地址别名                                  |
| git remote add 别名 远程地址       | 起别名                                                    |
| git push 别名 分支                 | 推送本地分支上的内容到远程仓库                            |
| git clone 远程地址                 | 将远程仓库的内容克隆到本地                                |
| git pull 远程库地址别名 远程分支名 | 将远程仓库对于分支最新内容拉下来后与 当前本地分支直接合并 |

### 2.1 创建远程仓库别名

#### 2.1.1 基本语法

```git
git remote -v 查看当前所有远程地址别名
```

```git
git remote add 别名 远程地址
```

#### 2.1.2 案例实操

![image-20220605164937010](../../../assets/posts/git/image-20220605164937010.png)

### 2.2 推送本地分支到远程仓库

#### 2.2.1 基本语法

```git
git push 别名 分支
```

#### 2.2.2 案例实操

![image-20220605170116392](../../../assets/posts/git/image-20220605170116392.png)

此时发现我们的 master 分支上的内容推送到了 Github 创建的远程仓库

![image-20220605170250788](../../../assets/posts/git/image-20220605170250788.png)

### 2.3 拉取远程库代码到本地仓库

#### 2.3.1 基本语法

```git
git pull 别名 分支
```

#### 2.3.2 案例实操

![image-20220605170928402](../../../assets/posts/git/image-20220605170928402.png)

#### 2.3.3 查看本地仓库状态

![image-20220605171117849](../../../assets/posts/git/image-20220605171117849.png)

> 发现本地仓库是干净的，即拉取到本地仓库后的代码会被自动提交到本地仓库
>
> 查看版本，发现拉取后的代码版本已经存在在本地仓库

![image-20220605171250343](../../../assets/posts/git/image-20220605171250343.png)

### 2.4 克隆远程仓库到本地

> 克隆代码是不需要登录账号的

#### 2.4.1 基本语法

```git
git clone 远程地址
```

#### 2.4.2 案例实操

![image-20220605172013763](../../../assets/posts/git/image-20220605172013763.png)

> 克隆的仓库地址(SSH形式) ：git@github.com:china-521/git-demo.git
>
> 这个地址为远程仓库地址，克隆结果：初始化本地仓库

![image-20220605172155459](../../../assets/posts/git/image-20220605172155459.png)

> 克隆操作成功以后，会自动创建远程仓库别名
>
> 默认生成的别名是： origin

![image-20220605172344992](../../../assets/posts/git/image-20220605172344992.png)

> 小结：clone 会做如下操作
>
> 1、拉取代码。2、初始化本地仓库。3、创建别名

### 2.5 邀请加入团队

#### 2.5.1 选择邀请合作者

![image-20220605174522986](../../../assets/posts/git/image-20220605174522986.png)

#### 2.5.2 搜索并添加要合作的人

![image-20220605174748802](../../../assets/posts/git/image-20220605174748802.png)

#### 2.5.3 复 制 地 址 并 通 过 微 信 钉 钉 等 方 式 发 送 给 该 用 户 ， 复 制 内 容 如 下 ：

> https://github.com/china-521/git-demo/invitations

![image-20220605175536844](../../../assets/posts/git/image-20220605175536844.png)

#### 2.5.4 在 atguigulinghuchong 这个账号中的地址栏复制收到邀请的链接，点击接收邀请

![image-20220605175124356](../../../assets/posts/git/image-20220605175124356.png)

#### 2.5.5 成功之后可以在 atguigulinghuchong 这个账号上看到 git-Demo 的远程仓库

![image-20220605175721896](../../../assets/posts/git/image-20220605175721896.png)

#### 2.5.6 mao888 可以修改内容并 push 到远程仓库

![image-20220605175908552](../../../assets/posts/git/image-20220605175908552.png)

![image-20220605175915273](../../../assets/posts/git/image-20220605175915273.png)

#### 2.5.7 回到 china-521 的 Github 仓库可以看到，最后一次是 atguigulinghuchong 提交的

![image-20220605175821222](../../../assets/posts/git/image-20220605175821222.png)

![image-20220605175832875](../../../assets/posts/git/image-20220605175832875.png)

### 2.6 拉取远程库内容

#### 2.6.1 基本语法

```git
git pull 远程库地址别名 远程分支名
```

#### 2.6.2 案例实操

> 将远程库对于分支最新内容拉取下来后后与当前本地分支直接合并

![image-20220605180234472](../../../assets/posts/git/image-20220605180234472.png)

## 3. 跨团队协作

### 3.1 将远程仓库的地址复制发给邀请跨团队协作的人，比如China-521。

![image-20220605211650436](../../../assets/posts/git/image-20220605211650436.png)

### 3.2 在 China-521 的Github 账号里的地址栏复制收到的链接，然后点击 Fork 将项目叉到自己的本地仓库

![image-20220605212537609](../../../assets/posts/git/image-20220605212537609.png)

> 叉成功以后就可以在自己的仓库看到叉入的仓库信息

![image-20220605213117627](../../../assets/posts/git/image-20220605213117627.png)

### 3.3 china-521就可以在线编辑叉取过来的文件了

![image-20220605213234360](../../../assets/posts/git/image-20220605213234360.png)

### 3.4 编辑完毕，填写描述信息并点击左下角绿色按钮提交

![image-20220605214732016](../../../assets/posts/git/image-20220605214732016.png)

### 3.5 接下来点击上方的 Pull 请求，并创建一个新的请求

![image-20220605214934398](../../../assets/posts/git/image-20220605214934398.png)

![image-20220605215219286](../../../assets/posts/git/image-20220605215219286.png)

![image-20220605215555241](../../../assets/posts/git/image-20220605215555241.png)

### 3.6 被叉取的Github账号可以看到有一个Pullrequest 请求

![image-20220605215826762](../../../assets/posts/git/image-20220605215826762.png)

**进入聊天室，可以讨论代码相关内容**

![image-20220605215914528](../../../assets/posts/git/image-20220605215914528.png)

![image-20220605215934253](../../../assets/posts/git/image-20220605215934253.png)

### 3.7 如果代码没有问题，被叉取的Github账号可以点击 Merge pull reque 合并代码

![image-20220605220033313](../../../assets/posts/git/image-20220605220033313.png)

## 4. 免密登录（SSH）

我们可以看到远程仓库中还有一个 SSH 的地址，因此我们也可以使用 SSH 进行访问。

![image-20220605222246402](../../../assets/posts/git/image-20220605222246402.png)

具体操作如下：

- 在 `C:\Users\wk` 目录下使用 Git Bash Here 打开，输入下面命令生成.ssh密钥.

> 注意这里的 -C 是大写
>
> -C 后面是一段描述

```git
 ssh-keygen -t rsa -C china-521
```

![image-20220605222601256](../../../assets/posts/git/image-20220605222601256.png)

- 进入 `.ssh` 文件查看公共密钥

```git
cd .ssh

cat id_rsa.pub
```

![image-20220605222810986](../../../assets/posts/git/image-20220605222810986.png)

- 复制 id_rsa.pub 文件内容（公共密钥），登录 GitHub，点击用户头像→ Settings → SSH and GPG keys

![image-20220605222946218](../../../assets/posts/git/image-20220605222946218.png)

![image-20220605223020154](../../../assets/posts/git/image-20220605223020154.png)

![image-20220605223041541](../../../assets/posts/git/image-20220605223041541.png)

> 点击 New SSH Key 后，会弹出设置页面
>
> 其中，Title中随意去个名字
>
> Key中填入刚才获取到的公共密钥
>
> 接下来再往远程仓库 push 东西的时候使用 SSH 连接就不需要登录了。
