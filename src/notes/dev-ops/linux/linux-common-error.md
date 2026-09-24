# 第十章：常见错误及解决方案

* **虚拟化支持异常情况如下几种情况：**

![image-20220703221652479](../../../assets/posts/linux/image-20220703221652479.png)



![image-20220703221709827](../../../assets/posts/linux/image-20220703221709827.png)



![image-20220703221726355](../../../assets/posts/linux/image-20220703221726355.png)

![image-20220703221738842](../../../assets/posts/linux/image-20220703221738842.png)



​	问题原因：宿主机 BIOS 设置中的硬件虚拟化被禁用了

​	解决办法：需要打开笔记本 BIOS 中的 IVT 对虚拟化的支持

![image-20220703221852883](../../../assets/posts/linux/image-20220703221852883.png)


