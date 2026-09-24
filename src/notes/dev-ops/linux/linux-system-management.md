# 第六章：系统管理

## 1. Linux 中的进程和服务

​		**计算机中，一个正在执行的程序或命令，被叫做“进程”（process）。** 	

​		**启动之后一直存在、常驻内存的进程，一般被称作“服务”（service）**

## 2. service 服务管理（CentOS 6 版本 -了解）

### 2.1 基本语法

> service  服务名  start | stop | restart | status 

### 2.2 经验技巧

**查看服务的方法：``/etc/init.d/服务名`` ,发现只有``两个服务``保留在 service**

``` linux
ls /etc/init.d/
```



![image-20220622204332200](../../../assets/posts/linux/image-20220622204332200.png)



### 2.3 案例实操

* **查看网络服务的状态**

``` \
service network status
```

* **停止网络服务**

``` linux
service network stop
```

* **启动网络服务**

``` linux
service network start
```

* **重启网络服务**

``` linux
service network restart
```

## 3. chkconfig 设置后台服务的自启配置（CentOS6版本）

### 3.1 基本语法

``` shell
chkconfig （功能描述：查看所有服务器自启配置）
chkconfig 服务名 off （功能描述：关掉指定服务的自动启动）
chkconfig 服务名 on （功能描述：开启指定服务的自动启动）
chkconfig 服务名 --list （功能描述：查看服务开机启动状态)
```

### 3.2 案例实操

* **开启/关闭 network(网络)服务 的自动启动**

``` shell
chkconfig network on
```

``` shell
chkconfig network off
```

* **开启/关闭 network 服务指定级别的自动启动**

``` shell
chkconfig --level 指定级别 network on
```

``` shell
chkconfig --level 指定级别 network off
```

## 4. systemctl（CentOS7 版本-重点掌握）

### 4.1 基本语法

> systemctl start | stop | restart | status   服务名

### 4.2 经验技巧

**查看服务的方法：``ls /usr/lib/systemd/system``**

``` shell
ls /usr/lib/systemd/system
```

![image-20220622205549774](../../../assets/posts/linux/image-20220622205549774.png)

> 说明：
>
> ​	每一个以 .service 结尾的都是一个服务
>
> ​	每一个以 .target 结尾的都是一个服务组成的集合

### 4.3 案例实操

- **查看防火墙服务的状态**

``` linux
systemctl status firewalld
```

* **停止防火墙服务**

``` linux
systemctl stop firewalld
```

- **启动防火墙服务**

``` linux
systemctl start firewalld
```

- **重启防火墙服务**

``` linux
systemctl restart firewalld
```

## 5. systemctyl 设置后台服务的自启动配置

### 5.1 基本语法

``` linux
systemctl list-unit-files (功能描述：查看服务开机启动状态)

systemctl disable service_name (功能描述：关掉指定服务的自动启动)

systemctl enable service_name (功能描述：开启指定服务的自动启动)
```

### 5.2 图形化界面查看自启动服务

在命令行输入以下下命令打开图形化界面：

``` linux
setup
```

![image-20220622212433721](../../../assets/posts/linux/image-20220622212433721.png)

点击回车，选择系统服务：

![image-20220622212500098](../../../assets/posts/linux/image-20220622212500098.png)

上图列表中方括号里面为 ``*`` 号的表示开机自启动。

如果想要修改，则选中对应行，点击 ``空格`` ，方括号里面的 ``*``消失后，按 ``TAB`` 键 选中确定/取消按钮，退出图形化界面

### 5.3 案例实操

* **开启/关闭 iptables(防火墙)服务的自动启动**

``` linux
systemctl enable firewalld.service
```

``` linux
systemctl disable firewalld.service
```

## 6. 系统运行级别

### 6.1 Linux运行级别[CentOS6],如图所示：

![image-20220622212010876](../../../assets/posts/linux/image-20220622212010876.png)

* **在 CentOS6 中查看运行级别**

``` linux
vim /etc/inittab
```

![image-20220622213730079](../../../assets/posts/linux/image-20220622213730079.png)

> 由于当前我们使用的是 CentOS7，使用 CentOS6 来查看时，所有的运行级别都别注释掉了，同时我们也可以看到：
>
> CentOS7 的运行级别对应 在 CentOS6 中是多少：
>
> * **``multi-user.target``等价于原运行级别3（多用户有网，无图形界面）**
> * **``graphical.target`` 等价于原运行级别 5 （多用户有网，有图形界面）**

### 6.2 CentOS7 的运行级别简化为：

* **``multi-user.target``等价于原运行级别3（多用户有网，无图形界面）**

* **``graphical.target`` 等价于原运行级别 5 （多用户有网，有图形界面）**

### 6.3 查看当前运行级别

``` linux
systemctl get-default (当前是运行级别5)
```

![image-20220622213325798](../../../assets/posts/linux/image-20220622213325798.png)

### 6.4 修改当前运行级别

``` linux
systemctl set-default TARGET.target （这里TARGET取 multi-user 或者 graphical）
```

### 6.5 直接切换到指定运行级别下的方式

* **方式一：使用 ``ctrl + alt + F2`` 快捷键直接进入指定级别下的控制台界面** 

![image-20220622214326491](../../../assets/posts/linux/image-20220622214326491.png)

> 在这个界面下，可以处理运行级别三下面的事情

* **使用 ``ctrl + alt + F1`` 退出当前运行级别**

![image-20220622214507914](../../../assets/posts/linux/image-20220622214507914.png)

* **方式二：通过命令行进入**

```` linux
init 3
````

![image-20220622214741084](../../../assets/posts/linux/image-20220622214741084.png)

* **可以通过方式一的快捷键退出，也可以登录后，再使用命令切换回 运行级别 5**

![image-20220622215640999](../../../assets/posts/linux/image-20220622215640999.png)

## 7. 关闭防火墙

### 7.1 临时关闭防火墙

* **查看防火墙状态**

``` linux
systemctl status firewalld
```

* **临时关闭防火墙**

``` linux
systemctl stop firewalld
```

### 7.2 开机启动时关闭防火墙

* **设置开机时开启防火墙**

``` linux
systemctl enable firewalld.service
```

* **设置开机时关闭防火墙**

``` linux
systemctl disable firewalld.service
```

## 8. 关机重启命令

在 linux 领域内大多用在服务器上，很少遇到关机的操作。毕竟服务器上跑一个服务是永无止境的，除非特殊情况下，不得已才会关机

### 8.1 基本语法

``` linux
sync          (功能描述：将数据由内存同步到硬盘中)
halt          (功能描述：停机，关闭系统，但不断电)
poweroff      (功能描述：关机，断电)
reboot        (功能描述：就是重启，等同于 shutdown -r now)
```

``` linux
shutdown [选项] 时间
```

| 选项 | 功能                         |
| ---- | ---------------------------- |
| -H   | 相当于 --halt，停机          |
| -r   | -r = reboot 重启             |
| -P   | 相当于 poweroff ，关机，断电 |

| 参数 | 功能                               |
| ---- | ---------------------------------- |
| now  | 立刻关机                           |
| 时间 | 等待多久后关机，（时间单位是分钟） |

### 8.2 经验技巧

​		Linux 系统中为了提高磁盘的读写效率，对磁盘采取了 “预读迟写”操作方式。当用户 保存文件时，Linux 核心并不一定立即将保存数据写入物理磁盘中，而是将数据保存在缓 冲区中，等缓冲区满时再写入磁盘，这种方式可以极大的提高磁盘写入数据的效率。但是， 也带来了安全隐患，如果数据还未写入磁盘时，系统掉电或者其他严重问题出现，则将导 致数据丢失。使用 sync 指令可以立即将缓冲区的数据写入磁盘

### 8.3 案例实操

* **将数据由内存同步到硬盘中**

``` linux
sync
```

* **重启**

``` linux
reboot
```

* **停机（不断电）**

``` linux
halt
```

* **计算机将在 1 分钟后关机，并且会显示在登录用户的当前屏幕中**

``` linux
shutdown -h 1
```

* **立马关机（等同于poweroff）**

``` linux
shutdown -h now
```

* **系统立马重启（等同于 reboot）**

``` linux
shutdown -r now
```
