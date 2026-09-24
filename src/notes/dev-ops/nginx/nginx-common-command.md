# 第三章：Nginx常用命令

> **使用 nginx 操作命令的前提条件：必须进入 nginx 的目录**
>
> **/usr/local/nginx/sbin**

## 1. 查看 nginx 版本号

```shell
./nginx -v
```

![image-20220723205806154](../../../assets/posts/nginx/image-20220723205806154.png)

## 2. 启动 nginx

```shell
./nginx
```

![image-20220723205926846](../../../assets/posts/nginx/image-20220723205926846.png)

## 3. 关闭 nginx

```shell
./nginx -s stop
```

![image-20220723205856913](../../../assets/posts/nginx/image-20220723205856913.png)

## 4. 重新加载 nginx

```shell
./nginx -s reload # 重新加载配置文件
```
