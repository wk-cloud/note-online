# 第十四章：变量

## 1. 系统预定义变量

- **常用系统变量**

```shell
$HOME,$PWD,$SHELL,$USER 等
```

- **案例实操**
  - 查看系统变量的值

  ```shell
  echo $HOME
  ```

  - 显示当前所有全局变量

  ```shell
  env
  或
  env | less
  ```

  - 显示当前所有的全局变量

  ```shell
  printenv
  或
  printenv | less
  ```

  - 显示某个全局变量

  ```shell
  printenv USER
  ```

  - 显示当前 Shell 中所有变量：set

  ```shell
  set
  或
  set | less
  ```

## 2. 自定义变量

- **基本语法**
  - 定义变量：变量名 = 变量值。`注意：= 号前后不能有空格`
  - 撤销变量名：unset 变量名
  - 声明静态变量：readonly变量。`注意：不能 unset`

- **变量定义规则**
  - 变量名称可以由字母、数字和下划线组成，但是不能以数字开头，`环境变量名建议大写`
  - 等号两侧不能有空格
  - 在 bash 中，变量默认类型都是字符串类型，无法直接进行数值运算
  - 变量的值如果有空格，需要使用双引号或单引号括起来

- **案例实操**
  - 定义变量 A

  ```shell
  A=5
  ```

  ![image-20220704185149954](../../../assets/posts/linux/image-20220704185149954.png)
  - 给变量A重新赋值

  ```shell
  A=8
  ```

  ![image-20220704185227333](../../../assets/posts/linux/image-20220704185227333.png)
  - 撤销变量A

  ```shell
  unset A
  ```

  ![image-20220704185302343](../../../assets/posts/linux/image-20220704185302343.png)
  - 声明静态的变量 B = 2，不能unset

  ```shell
  readonly B=2
  ```

  ![image-20220704185410908](../../../assets/posts/linux/image-20220704185410908.png)
  - 在 bash 中，变量默认类型都是字符串类型，无法直接进行数值运算

  ```shell
  C=1+2
  echo $C
  ```

  ![image-20220704185523726](../../../assets/posts/linux/image-20220704185523726.png)
  - 变量的值如果有空格，需要使用双引号或单引号括起来

  ```shell
  D=I love Banzhang  # 错误格式
  ```

  ![image-20220704185615511](../../../assets/posts/linux/image-20220704185615511.png)

  ```shell
  D='I love you' # 正确格式
  ```

  ![image-20220704185707251](../../../assets/posts/linux/image-20220704185707251.png)
  - 可把变量提升为全局环境变量，可供其他 Shell 程序使用

  ```shell
  export 变量名
  vim helloworld.sh
  ```

  ​ 在 helloworld.sh 文件中增加 `echo $A`

  ![image-20220704191332617](../../../assets/posts/linux/image-20220704191332617.png)

  ​ 直接调用 helloworld.sh，发现 A 没有输出

  ```shell
  ./helloworld.sh
  ```

  ![image-20220704191616167](../../../assets/posts/linux/image-20220704191616167.png)

  ​ 将 A 提升到全局变量

  ```shell
  export A
  ./helloworld.sh
  ```

  ![image-20220704191733375](../../../assets/posts/linux/image-20220704191733375.png)

## 3. 特殊变量

### 3.1 $n

- **基本语法**

```shell
$n  (功能描述：n为数字，$0 代表该脚本名称，$1-$9 代表第一到第九个参数，十以上的参数需要用大括号包含，如${10})
```

- **案例实操**

```shell
#!/bin/bash
echo '=======$n======'
echo script name：$0
echo first paramter：$1
echo second paramter：$2
```

```shell
./paramter.sh abc def
```

![image-20220704195939412](../../../assets/posts/linux/image-20220704195939412.png)

### 3.2 $#是否正确

- **基本语法**

```shell
$# (功能描述：获取所有输入参数个数，常用于循环，判断参数的个数是否正确以及加强脚本的健壮性)
```

- **案例实操**

```shell
#!/bin/bash
echo '=======$n======'
echo script name：$0
echo first paramter：$1
echo second paramter：$2
echo '=======$#======'
echo $#
```

![image-20220704201028801](../../../assets/posts/linux/image-20220704201028801.png)

### 3.3 $*、$@

- **基本语法**

```shell
$* #(功能描述：这个变量代表命令行中所有的参数，$* 把所有出的参数看成一个整体)

$@ #(功能描述：这个变量也代表命令行中所有的参数，不过 $@ 把每个参数区分对待)
```

- **案例实操**

```shell
#!/bin/bash
echo '=======$n======'
echo script name：$0
echo first paramter：$1
echo second paramter：$2
echo '=======$#======'
echo $#
echo '======$*======'
echo $*
echo '======$@======'
echo $@
```

![image-20220704201548984](../../../assets/posts/linux/image-20220704201548984.png)

### 3.4 $?

- **基本语法**

```shell
$?  #(功能描述：最后一次执行的命令的返回状态。如果这个变量的值为0，证明上一个命令正确执行：如果这个变量的值为非零（具体是哪个数，由命令自己来决定），则证明上一个命令执行不正确了)
```

- **案例实操**
  - 判断 paramter.sh 脚本是否正确执行

  ```shell
  echo $?
  ```

  ![image-20220704201845280](../../../assets/posts/linux/image-20220704201845280.png)
