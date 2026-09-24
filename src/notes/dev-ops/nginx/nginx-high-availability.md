# 第七章：Nginx配置实例-高可用性

**高可用集群（主从模式集群架构图）**

![image-20220816175244434](../../../assets/posts/nginx/image-20220816175244434.png)

## 1. 什么是 Nginx 高可用集群

![image-20220816171203497](../../../assets/posts/nginx/image-20220816171203497.png)

- **需要两台 nginx 服务器**
- **需要 keepalived**
- **需要虚拟 ip**

## 2. 准备工作

- **需要准备两台服务器**

- **在两台服务器上安装 nginx**

- **在两台服务器上安装 keepalived**

## 3. 安装 keepalived

- **使用 yum 命令进行安装**

```shell
yum install keepalived -y
```

- **安装之后，在 etc 里面生成目录 keepalived,有文件 keepalived.conf**

![image-20220816174503135](../../../assets/posts/nginx/image-20220816174503135.png)

## 4. 完成高可用配置（主从配置）

- **修改 /etc/keepalived/keepalived.conf 配置文件**

```shell

```

- **在 /usr/local/src 添加监测脚本**

```shell
#!/bin/bash
A=`ps -C nginx –no-header |wc -l`
if [ $A -eq 0 ];then
 /usr/local/nginx/sbin/nginx
 sleep 2
 if [ `ps -C nginx --no-header |wc -l` -eq 0 ];then
 killall keepalived
 fi
fi
```

- **把两台服务器上 nginx 和 keepalived 启动**

> **启动 ngindx：./nginx**
>
> **启动 keepalived：systemctl start Keepalived.service**

## 5. 最终测试

- **在浏览器地址栏输入 虚拟 ip 地址 192.168.17.50**
- **把主服务器（192.168.17.129）nginx 和 keepalived 停止，再输入 192.168.17.50**
