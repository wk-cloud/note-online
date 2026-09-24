# 第八章：软件包管理

## 1. RPM

### 1.1 RPM 概述

​		RPM（RedHat Package Manager），RedHat软件包管理工具，类似windows里面的setup.exe 是Linux这系列操作系统里面的打包安装工具，它虽然是RedHat的标志，但理念是通用的。

​	   RPM包的名称格式 ： **Apache-1.3.23-11.i386.rpm** 

- “apache” 软件名称 
- “1.3.23-11”软件的版本号，主版本和此版本 
- “i386”是软件所运行的硬件平台，Intel 32位处理器的统称 
- “rpm”文件扩展名，代表RPM包

### 1.2 RPM 查询命令(rpm -qa)

* **基本语法**

``` linux
rpm -qa  (功能描述：查询所安装的所有rpm软件包)
```

* **经验技巧**

> 由于软件包比较多，一般都会采取过滤。 rpm -qa | grep rpm 软件包

* **案例实操**

  * 查询 firefox 软件安装情况

  ``` linux
  rpm -qa | grep firefox
  ```



### 1.3 RPM卸载命令(rpm -e)

* **基本语法**

``` linux
rpm -e RPM软件包
```

``` linux
rpm -e --nodeps 软件包
```

* **选项说明**

| 选项     | 功能                                                         |
| -------- | ------------------------------------------------------------ |
| -e       | 卸载软件包                                                   |
| --nodeps | 卸载软件时，不检查依赖。这样的话，那些使用该软件包的软件在此之后可能就不能正常工作了 |

* **案例实操**

  * 卸载 firefox 软件

  ``` linux
  rpm -e firefox
  ```

  

### 1.4 RPM安装命令(rpm-ivh)

* **基本语法**

``` linux
rpm -ivh RPM包全名
```

> 注意：安装时一定要提供 RPM包全名。
>
> 这里以 firefox 为例：
>
> ``` linux
> # 输入命令，进入到CentOS光盘下的软件包目录
> cd /run/media/root/CentOS\ 7\ x86_64/Packages
> # 搜索 firefox 包的全名
> ls | grep firefox
> # 搜索结果如下
> firefox-68.10.0-1.el7.centos.x86_64.rpm
> ```
>
> 

* **选项说明**

| 选项         | 功能                        |
| ------------ | --------------------------- |
| **-i**       | **install，安装**           |
| **-v**       | **--verbose，显示详细信息** |
| **-h**       | **--hash，进度条**          |
| **--nodeps** | **安装前不检查依赖**        |

* **案例实操**

  * 安装 firebox 软件

  ``` linux
  rpm -vih firefox-68.10.0-1.el7.centos.x86_64.rpm
  ```


## 2. YUM仓库配置(推荐使用)

​		YUM（全称为 Yellow dog Updater, Modified）是一个在 Fedora 和 RedHat 以及 CentOS 中的 Shell 前端软件包管理器。基于 RPM 包管理，能够从指定的服务器自动下载 RPM 包 并且安装，可以自动处理依赖性关系，并且一次安装所有依赖的软件包，无须繁琐地一次 次下载、安装，如图所示：

![image-20220703195922991](../../../assets/posts/linux/image-20220703195922991.png)

* **基本语法**

``` linux
yum [选项] [参数]
```

* **选项说明**

| 选项   | 功能                       |
| ------ | -------------------------- |
| **-y** | **对所有提问都回答 "yes"** |

* **参数说明**

| 参数             | 功能                                |
| ---------------- | ----------------------------------- |
| **install**      | **安装 rpm 软件包**                 |
| **update**       | **更新 rpm 软件包**                 |
| **check-update** | **检查是否有可用的更新 rpm 软件包** |
| **remove**       | **删除指定的 rpm 软件包**           |
| **list**         | **显示软件包信息**                  |
| **clean**        | **清理 yum 过期的缓存**             |
| **deplist**      | **显示 yum 软件包的所有依赖关系**   |

* **案例实操**

  * 采用 yum 方式安装 firefox

  ``` linux
  yum install firefox
  ```



## 3. 修改网络 YUM 源

​		默认的系统 YUM 源，需要连接国外 apache 网站，网速比较慢，可以修改关联的网络 YUM 源为国内镜像的网站，比如网易 163,aliyun 

* **安装 wget，wget用来从指定的URL下载文件**

``` linux
yum install wget
```

* **在 /etc/yum.repos.d/目录下，备份默认的 repos 文件**

``` linux
cp CentOS-Base.repo CentOS-Base.repo.backup
```

* **下载网易、163或者是 aliyun 的 repos 文件，任选其一，如图所示：**

``` linux
wget http://mirrors.aliyun.com/repo/Centos-7.repo //阿里云
或
wget http://mirrors.163.com/.help/CentOS7-Base-163.repo //网易 163
```

![image-20220703202017047](../../../assets/posts/linux/image-20220703202017047.png)

* **使用下载好的 repos 文件替换默认的 repos 文件**

例如：用 CentOS7-Base-163.repo 替换 CentOS-Base.repo

``` linux
mv CentOS7-Base-163.repo CentOS-Base.repo
```

* **清理旧缓存数据，缓存新数据**

``` linux
yum clean all
yum makecache
```

> yum makecache 就是把服务器的包信息下载到本地电脑缓存起来

* **测试**

``` linux
yum list | grep firefox
```

``` linux
yum -y install firefox
```

> 一般我们不需要配置镜像，因为 yum 源，会自动根据我们的地址来使用离我们最近的镜像源来进行下载


