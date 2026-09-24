# 第十七章：流程控制

## 1. if 判断

* **基本语法**

  * 单分支

  ``` shell
  if [ 条件判断式 ];then
  	程序
  fi
  ```

  或者

  ``` shell
  if [ 条件判断式 ]
  then
  	程序
  fi
  ```

  * 多分支

  ``` shell
  if [ 条件判断式 ]
  then
  	程序
  else
  	程序
  fi
  ```

  > 注意事项：
  >
  > 1、[ 条件判断式 ]，中括号和条件判断式之间必须有空格
  >
  > 2、if 后要有空格

* **案例实操**

  * 输入一个数字，如果是 1，则输出 OK，如果是2，则输出 notOk，如果是其他，什么也不输出

  ``` shell
  touch if.sh
  chmod +x if.sh
  vim if.sh
  ```

  

  ``` shell
  #!/bin/bash
  if [ $A -eq 1]
  then
  	echo OK
  elif [ $A -eq 2]
  then
  	echo notOK
  fi
  ```

  ![image-20220704223928905](../../../assets/posts/linux/image-20220704223928905.png)



## 2. case 语句

* **基本语法**

``` shell
case $变量名 in
值1)
	如果变量的值等于值1，则执行程序1
;;
值2)
	如果变量的值等于值2，则执行程序2
;;
值3)
	如果变量的值等于值3，则执行程序3
;;
*)
	如果变量的值都不是以上的值，则执行此程序
;;
esac
```

> 注意事项：
>
> 1. case 行尾必须为单词 "in"，每一个模式匹配必须以右括号 ")" 结束。 
>
> 2. 双分号 "";;" 表示命令序列结束，相当于 java 中的 break。 
> 3. 最后的 "*)" 表示默认模式，相当于 java 中的 default

* **案例实操**

  * 输入一个数字，如果是 1 ，则输出 one，如果是 2 ，则输出 two，如果是3 ，则输出three，如果不是以上数字，则输出 more

  ``` shell
  touch case.sh
  chmod +x case.sh
  vim case.sh
  ```

  ``` shell
  #!/bin/bash
  case $1 in
  1)
          echo "one"
  ;;
  2)
          echo "tow"
  ;;
  3)
          echo "three"
  ;;
  *)
          echo "more"
  ;;
  esac
  ```

  ![image-20220704230412003](../../../assets/posts/linux/image-20220704230412003.png)



## 3. 循环

* **基本语法1**

``` shell
for (( 初始值; 循环控制条件; 变量变化))
do
	程序
done
```

* **案例实操**

  - 从 1 加到 100

  ``` shell
  for (( i=1; i<=$1 ; i++)))
  do
  	sum=$[$sum + $i]
  done
  echo $sum
  # 输出结果 5050
  ```

  ![image-20220705150430373](../../../assets/posts/linux/image-20220705150430373.png)

* **基本语法2**

``` shell
for 变量 in 值1 值2 值3 ...
do 
	程序
done
```

- **案例实操**

  * 打印所有输入参数

  ``` shell
  #!/bin/bash
  for var in $1 $2 $3
  do
          echo $var
  done
  ```

  ![image-20220705150737735](../../../assets/posts/linux/image-20220705150737735.png)

  * 从 1 加到 100

  ``` shell
  for i in {1..100} # 1-100的一个序列
  do
          sum=$[$sum + $i]
  done
  echo $sum
  ```

  ![image-20220705151133936](../../../assets/posts/linux/image-20220705151133936.png)

- 比较 ``$*`` 和 ``$@`` 的区别

> $* 和 $@ 都表示传递给函数或脚本的所有参数，不被双引号 "" 包含时，都以 $1 $2 …$n 的形式输出所有参数

``` shell
echo '======$*======'
for i in $*
do
        echo "I love $i"
done

echo '======$@======'
for i in $@
do
        echo "I love $i"
done
```

![image-20220705151952813](../../../assets/posts/linux/image-20220705151952813.png)

> 当它们被双引号  “”  包含时，$* 会将所有的参数作为一个整体，以  “$1 $2 …$n”  的形式输 出所有参数；$@ 会将各个参数分开，以  “$1”   “$2” …  “$n”  的形式输出所有参数。

![image-20220705152119826](../../../assets/posts/linux/image-20220705152119826.png)

## 4. while 循环

* **基本语法**

``` shell
while [ 条件判断式 ]
do
	程序
done
```

* **案例实操**

  * 从 1 加到 100

  ``` shell
  #!/bin/bash
  a=1
  while [ $a -le $1 ] 
  do
          sum=$[ $sum + $a] # (新语法)： let sum+=a
          a=$[$a + 1]      #  (新语法)：let a+=1
  done
  echo $sum
  ```

  ![image-20220705152754183](../../../assets/posts/linux/image-20220705152754183.png)


