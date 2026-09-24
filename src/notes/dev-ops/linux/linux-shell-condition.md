# 第十六章：条件判断

- **基本语法**

```shell
test condition
[ condition ] (注意：condition 前后要有空格)
```

**注意：条件非空即为true，[ atguigu ] 返回true，[ ] 返回false**

- **常用判断条件**
  - 两个整数之间的比较

  | 条件    | 含义                        |
  | ------- | --------------------------- |
  | **-eq** | **等于(equal)**             |
  | **-ne** | **不等于(not equal)**       |
  | **-lt** | **小于(less than)**         |
  | **-le** | **小于等于(less equal)**    |
  | **-gt** | **大于(greater than)**      |
  | **-ge** | **大于等于(greater equal)** |
  | **-z**  | **是否为空**                |

  > 注：如果是字符串之间比较，用 等号 "=" 判断相等，用 "!=" 判断不相等
  - 按照文件权限进行判断

  | 条件   | 含义                        |
  | ------ | --------------------------- |
  | **-r** | **有读的权限（read）**      |
  | **-w** | **有写的权限（write）**     |
  | **-x** | **有执行的权限（execute）** |
  - 按照文件类型进行判断

  | 条件   | 含义                                     |
  | ------ | ---------------------------------------- |
  | **-e** | **文件存在（existence）**                |
  | **-f** | **文件存在并且是一个常规的文件（file）** |
  | **-d** | **文件存在并且是一个目录（directory）**  |

- **案例实操**
  - 23 是否大于等于 22

  ```shell
  [ 23 ge 22 ]
  ```

  ![image-20220704220939880](../../../assets/posts/linux/image-20220704220939880.png)
  - paramter.sh 是否具有写权限

  ```shell
  [ -w paramter.sh ]
  ```

  ![image-20220704221008946](../../../assets/posts/linux/image-20220704221008946.png)
  - /home/atguigu/cls.txt 目录中的文件是否存在

  ```shell
  [ -e /home/atguigu/cls.txt ]
  ```

  ![image-20220704221124345](../../../assets/posts/linux/image-20220704221124345.png)
  - 多条件判断（&& 表示前一条命令执行成功时，才执行后一条命令，|| 表示上一 条命令执行失败后，才执行下一条命令）

  ```shell
  [ hello ] && echo ok || echo notok
  ```

  ![image-20220704221410938](../../../assets/posts/linux/image-20220704221410938.png)

  ```shell
  [  ] && echo ok || echo notok
  ```

  ![image-20220704221515893](../../../assets/posts/linux/image-20220704221515893.png)
