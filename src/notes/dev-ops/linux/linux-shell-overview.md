# 第十二章：Shell概述

Shell 是一个``命令行解释器``，它接收应用程序/用户命令，然后调用操作系统内核。

![image-20220704133207123](../../../assets/posts/linux/image-20220704133207123.png)

Shell 还是一个功能相当强大的编程语言，易编写，易调试，灵活性强

* **Linux 提供的 Shell 解析器有**

``` linux
cat /etc/shells
```

![image-20220704133330765](../../../assets/posts/linux/image-20220704133330765.png)

* **bash 和 sh 的关系**

``` linux
ll | grep bash
```

![image-20220704133554398](../../../assets/posts/linux/image-20220704133554398.png)

* **Centos默认的解析器是bash**

``` linux
echo $SHELL
```

![image-20220704133640590](../../../assets/posts/linux/image-20220704133640590.png)


