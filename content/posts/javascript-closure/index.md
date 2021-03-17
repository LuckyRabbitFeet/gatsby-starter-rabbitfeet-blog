---
title: JavaScript基础：闭包
date: 2018-12-11 14:31:00
cat: code
tags:
  - javascript
  - 笔记
---

## 定义

名词，指的是函数和引用环境。

## 概念解释

### 变量作用域

- 全局变量
- 局部变量
- 自由变量

以上三者区别为:

```js
//全局变量：定义在全局的变量，可视范围为全局。
var global;    //此处的global即为全局变量

function func() {
    .....;
}

//局部变量:定义在函数体中的变量，可视范围为{}范围。
function func() {
    var local;   //此处的local即为局部变量
    .....;
}

//自由变量：既不是在本地定义，也不是全局变量，即为自由变量
//从性质上来说，更像是局部变量的一个延伸。
function func() {
    var free = 0;   //对于func来说，free还是局部变量。
    function funcchild() {
        free++;     //此处，对于funcchild来说，free就是自由变量。
    }
}
```

### “敲定”函数

什么是“敲定”函数？
展开来说，其实敲定的是函数的**环境**，什么是函数环境？
其实也就是所谓的可视范围。
~~以上为自我理解，搞不明白书上或者一些教程里为啥要讲的那么复杂~~
举个例子：

```js
function func() {
  var free = 0 //函数func就是变量free的环境
  function funcchild() {
    free++
  }
}
```

## 闭包

所谓的闭包就是：**包含自由变量的函数与为自由变量提供变量的环境**。
刚刚举的例子：

```js
//funcchild()就是个典型的闭包
function func() {
  var free = 0 //func函数提供了free的环境
  function funcchild() {
    free++ //在funcchild函数中，free为自由变量
    return free
  }
  return funcchild
}
```

### 为什么要使用闭包技术

为了应对协作开发或者多文件开发。
我们都知道全局变量的可视范围是全局的，这个全局并不仅限与当前的代码文件，也可以是同一个系统的其他代码文件，采用闭包技术，就可以很好的包护变量，防止出现同名变量造成冲突。

### 注意点

闭包包含的是实际环境，并不是环境的副本，所以如果在环境中改变了自由变量的值，在使用闭包时，会使用改变之后的值。
