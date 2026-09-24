# 第五章：Ngnix 配置实例-反向代理实例

## 1. 反向代理实例一

> **打开浏览器，在浏览器地址栏输入 www.123.com ，跳转到 linux 系统 tomcat 主页面**

### 1.1 准备工作

#### 1.1.1 在linux中安装tomcat

- **默认linux就带有jdk，如果tomcat和jdk版本不适用，那么可以重新下载jdk**

```shell
java -v # 查看 jdk 版本
```

- **先去tomcat官网下载tomcat，这里下载的是tomcat8.5.81 版本**

![image-20220726224014156](../../../assets/posts/nginx/image-20220726224014156.png)

- **通过 Xfp 将压缩包上传到 linux 的 /usr/local 目录下，并解压**

```shell
tar -xvf apache-tomcat-8.5.81.tar.gz
```

- **进入 tomcat的bin 目录使用以下命令启动 tomcat**

```shell
./startup.sh
```

#### 1.1.2 对外开放访问的端口

- **输入以下命令进行访问**

```shell
firewall-cmd --add-port=8080/tcp --permanent
```

```shell
firewall-cmd --freload
```

- **查看已经开放的端口号**

```shell
firewall-cmd --list-all
```

![image-20220727222809245](../../../assets/posts/nginx/image-20220727222809245.png)

#### 1.1.3 在 windows 系统中通过输入 Linux主机IP地址+8080 看能否打开tomcat默认界面

```shell
ifconfig # 查看 linux 主机的IP地址
```

**我这里输入的是：http://192.168.13.100:8080/**

![image-20220726225206964](../../../assets/posts/nginx/image-20220726225206964.png)

### 1.2 访问过程分析

![image-20220727214608184](../../../assets/posts/nginx/image-20220727214608184.png)

### 1.3 具体配置

#### 1.3.1 在 windows 系统的 host 文件进行域名和 ip对应关系的配置

`添加内容在 host 文件中：`

> **192.168.13.100 www.123.com**

此时在浏览器输入 www.123.com:8080 就能访问 linux 中的 tomcat了

#### 1.3.2 在 nginx 中进行请求转发的配置(反向代理配置)

![image-20220727222225919](../../../assets/posts/nginx/image-20220727222225919.png)

**修改完配置文件记得重启 nginx**

#### 1.3.3 最终测试

**在浏览器输入：www.123.com 即可访问 linux 中的 tomcat，这一次就不用加端口号了**

## 2. 反向代理实例二

> 实现效果：使用 nginx 反向代理，根据访问的路径跳转到不同端口的服务中
>
> nginx 监听端口为 9001
>
> 访问 http://127.0.0.1:9001/edu/ 直接跳转到 127.0.0.1:8081
>
> 访问 http://127.0.0.1:9001/vod/ 直接跳转到 127.0.0.1:8080

### 2.1 实验代码

- **第一步，准备两个 tomcat，一个 8080 端口，一个 8081 端口，并在tomcat下的webapps目录下准备好测试的页面**

> **测试页面：a.html **
>
> **http://192.168.13.100:8080/vod/a.html ---> 输出结果：8080**
>
> **http://192.168.13.100:8081/edu/a.html ---> 输出结果：8081**

- **第二步，分别启动8080和8081端口的Tomcat**

`在 tomcat 的bin目录下执行以下命令来启动tomcat`

```shell
./startup.sh
```

- **第三步，修改 nginx 的配置文件**

> 在 http 块中添加 server {}

![image-20220811224005369](../../../assets/posts/nginx/image-20220811224005369.png)

> **注意：不要忘记结尾添加 `;`**

- **开发对外访问的端口号**

> 9001 8080 8081

```shell
firewall-cmd --list-all # 查看防火墙开放的端口号
```

![image-20220811224152715](../../../assets/posts/nginx/image-20220811224152715.png)

- **浏览器输入地址进行测试**

> http://192.168.13.100:9001/edu/a.html
>
> http://192.168.13.100:9001/vod/a.html

### 2.2 location指令说明

**该指令用于匹配URL**

**语法如下：**

```shell
location [ = | ~ | ~* | ^~ ] uri {

}
```

**1、= ：用于不含正则表达式的 uri 前，要求请求字符串与 uri 严格匹配，如果匹配 成功，就停止继续向下搜索并立即处理该请求。**

**2、~：用于表示 uri 包含正则表达式，并且区分大小写。**

> **例如：**
>
> **~ /edu/ ：这个表示的就是匹配路径中包含 /edu/ 的地址**

**3、~\*：用于表示 uri 包含正则表达式，并且不区分大小写。**

**4、^~：用于不含正则表达式的 uri 前，要求 Nginx 服务器找到标识 uri 和请求字 符串匹配度最高的 location 后，立即使用此 location 处理请求，而不再使用 location 块中的正则 uri 和请求字符串做匹配。**

**注意：如果URI 包含正则表达式，则必须要有 ~ 或者 ~\* 标识**
