# 第九章：克隆虚拟机

## 1. 克隆

* 从现有虚拟机（``关机状态``）克隆出新虚拟机，右键选择管理 => 克隆，如图所示：

![image-20220703215542844](../../../assets/posts/linux/image-20220703215542844.png)

* 点击下一步，如图所示：

![image-20220703215615639](../../../assets/posts/linux/image-20220703215615639.png)

* 选择虚拟机中的当前状态,如下图所示：

![image-20220703215702769](../../../assets/posts/linux/image-20220703215702769.png)

* 选择创建完整克隆，如下图所示：

![image-20220703215740635](../../../assets/posts/linux/image-20220703215740635.png)

* 设置虚拟机名称及存储位置，如下图所示：

![image-20220703220025159](../../../assets/posts/linux/image-20220703220025159.png)

* 点击完成，进行完成虚拟机克隆：

![image-20220704102612335](../../../assets/posts/linux/image-20220704102612335.png)

![image-20220704102645098](../../../assets/posts/linux/image-20220704102645098.png)



## 2. 开机修改相关配置

> 注意：使用 root 用户

* **修改 vim /etc/sysconfig/network-scripts/ifcfg-ens33 ,修改 IP 地址,如图 所示：**

![image-20220703220558766](../../../assets/posts/linux/image-20220703220558766.png)

* **修改 /etc/hostname ,修改主机名，如图所示：**

``` shell
vim /etc/hostname
```

![image-20220703220817711](../../../assets/posts/linux/image-20220703220817711.png)

* **修改完成后，执行命令重启 NetworkManager**

``` shell
systemctl stop NetworkManager
```

``` shell
systemctl start NetworkManager
```

* **试着 ping 一下外网看能否成功**

``` shell
ping www.baidu.com
```

![image-20220703221535986](../../../assets/posts/linux/image-20220703221535986.png)


