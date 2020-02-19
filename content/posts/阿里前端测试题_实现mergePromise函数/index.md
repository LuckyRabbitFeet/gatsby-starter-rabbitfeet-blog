---
title: 阿里前端测试题：实现mergePromise函数
date: 2018-12-20 11:30:00
cat: code
tags:
  - javascript
  - 笔记
---

## 原题

实现 mergePromise 函数，把传进去的数组顺序先后执行，并且把返回的数据先后放到数组 data 中。

```js
const timeout = ms =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, ms)
  })

const ajax1 = () =>
  timeout(2000).then(() => {
    console.log('1')
    return 1
  })

const ajax2 = () =>
  timeout(1000).then(() => {
    console.log('2')
    return 2
  })

const ajax3 = () =>
  timeout(2000).then(() => {
    console.log('3')
    return 3
  })

const mergePromise = ajaxArray => {
  // 在这里实现你的代码
}

mergePromise([ajax1, ajax2, ajax3]).then(data => {
  console.log('done')
  console.log(data) // data 为 [1, 2, 3]
})

// 分别输出
// 1
// 2
// 3
// done
// [1, 2, 3]
```

## 解题思路

这题主要是希望使用同步的方法线性的执行函数`ajax1, ajax2, ajax3`，在本题中，函数`ajax`是一个定时器，在设制定时器后执行异步打印，因为`ajax2`设置的时间小于`ajax1`和`ajax3`，所以如果线性调用的话，正常来说`ajax2`会早于`ajax1`和`ajax3`返回，所以在做这一题时的核心思路就是**只有当前函数完全执行完毕后，才会进行下一个函数的执行**。

## 我的答案

```js
const mergePromise = ajaxArray => {
  // 在这里实现你的代码
  return new Promise(async function(resolve) {
    let data = []
    for (let it of ajaxArray) {
      let tmp = await it()
      data.push(tmp)
    }
    resolve(data)
  })
}
```

利用`async`函数只有在前一个`await`返回后才会才会进入下一个`await`的特点，实现线性执行异步函数。如此在循环中每次遇到`await`时，都会等待`ajax`函数返回才会继续后面的语句，这样就可以用同步的方式执行完所有的异步函数了。

## 网上的其他答案

```js
const mergePromise = ajaxArray => {
  // 在这里实现你的代码
  var data = []
  var sequence = Promise.resolve()
  ajaxArray.forEach(function(item) {
    sequence = sequence.then(item).then(function(res) {
      data.push(res)
      return data
    })
  })

  return sequence
}
```

怎么说呢，这个答案就比较高深了，第一眼完全没有看懂，仔细分析之后，才大致有了个概念。

首先，因为`mergePromise`只是一个普通函数，不可能会有`.then`方法，所以他在`mergePromise`函数中，返回了`sequence`对象，这个对象返回的是`Promise.resolve()`，从而达到后续代码可以正常执行的目的。

第二，通过`forEach`方法，执行了数组中的每个函数，根据`Promise`的特性，在前一个`then`未执行完时，是不会进行后面`then`的执行的，所以他在`sequence.then(item).then(function(res){...})`这个流程中，线性的执行完了每一个`ajax`函数。

第三，根据`Promise`的特性，每一个`then`的返回值都是一个`Promise`对象，所以即使在前面只是执行了`Promise.resolve()`，他也可以在后面通过`return data`把`data`传递给`Promise`对象，保证了后面执行`mergePromise([ajax1, ajax2, ajax3]).then(data => {...})`时，`then`可以正常接收到传参。

[答案来源][1]

[1]: https://blog.csdn.net/weixin_42595418/article/details/81136909
