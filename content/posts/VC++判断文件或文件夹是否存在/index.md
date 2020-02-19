---
title: VC++判断文件或文件夹是否存在
date: 2018-09-26 19:48:00
cat: code
tags:
  - C/C++
  - 笔记
---

前段时间在测试软件的时候发现在配置文件不存在的情况下，读取文件的函数没有加入安全控制，导致软件崩溃。然后就去查了下资料，发现判断文件是否存在的方式有很多种。

```c++
#include <windows.h>

void main()
{
//文件或文件夹都可以判断，最后的\\号有无都没关系
if (-1!=GetFileAttributes("D:\\MyProjects\\临时程序")) //如果文件夹存在， 最后的\\号有无都没关系
printf("文件夹存在\n");

if (-1!=GetFileAttributes("D:\\MyProjects\\临时程序\\Desktop.ini")) //如果文件存在
printf("文件存在\n");

//可以区分是路径还是文件,PathIsDirectory返回值必须强制转为(bool)
if (true==(bool)PathIsDirectory("D:\\MyProjects\\临时程序")) //最后的\\号有无都没关系
printf("测试PathIsDirectory 文件夹存在\n");
else
printf("测试PathIsDirectory 文件夹不存在\n");

//PathFileExists返回值必须强制转为(bool)
//文件或文件夹都可以判断，最后的\\号有无都没关系
if (true==(bool)PathFileExists("D:\\MyProjects\\临时程序\\")) //最后的\\号有无都没关系
printf("PathFileExists 文件夹存在\n");
else
printf("PathFileExists 文件夹不存在\n");

if (true==(bool)PathFileExists("D:\\MyfProjects\\临时程序\\Desktop.ini"))
printf("PathFileExists 文件存在\n");
else
printf("PathFileExists 文件不存在\n");

}
```
