# 第五章：网络配置（重要）

## 1. 查看网络 IP 和网关

- **查看虚拟网络编辑器，如图所示：**

![image-20220620195559830](../../../assets/posts/linux/image-20220620195559830.png)

- **修改虚拟网卡 Ip，如图所示：**

![image-20220620195809598](../../../assets/posts/linux/image-20220620195809598.png)

![image-20220620195733714](../../../assets/posts/linux/image-20220620195733714.png)

- **VMware 提供了三种网络连接模式：**
  - 桥接模式

  > 虚拟机直接连接外部物理网络的模式，主机起到了网桥的作用。这种模式下，虚拟机可以直接访问外部网络，并且对外部网络是可见的。
  - NAT 模式

  > 虚拟机和主机构建一个专用网络，并通过虚拟网络地址转换(NAT）设备对P进行转换。虚拟机通过共享主机P可以访问外部网络，但外部网络无法访问虚拟机。
  - 仅主机模式

  > 虚拟机只与主机共享一个专用网络，与外部网络无法通信.

- **查看网关，如图所示：**

![image-20220620195952815](../../../assets/posts/linux/image-20220620195952815.png)

> 说明：如果修改了虚拟子网中的 IP 地址，则对应的 虚拟子网的网关 以及 windows 环境中的 VMnet8（即虚拟网卡）的 IP 也要修改，保证前三位一致。
>
> 以上图为例：要将虚拟子网的 IP 地址修改为 192.168.22.0, 则对应的 网关要修改为 192.168.22.2, 对应的虚拟网卡的 IP 修改为 192.168.22.1

- 查看 windows 环境中的 VMnet8 网络配置，如图所示：

![image-20220620200843220](../../../assets/posts/linux/image-20220620200843220.png)

![image-20220620200812669](../../../assets/posts/linux/image-20220620200812669.png)

## 2. 配置网络 ip 地址

### 2.1 ifconfig 配置网络接口

> ifconfig :network interfaces configuring 网络接口配置

- **基本语法**

```vim
ifconfig # 显示所有网络接口的配置
```

> 扩展：windows 下查看 所有的 IP 配置 的命令：
>
> ipconfig

- **实例实操**

> ifconfig # 查看当前网络 IP

![image-20220620201619324](../../../assets/posts/linux/image-20220620201619324.png)

### 2.2 ping测试主机间网络连通性

- **基本语法**

```linux
ping 目的主机  # 功能描述：测试当前服务器是否可以连接目的主机
```

- **案例实操**

测试当前服务器是否可以连接百度

```linux
ping www.baidu.com
```

![image-20220620201923755](../../../assets/posts/linux/image-20220620201923755.png)

### 2.3 修改 IP 为静态IP

> 默认 IP 是 DHCP 方式，即自动分配

- **查看 IP 配置文件，如图所示：**

```linux
vim /etc/sysconfig/network-scripts/ifcfg-ens33
```

![image-20220620202456201](../../../assets/posts/linux/image-20220620202456201.png)

> 可以看到当前默认 IP 方式是DHCP自动获取

**以下标红的项必须修改，有值的按照下面的值修改，没有该项的要增加**

![image-20220620204834315](../../../assets/posts/linux/image-20220620204834315.png)

> 总结：
>
> 1. 将 BOOTPROTO 的值修改为 static
> 2. 新增 IP 地址，网关 和 域名解析器
>    1. IP 地址前三位要和虚拟子网（虚拟网络编辑中的 NAT 模式）的 IP地址前三位保持一致，最后一位在合理范围内(1 - 244)可以和主机名编号保持一致（我们这里的主机名设置的是 localhost100，所以最后一位设置为100）,
>    2. 网关要和虚拟子网的网关保持一致
>    3. 域名解析器要和网关保持一致
>    4. 子网掩码可以不用设置，默认就是 255.255.255.0

**修改后如下图所示：**

![image-20220620210313228](../../../assets/posts/linux/image-20220620210313228.png)

**编辑完成后，按键盘 esc 退出编辑模式，然后输入 :wq 保存并退出**

- **执行 `service network restart` 重启网络，如图所示：**

![image-20220620210704147](../../../assets/posts/linux/image-20220620210704147.png)

- **执行 `ifconfig` 显示所有网络接口的配置**

![image-20220620211213904](../../../assets/posts/linux/image-20220620211213904.png)

**可以看到 IP 地址已经修改成功了**

- **在 cmd 命令行进行 ping 测试，发现可以进行 Ping**

![image-20220620211349021](../../../assets/posts/linux/image-20220620211349021.png)

- **在 linux 中 ping 外网，发现也可以进行 ping**

![image-20220620211648725](../../../assets/posts/linux/image-20220620211648725.png)

![image-20220620211727733](../../../assets/posts/linux/image-20220620211727733.png)

**至此，我们设置 虚拟IP 为 静态IP 就完成了**

### 2.4 修改 IP 地址后 可能会遇到的问题

- **物理机能 ping 通虚拟机，但是虚拟机 ping 不通物理机,一般都是因为物理机的 防火墙问题,把防火墙关闭就行**

- **虚拟机能 Ping 通物理机,但是虚拟机 Ping 不通外网,一般都是因为 DNS 的设置有 问题**

- **虚拟机 Ping www.baidu.com 显示域名未知等信息,一般查看 GATEWAY 和 DNS 设 置是否正确**

- **如果以上全部设置完还是不行，需要关闭 NetworkManager 服务（这个不建议，因为关闭这个之后，就无法进行网络连接，我们可以关闭 NetWork（老版本） 来试试）**
  - `systemctl stop NetworkManager` 关闭
  - `systemctl disable NetworkManager` 禁用
- **如果检查发现 `systemctl status network` 有问题 需要检查 ifcfg-ens3**

## 3. 配置主机名

### 3.1 修改主机名称

- **基本语法**

```linux
hostname     # 功能描述：查看当前服务器的主机名称
```

- **案例实操**
  - 查看当前服务器主机名称

  ```linux
  hostname
  ```

  - 如果感觉此主机名不合适，我们可以进行修改。通过编辑 /etc/hostname 文件
    - 方式一：

    ```linux
    vim /etc/hostname
    ```

    修改完成后重启生效
    - 方式二：

    ```linux
    hostnamectl set-hostname hadoop100
    ```

    修改完成后立即生效

### 3.2 修改 hosts 映射文件

- **修改 linux 的主机映射文件（hosts文件）**

​ 后续在 hadoop 阶段，虚拟机会比较多，配置时通常会采用主机名的方式配置，比较简单方便。不用刻意记 ip 地址。

- **打开 /etc/hosts**

```linux
vim /etc/hosts
```

- **添加如下内容**

```linux
192.168.13.100 hadoop100
192.168.13.101 hadoop101
192.168.13.102 hadoop102
192.168.13.103 hadoop103
192.168.13.104 hadoop104
# 这里的 ip 地址 前三位 和 虚拟ip 一致
```

![image-20220621213720256](../../../assets/posts/linux/image-20220621213720256.png)

- **修改 window 的主机映射文件（hosts文件）**

> 文件路径：C:\Windows\System32\drivers\etc
>
> hosts为系统重要文件，默认被隐藏了，需要点击
>
> `查看 ---》 选项 ---》查看 ---》 取消勾选隐藏受保护的操作系统文件`

- **默认我们是没有权限修改的，我们可以修改 hosts 文件权限，然后打开，并添加一下内容**

```linux
192.168.13.100 hadoop100
192.168.13.101 hadoop101
192.168.13.102 hadoop102
192.168.13.103 hadoop103
192.168.13.104 hadoop104
```

> 说明：
>
> 如果无法进行修改，则可以复制一份 hosts 文件到桌面，等在桌面修改好以后，在替换掉当前的 hosts 文件

- **在 windows 的 DOS 命令中 与我们的 linux 主机进行 ping 测试**

可以发现 linux 主机名可以自动解析为对应的 ip地址，这样以后远程连接的时候就不用输入 id地址，直接用主机名，更加方便。

![image-20220621214345746](../../../assets/posts/linux/image-20220621214345746.png)

## 4. 远程登录

​ 通常在工作过程中，公司中使用的真实服务器或者是云服务器，都不允许除运维人员 之外的员工直接接触，因此就需要通过远程登录的方式来操作。所以，远程登录工具就是 必不可缺的，目前，比较主流的有` Xshell`, SSH Secure Shell, SecureCRT,FinalShell 等，同学 们可以根据自己的习惯自行选择.

Xshell 和 Xftp下载地址：https://www.xshell.com/zh/

Xshell（远程连接工具）

Xftp（文件上传工具）
