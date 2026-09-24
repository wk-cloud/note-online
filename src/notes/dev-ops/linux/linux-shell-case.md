# 最后：综合应用案例

## 1. 归档文件

实际生产应用中，往往需要对重要数据进行归档备份

需求：实现一个每天对指定目录归档备份的脚本，输入一个目录名称（末尾不带/）， 将目录下所有文件按天归档保存，并将归档日期附加在归档文件名上，放在 /root/archive 下。

这里用到了归档命令：`tar`

后面可以加上`-c` 选项表示归档，加上`-z` 选项表示同时进行压缩，得到的文件后缀名为 `.tar.gz`

- **脚本实现代码如下**

```shell
#!/bin/bash

# 首先判断输入参数个数是否为1
if [ $# -ne 1 ]
then
        echo "参数个数错误，应该输入一个参数，作为归档目录名"
        exit
fi

# 从输入参数中获取目录名称
if [ -d $1 ]
then
        echo
else
        echo
        echo "目录不存在！"
        exit
fi

# 获取文件名称和绝对路径
DIR_NAME=$(basename $1)
DIR_PATH=$(cd $(dirname $1); pwd)


# 获取当前日期
DATE=$(date +%y%m%d)

# 定义生成的归档文件名称
FILE=archive_${DIR_NAME}_$DATE.tar.gz
DEST=/root/archive/$FILE

# 判断 归档文件存放目录是否存在，如果不存在则自动创建目录
if [ ! -d /root/archive ]
then
        mkdir /root/archive
fi


# 开始归档目录文件
echo "开始归档目录文件..."
echo

tar -czf $DEST $DIR_PATH/$DIR_NAME

# 判断程序是否执行成功
if [ $? -eq 0 ]
then
        echo
        echo "归档成功!"
        echo "归档文件为：$DEST"
else
        echo "归档出现问题"
        echo
fi
exit
```

## 2. 发送消息

我们可以利用 Linux 自带的 mesg 和 write 工具，向其它用户发送消息。

需求：实现一个向某个用户快速发送消息的脚本，输入用户名作为第一个参数，后面直 接跟要发送的消息。脚本需要检测用户是否登录在系统中、是否打开消息功能，以及当前发 送消息是否为空。

脚本实现如下：

```shell
#!/bin/bash

# 查看用户是否登录
login_user=$(who | grep -i -m 1 $1 | awk '{print $1}')

if [ -z $login_user ]
then
        echo "$1 不在线"
        echo "脚本退出..."
        exit
fi

# 查看用户是否开启了 message 功能
is_allowed=$(who -T | grep -i -m 1 $1 | awk '{print $2}')

if [ -z $login_user ]
then
        echo "$1 没有开启消息功能"
        echo "脚本退出..."
        exit
fi


# 确认是否有消息发送
if [ -z $2 ]
then
        echo "没有消息发送"
        echo "脚本退出..."
        exit
fi

# 从参数中获取要发送的消息
whole_message=$(echo $* | cut -d " " -f 2-)

# 获取用户登录的终端

user_terminal=$(who | grep -i -m 1 $1 | awk '/pts/ {print $2}')


# 写入要发送的消息
echo $login_user
echo $user_terminal
echo $whole_message | write $login_user $user_terminal

if [ $? != 0 ]
then
        echo "发送失败"
else
        echo "发送成功"
fi
exit
```
