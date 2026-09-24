# 第十九章：函数

## 1. 系统函数

### 1.1 basename

* **基本语法**

``` shell
basename [string/pathname] [suffix] 
(功能描述：basename 命令会删掉所有的前缀包括最后一个('/')字符，然后将字符串显示出来)

basename 可以理解为取路径里的文件名称
选项：
suffix 为后缀，如果 suffix 被指定了，basename 会将pathname 或 string 中的 suffix 去掉
```

* **案例实操**

  * 截取该 /home/atguigu/colneTest.txt  路径的文件名称

  ``` shell
  basename /home/atguigu/colneTest.txt
  ```

  ![image-20220705185119365](../../../assets/posts/linux/image-20220705185119365.png)

  * 获取当前脚本的绝对路径和脚本名称

  ``` shell
  #!/bin/bash
  echo script name：$(basename $0 .sh)
  echo script path：$(cd $(dirname $0);pwd)
  ```

  ![image-20220705185757782](../../../assets/posts/linux/image-20220705185757782.png)



### 1.2 dirname

* **基本语法**

``` shell
dirname 文件绝对路径  (功能描述：从给定的包含绝对路径的文件名中去除文件名（非目录的部分），然后返回剩下的路径（目录的部分）)
```

> **dirname 可以理解为取文件路径的绝对路径名称**

* **案例实操**

  * 获取  colneTest.txt  文件的绝对路径

  ``` shell
  dirname /home/atguigu/colneTest.txt
  ```

  ![image-20220705200516478](../../../assets/posts/linux/image-20220705200516478.png)

  

## 2. 自定义函数

* **基本语法**

``` shell
function funName()
{
	代码;
	return int;
}
```

* **经验技巧**

  * 必须在调用函数地方之前，先声明函数，shell脚本是逐行运行。不会象其它语言一样先编译
  * 函数返回值，只能通过 ``$?`` 系统变量获得，可以显示的加上return 返回，如果不加，将以最后一条命令运行结果，作为返回值。return 后跟数值 n (0-255)，即返回值的范围为（0-255）

* **案例实操**

  * 计算两个输入参数的和

  ``` shell
  #!/bin/bash
  
  function add(){
          s=$[$1+$2];
          echo "和："$s;
          return $s;
  }
  
  read -p "请输入一个整数：" a
  read -p "请输入一个整数：" b
  
  add $a $b  # 调用 add 函数
  echo "返回值为："$?  # 能够输出的范围是（0-255）
  ```

  ![image-20220705201453508](../../../assets/posts/linux/image-20220705201453508.png)


