---
title: '[COM/ATL]COM组件编程——初步了解'
date: 2018-09-26 19:58:00
cat: repro
tags:
  - C/C++
  - COM组件
---

## 什么是 COM 组件

COM 是 Component Object Model（组件对象模型）的缩写。COM 组件是以 WIN32 动态链接库（DLL）或可执行文件（EXE）形式发布的可执行代码组成

## 什么是 GUID

globally unique identifier（GUID——全球唯一标识符） 分配给 COM 对象的标识符（ID）。它通过一种复杂的算法生成，该算法保证所有 的 COM 对象都有着唯一的 ID，而不会出现名字冲突。

## COM 组件编程

程序的编写模式

- 结构化编程：代表 C 语言，自顶向下的编程方式，根据软件的流程或者功能划分模块，完成程序的编写。
- 面向对象编程：代表 C++语言，引入类的概念，提出了封装，继承，多态等特性。
- 面向组件编程：可维护性和可复用性，类似于搭积木的开发方式。

组件：组件实际上是一些可以执行的二进制代码，表现形式可以是 dll，也可以使 exe。

组件特点：1.二进制代码，可以执行 2.使用灵活方便 3.和编程语言无关

组件的标准：COM 提供了组件编写的标准，任何语言编写组件时，都要遵循这个标准。

组件接口：向外对使用者提供组件的功能。

## COM 接口

接口：C 语言，接口就是函数；C++语言，接口就是累的成员函数；COM 接口，一些纯虚函数的集合。

C++接口的实现：1.定义纯虚函数(接口) 2.基于接口，派生实现类 3.创建实现类的对象(CreateInstance()函数) 4.使用接口返回创建的对象

DLL 接口的实现：代码既不用重新编写，也不用重新编译

## 实例

```c++
//新建MFC的Interface工程，删除掉自动生成的文件(除了stdafx.h和stdafx.cpp)，并设置 属性->链接器->系统->子系统  控制台 (/SUBSYSTEM:CONSOLE)

// Interface.cpp : 定义应用程序的类行为。
#include "stdafx.h"
#include <ObjBase.h>

//--------功能的提供者
interface CMath//接口，相等于纯虚类
{
public:
	virtual int Add(int nAdd1,int nAdd2)=0;
	virtual int Sub(int nSub1,int nSub2)=0;
};

class CImpMath:public CMath
{
public:
	virtual int Add(int nAdd1,int nAdd2);
	virtual int Sub(int nSub1,int nSub2);
};

int CImpMath::Add(int nAdd1,int nAdd2)
{
	return (nAdd1+nAdd2);
}

int CImpMath::Sub(int nSub1,int nSub2)
{
	return (nSub1-nSub2);
}

class CImpMath2:public CMath
{
public:
	virtual int Add(int nAdd1,int nAdd2);
	virtual int Sub(int nSub1,int nSub2);
};

int CImpMath2::Add(int nAdd1,int nAdd2)
{
	return (nAdd1+nAdd2+100);
}

int CImpMath2::Sub(int nSub1,int nSub2)
{
	return (nSub1-nSub2-100);
}

CMath* CreatInstance()
{
	return new CImpMath2;
}

//功能的使用者
void main()
{
	int nSum[2]={0};

	//一般的调用方式
	CImpMath2 math;
	nSum[0]=math.Add(100,100);

	//使用接口的调用方式，依赖的是接口而不是具体的实现
	CMath* pMath=CreatInstance();
	nSum[1]=pMath->Add(100,100);

	printf("nSum[0]=%d ; nSum[1]=%d",nSum[0],nSum[1]);//nSum[0]=300 ; nSum[1]=300
}
```

转载自：[https://blog.csdn.net/ouyangshima/article/details/8794811](https://blog.csdn.net/ouyangshima/article/details/8794811)
