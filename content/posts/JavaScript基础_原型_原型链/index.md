---
title: JavaScript基础：原型&原型链
date: 2018-12-12 14:37:00
cat: code
tags:
  - javascript
  - 笔记
---

## 原型

### 什么是原型

JavaScript 对象可以从其他对象那里继承属性和行为。更具体的说，JavaScript 使用**原型式继承**，其中其行为**被**继承的对象称为**原型**

### 如何创建函数原型

说是创建可能不太合适，因为原型的创建需要通过`[构造函数].prototype`来进行设置，这个`[构造函数].prototype`就是代码写法的原型。<br>
所以，在设置前需要有一个已经创建好的对象构造函数。

举个例子：

```js
//创建对象构造函数
function Test(value1, value2) {
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = function() {
            ...
        }
 }

//设置原型
Test.prototype.proValue1 = 1;
Test.prototype.proValue2 = function() {...};
```

在上面的例子中，直接使用了函数点出了 prototype 属性，这就说明了在 JavaScript 中，函数也是对象，不过这不重要，毕竟，在 js 中几乎所有的东西都是对象 ┑(￣ Д ￣)┍

### 重写原型

怎么说呢，在通过构造函数创建对象实例后，对象会继承原型的属性和行为，那么如果当前对象属性值需要与原型不同那要怎么做？很简单，通过重写原型即可解决。

例如：

```js
//创建对象构造函数
function Test(value1, value2) {
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = function() {
            ...
        }
 }

//设置原型
Test.prototype.proValue1 = 1;
Test.prototype.proValue2 = function() {...};

//重写原型
var doTest = new Test(1, 2);
doTest.proValue1 = 10;      //属性provalue1被重写
console.log(doTest.proValue1);

output:
10
```

就如上面这个例子，因为对象的属性是**自下而上**的，**先从对象中列出的属性中寻找，如果有符合的就会直接使用，如果没有，就会去原型中寻找使用**，所以如果在对象中添加同名属性，在使用时就会覆盖原型优先使用。

doTest 的属性分解：

```js
//未重写时
//原型包含属性/方法：
{
    proValue1 = 1；
    proValue2 = func...；
}
//对象包含属性/方法：
{
    value1 = 1;
    value2 = 2;
    value3 = func...；
}
//在doTest使用属性proValue1时，会先在对象列表中寻找属性
//发现没有后，转向原型中寻找
----------------------------------------------------------
//重写后
//原型包含属性/方法：
{
    proValue1 = 1；
    proValue2 = func...；
}
//对象包含属性/方法：
{
    value1 = 1;
    value2 = 2;
    value3 = func...；
    proValue1 = 10；
}
//在使用doTest.proValue1 = 10;时
//并不是改变了原型中的值，而是直接在对象中添加了proValue1属性
//所以在使用proValue1属性时，会直接使用对象中的值
```

### 原型特性

一旦设置或修改原型的属性/方法，那么所有衍生出来的对象都将受到影响，即便这个对象的创建优先于原型的设置也是一样。<br>
要想不受到影响，那就只有重写属性这一个方法。

## 原型链

### 什么是原型链

原型链是一种继承关系，就如同继承关系中的父级继承祖父级，子级继承父级一样。通过原型链，可以让继承者使用继承下来的所有属性与方法。

举例：<br>
如同测试一样，祖父级为：测试；父级可以有：大型测试/小型测试；子级可以有：异常测试/压力测试/功能测试等等，他们都可以从前一级或者更前面继承属性和方法。当然这只是个例子，实际操作还需举一反三。

### 如何创建一个原型链

首先需要创建一个子级对象的构造函数。

联系上文的代码：

```js
//创建子级对象构造函数
function TestChild(value4, value5) {
    this.value4 = value4;
    this.value5 = value5;
    this.value6 = function () {
            ...
        }
 }
```

然后通过`[构造函数].prototype`来设置父级。

```js
TestChild.prototype = New Test();
//在这里没有使用参数，所以原型/父级的属性值可能会为undefined
```

这样就完成了原型链的绑定，之后就可以通过 TestChild.prototype 为子级补全原型了。

```js
TestChild.prototype.proValue3 = 1;
TestChild.prototype.proValue4 = function() {...};
```

### 对于原型链的自我分析

直接来看的话，对于其原理还是有些难以理解，所以做了一些实际测试，结合实际效果，做一些自我理解上的分析。

首先是`TestChild.prototype = New Test();`这一部分，根据实际操作和 js 理论来看，TestChild 的原型中实际加入的是 Test 的对象，所以 TestChild 的父级就拥有了 Test 的所有属性和方法，同时，因为他加入的是对象，所以在使用时，可以通过对象来使用 Test 的原型。

利用伪代码进行逻辑解析：

```js
//子级对象访问祖父级属性
//代码部分
var child = New TestChild();
child.proValue1;
//伪代码，子级对象通过父级对象访问祖父级属性
var child = New TestChild();
var father = New Test();
child.father.proValue1;
----------------------------------------------------
//伪代码：属性池
祖父级（父级原型）：
Test.prototype {
    proValue1;
    proValue2;
}
父级：
Test {
    value1;
    value2;
    value3;
}
子级原型：
TestChild.prototype = Test;
子级：
TestChild {
    value4;
    value5;
    value6;
}
```

就我个人感想来说，原型链的包含关系就像是上图所示。**在设置父级之后，子级的原型就等于父级对象，子级对象对祖父级或者父级的属性调用就是通过父级对象在调用而已**。

### 使用 call 方法

这是一个内置方法，主要用处是在当前对象中添加父级的属性。这样可以省去在多级原型中，重复代码的问题。

实际操作：

```js
function Father(v1, v2, v3) {
    this.v1 = v1;
    this.v2 = v2;
    this.v3 = v3;
}

function Child(v1, v2, v3) {
    Father.call(this, v1, v2, v3);  //在这里使用了call方法
}

Child.prototype = new Father();
var test = new Child(1, 2, 3);
-------------------------------------------------------
//伪代码：对象test的属性池
Child {
    v1 = 1;
    v2 = 2;
    v3 = 3;
}
Father {
    v1 = undefined;
    v2 = undefined;
    v3 = undefined;
}
```

因为在使用 call 时，第一个参数传入了 this，所以在执行 Father 时，this 指向的是 Child，结果就是 Father 为 Child 添加了属性。

## 相关内置属性/方法

| 属性/方法            |                           说明                           |
| :------------------- | :------------------------------------------------------: |
| construcror          |          属性，指向与这个原型相关联的构造函数。          |
| hasOwnProperty       |         方法，判断属性是否是在对象实例中定义的。         |
| isPrototypeOf        |         方法，判断一个对象是否是另一个对象的原型         |
| propertyIsEnumerable | 方法，用于判断通过迭代对象的所有属性是否可访问指定的属性 |

## 其他

听说在 ES6 中，js 添加了类似 C/C++或者 Java 中的 class 用法来处理原型，这块就等到之后学到了再更新吧。
