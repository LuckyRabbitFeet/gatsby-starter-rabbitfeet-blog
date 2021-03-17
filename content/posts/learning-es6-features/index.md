---
title: ES6特性学习
date: 2018-12-20 09:20:00
cat: code
tags:
  - javascript
  - 笔记
---

## 1.let & const 命令

### let

在 ES6 中，新增了`let`命令，这个命令的用法与`var`类似。

在 js 中`var`作为定义变量的关键字，并不是完美的，而`let`的出现弥补了`var`的不足之处。

#### 作用域

在 ES5 中只有全局作用域和函数作用域，没有块级作用域。
这会导致几个不太合理的问题~~（至少在我看来不太合理）~~。
列个比较典型的作用域问题：同名变量覆盖，这个问题解释起来比较麻烦，直接看例子吧。

```js
var tmp = 10;
function func() {
    console.log(tmp);
    if (false) {
        var tmp = 20;
    }
    return tmp;
}
console.log(func());
--------------------------------
output:
undefined
undefined
```

为啥输出结果为`undefined`呢，因为在 ES5 中只有全局作用域的关系，所有的变量都会出现**变量提升**的现象，即实际上运行的代码会变成这样：

```js
var tmp = 10
function func() {
  var tmp //在这里，tmp被重新赋值为undefined。
  console.log(tmp)
  if (false) {
    tmp = 20
  }
  return tmp
}
console.log(func())
```

而`let`的出现，主要就是弥补了这个作用域的问题。

#### 块级作用域

`let`为 JavaScript 新增了块级作用域。
简单讲，就是在`{}`内,`let`声明的变量是**块内唯一**的。
就这样。

#### 不存在变量提升

变量提升，从名称中可以猜个大概：变量上升了。

先看个简单的栗子：

```js
console.log(foo)
var foo = 2

outpit: undefined
```

变量`foo`在声明前被使用了，但是没有报错，而是输出了`undefined`，这是因为变量`foo`发生了提升现象：即脚本开始运行时，变量`foo`已经存在了，但是没有值，所以会输出`undefined`。

而通过`let`定义的变量则不会出现变量提升现象：

```js
console.log(foo)
let foo = 2

output: 报错ReferenceError
```

假设在定义前使用了变量，就会报错。

PS.js 引擎的工作方式是 ① 先解析代码，获取所有被声明的变量；② 然后在运行。也就是专业来说是分为预处理和执行两个阶段。

#### 暂时性死区

在前面**块级作用域**中，已经讲过`let`声明的变量是**块内唯一**的，那么如果在块外出现了同名变量会怎么样？

在 ES6 中，明确规定了，如果区块中存在`let`命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。凡是在声明之前就使用这些变量，就会报错。
用例子说话：

```js
var tmp = 123

if (true) {
  tmp = 'abc' // ReferenceError
  let tmp
}
```

简单讲，就是块级作用域会造成类似 C/C++中的**变量遮蔽**情况，在块内使用块内定义的变量，而块外就使用块外的变量，井水不犯河水。

#### 不允许重复声明

`let`不允许在相同作用域内，重复声明同一个变量。
这个也和块级作用域有关系，就和前面讲的 "`let`声明的变量是**块内唯一**的" 一样，他不可以重复声明。

### const

从使用规则上来说，`const`与`let`基本相同，唯一的区别是：`const`声明一个只读的常量。一旦声明，常量的值就不能改变。

PS.`const`本质上固定的是地址，所以在定义`const`对象时需要注意，他只能保证变量指向的对象不被修改，而对象的属性和方法是可以被修改的。

## 2.模板字符串

通常，使用拼接字符串变量时一般都是使用`+`来实现的，但是通过模板字符串，就可以省去`+`的使用。

```js
// 普通字符串
;`In JavaScript '\n' is a line-feed.`

// 多行字符串
;`In JavaScript this is
 not legal.`
console.log(`string text line 1
string text line 2`)

// 字符串中嵌入变量
let name = 'Bob'
let time = 'today'
;`Hello ${name}, how are you ${time}?`
```

模板字符串（template string）是增强版的字符串，用反引号（`）标识。就如同上面例子所示，它可以当作普通字符串使用，也可以用来定义多行字符串，或者在字符串中嵌入变量。

## 3.对函数的扩展

### 参数默认值

ES6 之前，不能直接为函数的参数指定默认值，只能采用变通的方法在函数内部进行默认值的赋值。

```js
function log(x, y) {
  y = y || 'World'
  console.log(x, y)
}

log('Hello') // Hello World
log('Hello', 'China') // Hello China
log('Hello', '') // Hello World
```

这种方法并不直观，也比较麻烦，而在 ES6 中允许为函数的参数设置默认值，即直接写在参数定义的后面。

```js
function log(x, y = 'World') {
  console.log(x, y)
}

log('Hello') // Hello World
log('Hello', 'China') // Hello China
log('Hello', '') // Hello
```

除了简洁，ES6 的写法还有两个好处：首先，阅读代码的人，可以立刻意识到哪些参数是可以省略的，不用查看函数体或文档；其次，有利于将来的代码优化，即使未来的版本在对外接口中，彻底拿掉这个参数，也不会导致以前的代码无法运行。

需要注意的是，参数变量是**默认声明**的，所以不能用 let 或 const 再次声明。

```js
function foo(x = 5) {
  let x = 1 // error
  const x = 2 // error
}
```

### rest 参数

ES6 引入`rest`参数（形式为`...变量名`），用于获取函数的多余参数，这样就不需要使用`arguments`对象了。`rest`参数搭配的变量是一个数组，该变量将多余的参数放入数组中。

这个东西就像 C++中的`...`运算符，作用是接收函数实参中，多余的值。

比如：

```js
function func(a, ...values) {
  console.log(a, values);
}
func(1, 2, 3, 4, 5);
-------------------------------
output:
1 [ 2, 3, 4, 5 ]
```

可以看到变量`values`接收了剩下的`2, 3, 4, 5`并把他们组合成了应该数组。

如果要使用`arguments`就会变得麻烦多了，首先`arguments`对象不是数组，而是一个类似数组的对象，他存储了所有输入的实参。所以为了使用数组的方法，必须使用 Array.prototype.slice.call 先将其转为数组。

```js
// arguments变量的写法
function func(a) {
  console.log(a, Array.prototype.slice.call(arguments).sort());
}
func(1, 2, 3, 4, 5);
----------------------------------------------------------------
output:
1 [ 1, 2, 3, 4, 5 ]
```

可以看到`arguments`输出的数组中也含有`a`的值，这就证实了`arguments`对象存储了所有输入的实参，如果需要使用多参数的话，使用他就会变得很不便利。

### name 属性

函数的 name 属性，返回该函数的函数名。

这个属性早就被浏览器广泛支持，但是直到 ES6，才将其写入了标准。

ES5 与 ES6 中`name`属性的对比：

```js
var f = function() {}

// ES5
f.name // ""

// ES6
f.name // "f"
```

对于匿名函数，如果将一个匿名函数赋值给一个变量，ES5 的`name`属性，会返回空字符串，而 ES6 的`name`属性会返回实际的函数名。

```js
const bar = function baz() {}

// ES5
bar.name // "baz"

// ES6
bar.name // "baz"
```

如果将一个具名函数赋值给一个变量，则 ES5 和 ES6 的 name 属性都返回这个具名函数原本的名字。

### 箭头函数

#### 基本用法

ES6 允许使用“箭头”（`=>`）定义函数。

```js
var f = v => v

// 等同于
var f = function(v) {
  return v
}
```

如果箭头函数不需要参数或需要多个参数，就使用一个圆括号代表参数部分。

```js
var f = () => 5
// 等同于
var f = function() {
  return 5
}

var sum = (num1, num2) => num1 + num2
// 等同于
var sum = function(num1, num2) {
  return num1 + num2
}
```

如果箭头函数的代码块部分多于一条语句，就要使用大括号将它们括起来，并且使用 return 语句返回。

```js
var sum = (num1, num2) => {
  return num1 + num2
}
```

由于大括号被解释为代码块，所以如果箭头函数直接返回一个对象，必须在对象外面加上括号，否则会报错。

```js
// 报错
let getTempItem = id => { id: id, name: "Temp" };

// 不报错
let getTempItem = id => ({ id: id, name: "Temp" });
```

#### 注意点

1. 函数体内的`this`对象，就是定义时所在的对象，而不是使用时所在的对象。
2. 不可以当作构造函数，也就是说，不可以使用`new`命令，否则会抛出一个错误。

总的来说在箭头函数中对于`this`的使用要非常注意，因为一般情况下`this`对象的指向是可变的，而在箭头函数中，它是固定的。如果是普通函数，执行时`this`应该指向全局对象。但是，箭头函数导致`this`总是指向函数定义生效时所在的对象。

```js
function foo() {
    console.log(this);
}

let foo2 = () => console.log(this);

foo();
foo2();
--------------------------------------------
output:
Object [global]
{}
```

可以看到，函数`foo`中的`this`指向了全局对象`global`，而箭头函数`foo2`中的`this`则指向了一个空对象。

## 4.扩展运算符（与解构）

### 数组的情况

扩展运算符（spread）是三个点（...）。它好比 rest 参数的逆运算，将一个数组转为用逗号分隔的参数序列。

```js
console.log(...[1, 2, 3])
// 1 2 3

console.log(1, ...[2, 3, 4], 5)
// 1 2 3 4 5

[...document.querySelectorAll('div')]
// [<div>, <div>, <div>]
```

有一点需要注意的是，如果把扩展运算符放在括号中，除非是函数调用，否则就会报错。

```js
(...[1,2])
// Uncaught SyntaxError: Unexpected number

console.log(...[1,2])
// output：1 2
```

#### 简单应用

- 复制数组

在 js 中，数组是复合的数据类型，如果直接复制的话，只是复制了指向底层数据结构的指针，而不是克隆一个全新的数组。在 ES5 中，通常采用变通方式（克隆）来进行数组的复制：

```js
const a1 = [1, 2]
const a2 = a1.concat()

a2[0] = 2
a1 // [1, 2]
```

而通过扩展运算符就可以让这个过程变得更加简便。

```js
const a1 = [1, 2]
// 写法一
const a2 = [...a1]
// 写法二
const [...a2] = a1
```

- 合并数组

扩展运算符提供了数组合并的新写法。

```js
const arr1 = ['a', 'b']
const arr2 = ['c']
const arr3 = ['d', 'e']

// ES5 的合并数组
arr1.concat(arr2, arr3)
// [ 'a', 'b', 'c', 'd', 'e' ]

// ES6 的合并数组
;[...arr1, ...arr2, ...arr3]
// [ 'a', 'b', 'c', 'd', 'e' ]
```

需要注意的是，这种方式所作的拷贝是浅拷贝，如果内部还有对象的话，那么修改了原数组的成员，会同步反映到新数组。

- 与解构赋值结合

扩展运算符可以与解构赋值结合起来，用于生成数组。

下面是一些例子：

```js
const [first, ...rest] = [1, 2, 3, 4, 5]
first // 1
rest // [2, 3, 4, 5]

const [first, ...rest] = []
first // undefined
rest // []

const [first, ...rest] = ['foo']
first // "foo"
rest // []
```

如果将扩展运算符用于数组赋值，只能放在参数的最后一位，否则会报错。

- 字符串

扩展运算符还可以将字符串转为真正的数组。

```js
;[...'hello']
// [ "h", "e", "l", "l", "o" ]
```

### 对象的情况

#### 解构赋值

对象的解构赋值用于从一个对象取值，相当于将目标对象自身的所有可遍历的（enumerable）、但尚未被读取的属性，分配到指定的对象上面。所有的键和它们的值，都会拷贝到新对象上面。

```js
let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 }
x // 1
y // 2
z // { a: 3, b: 4 }
```

上面代码中，变量`z`是解构赋值所在的对象。它获取等号右边的所有尚未读取的键（`a`和`b`），将它们连同值一起拷贝过来。

由于解构赋值要求等号右边是一个对象，所以如果等号右边是 undefined 或 null，就会报错，因为它们无法转为对象。

```js
let { x, y, ...z } = null // 运行时错误
let { x, y, ...z } = undefined // 运行时错误
```

和数组时一样，解构赋值必须是最后一个参数，否则也会报错。

```js
let { ...x, y, z } = obj; // 句法错误
let { x, ...y, ...z } = obj; // 句法错误
```

PS.注意，解构赋值的拷贝是浅拷贝，即如果一个键的值是复合类型的值（数组、对象、函数）、那么解构赋值拷贝的是这个值的引用，而不是这个值的副本。

```js
let obj = { a: { b: 1 } }
let { ...x } = obj
obj.a.b = 2
x.a.b // 2
```

上面代码中，`x`是解构赋值所在的对象，拷贝了对象`obj`的`a`属性`。a`属性引用了一个对象，修改这个对象的值，会影响到解构赋值对它的引用。

#### 扩展运算符

对象的扩展运算符（...）用于取出参数对象的所有可遍历属性，拷贝到当前对象之中。

```js
let z = { a: 3, b: 4 }
let n = { ...z }
n // { a: 3, b: 4 }
```

由于数组是特殊的对象，所以对象的扩展运算符也可以用于数组。

```js
let foo = { ...['a', 'b', 'c'] }
foo
// {0: "a", 1: "b", 2: "c"}
```

和数组一样，扩展运算符也可以用于合并两个对象。

```js
let a = { a: 1, b: 2 }
let b = { c: 1, d: 2 }
let ab = { ...a, ...b }
//{ a:1, b:2, c:1, d:2 }
```

## 5.类（class）

ES6 提供了更接近传统语言的写法，引入了 Class（类）这个概念。新的 class 写法让对象原型的写法更加清晰、更像面向对象编程的语法，也更加通俗易懂。

### 关键字 class

基本上，ES6 的`class`可以看作只是一个语法糖，它的绝大部分功能，ES5 都可以做到，新的`class`写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已。

```js
//ES5的写法
function Point(x, y) {
  this.x = x
  this.y = y
}

Point.prototype.toString = function() {
  return '(' + this.x + ', ' + this.y + ')'
}

var p = new Point(1, 2)
-------------------------------------------------------(
  //ES6的写法
  class Point {
    constructor(x, y) {
      this.x = x
      this.y = y
    }

    toString() {
      return '(' + this.x + ', ' + this.y + ')'
    }
  }
)
```

上面代码定义了一个“类”，可以看到里面有一个`constructor`方法，这就是构造方法，而`this`关键字则代表实例对象。也就是说，ES5 的构造函数`Point`，对应 ES6 的`Point`类的构造方法。

`Point`类除了构造方法，还定义了一个`toString`方法。注意，定义“类”的方法的时候，前面不需要加上`function`这个关键字，直接把函数定义放进去了就可以了。另外，方法之间**不需要逗号分隔**，加了会报错。

- constructor 方法

`constructor`方法是类的默认方法，通过`new`命令生成对象实例时，自动调用该方法。一个类必须有`constructor`方法，如果没有显式定义，一个空的`constructor`方法会被默认添加。通过调用这个方法，可以返回实例对象（即 this）。

#### 注意点

- 不存在提升

和 ES5 中，类存在变量提升的情况不同，class 不存在变量提升的情况。

- name 属性

ES6 的类只是 ES5 的构造函数的一层包装，所以函数的许多特性都被 Class 继承，包括 name 属性。通过 name 属性，可以获得`class`关键字后面的类名。

### 关键字 extends

Class 可以通过 extends 关键字实现继承，这比 ES5 的通过修改原型链实现继承，要清晰和方便很多。

```js
class Point {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
}

class ColorPoint extends Point {
  constructor(x, y, color) {
    super(x, y) // 调用父类的constructor(x, y)
    this.color = color
  }
}
```

上面代码中，`constructor`方法之中，出现了`super`关键字，它在这里表示父类的构造函数，用来新建父类的`this`对象。

子类必须在`constructor`方法中调用`super`方法，否则新建实例时会报错。这是因为子类自己的`this`对象，必须先通过父类的构造函数完成塑造，得到与父类同样的实例属性和方法，然后再对其进行加工，加上子类自己的实例属性和方法。如果不调用`super`方法，子类就得不到`this`对象。

```js
class Point {
  /* ... */
}

class ColorPoint extends Point {
  constructor() {}
}

let cp = new ColorPoint() // ReferenceError
```

上面代码中，ColorPoint 继承了父类 Point，但是它的构造函数没有调用 super 方法，导致新建实例时报错。

ES5 的继承，实质是先创造子类的实例对象`this`，然后再将父类的方法添加到`this`上面。ES6 的继承机制完全不同，实质是先将父类实例对象的属性和方法，加到`this`上面（所以必须先调用`super`方法），然后再用子类的构造函数修改`this`。

### 关键字 super

`super`这个关键字，既可以当作函数使用，也可以当作对象使用。在这两种情况下，它的用法完全不同。

第一种情况，`super`作为函数调用时，代表父类的构造函数。ES6 要求，子类的构造函数必须执行一次`super`函数。

```js
class A {}

class B extends A {
  constructor() {
    super()
  }
}
```

上面代码中，子类 B 的构造函数之中的 super()，代表调用父类的构造函数。这是必须的，否则 JavaScript 引擎会报错。

第二种情况，super 作为对象时，在普通方法中，指向父类的原型对象；在静态方法中，指向父类。

```js
class A {
  p() {
    return 2
  }
}

class B extends A {
  constructor() {
    super()
    console.log(super.p()) // 2
  }
}

let b = new B()
```

上面代码中，子类`B`当中的`super.p()`，就是将`super`当作一个对象使用。这时，`super`在普通方法之中，指向`A.prototype`，所以`super.p()`就相当于`A.prototype.p()`。

需要注意的是，因为`super`指向原型对象，所有定义在父类实例上的方法或属性是无法通过`super`调用的。

```js
class A {
  constructor() {
    this.p = 2
  }
}

class B extends A {
  get m() {
    return super.p
  }
}

let b = new B()
b.m // undefined
```

上面代码中，`p`是父类`A`实例的属性，`super.p`就引用不到它。

## 6.异步回调（Promise）

### 特点

（1）对象的状态不受外界影响。`Promise`对象代表一个异步操作，有三种状态：`pending`（进行中）、`fulfilled`（已成功）和`rejected`（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。这也是`Promise`这个名字的由来，它的英语意思就是“承诺”，表示其他手段无法改变。

（2）一旦状态改变，就不会再变，任何时候都可以得到这个结果。`Promise`对象的状态改变，只有两种可能：从`pending`变为`fulfilled`和从`pending`变为`rejected`。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为 resolved（已定型）。如果改变已经发生了，你再对`Promise`对象添加回调函数，也会立即得到这个结果。这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。

### 个人理解

`Promise`是 ES6 对于异步与回调的一个改进语法，通过`promise`和`then`的组合，用同步的语法实现异步功能。
举个例子：

```js
function timeout(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms, 'done')
  })
}

timeout(100).then(value => {
  console.log(value)
})

console.log('1')

output: 1
done
```

上面代码中，`timeout`方法返回一个`Promise`实例，表示一段时间以后才会发生的结果。过了指定的时间（ms 参数）以后，`Promise`实例的状态变为`resolved`，就会触发`then`方法绑定的回调函数。

上面这个例子虽然看上去有点脱裤子放屁的感觉，但是我认为他把`promise`和`then`的性质很好的表现出来了。首先，从这个例子中可以看出，`promise`在新建后会立即执行，而`then`则是他的回调函数，在当前脚本所有的同步任务执行完之后，才会执行。

## 7.async 函数

ES2017 标准引入了 async 函数，使得异步操作变得更加方便。

### 基础语法

`async`函数返回一个`Promise`对象，可以使用`then`方法添加回调函数。当函数执行的时候，一旦遇到`await`就会先返回，等到异步操作完成，再接着执行函数体内后面的语句。

```js
async function getStockPriceByName(name) {
  const symbol = await getStockSymbol(name)
  const stockPrice = await getStockPrice(symbol)
  return stockPrice
}

getStockPriceByName('goog').then(function(result) {
  console.log(result)
})
```

### 个人的简单理解

```js
console.log(1)
async function func() {
    await console.log(2.0);
    await console.log(2.1);
    await console.log(3);

}
func()
console.log(4)
setTimeout(()=>{console.log(5);},200);
console.log(6)
--------------------------------------------
output:
1
4
6
2.0
2.1
3
5
```

在函数执行后，首先执行了日志**1**打印，之后运行函数**func**，进入后遇到了第一个`await`，如果`await`后面跟的是函数的话这时会进行函数的执行，否则`func`就会返回执行函数体外的的语句，在主线程空闲时，再会过来获取`await`后面的结果，所以在例子中，先输出了 1，4，6 之后才输出了 2.0。

在`async`中，所有的`await`都遵循上面的原则。

PS.这个机制貌似和 js 的事件轮询机制相关，具体我也了解的不是很透彻，还需要继续深入学习一下。

学习资料：
[ECMAScript 6 入门][1]

[1]: http://es6.ruanyifeng.com/
