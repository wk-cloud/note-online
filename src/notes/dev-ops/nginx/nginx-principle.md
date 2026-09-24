# 第九章：Nginx 的原理

## 1. master 和 worker

![image-20220816175352863](../../../assets/posts/nginx/image-20220816175352863.png)

**Nginx 中会有一个 master 进程 和 多个 worker 进程**

## 2. worker 如何进行工作的

![image-20220816175451536](../../../assets/posts/nginx/image-20220816175451536.png)

## 3. 一个master 和 多个 worker 的好处

- **可以使用 nginx –s reload 热部署，利用 nginx 进行热部署操作**

- **每个 woker 是独立的进程，如果有其中的一个 woker 出现问题，其他 woker 独立的， 继续进行争抢，实现请求过程，不会造成服务中断**

## 4. 设置多少个 worker 合适

- **worker 数和服务器的 cpu 数相等是最为适宜的**

## 5. 连接数 worker_connection

- **发送请求，占用了 worker 的几个连接数**

> **2 个 或 4 个**
>
> **当请求的是静态资源时，占用了 worker 的两个连接数 **
>
> **当请求通过tomcat访问数据库等操作时，会占用 worker 的四个连接数**

- **Nginx 有一个master，有四个worker，每个worker支持最大连接数 1024，则支持的最大并发数是多少**

> - **普通的静态访问最大并发数是：worker_connections \* worker_processes / 2**
> - **而如果是 HTTP 作 为反向代理来说，最大并发数量应该是 worker_connections \* worker_processes/4**
> - **worker_connections：worker连接数**
> - **worker_processes：worker进程数**
