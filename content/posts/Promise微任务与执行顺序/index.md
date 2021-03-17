---
title: Promise 微任务与执行顺序
date: 2021-03-17 13:07:02
cat: code
tags:
  - 笔记
  - javascript
  - Promise
---

今天在 QQ 群里摸鱼闲晃的时候，看到有位群友提了一个非常有意思的问题：
下面这串代码中，为什么 4 在 3 之后被打印。

```js
Promise.resolve()
  .then(() => {
    console.log(0);
    return Promise.resolve(4);
  })
  .then(res => {
    console.log(res);
  });

Promise.resolve()
  .then(() => {
    console.log(1);
  })
  .then(() => {
    console.log(2);
  })
  .then(() => {
    console.log(3);
  })
  .then(() => {
    console.log(5);
  });

// output
012345
```

说实话一开始我还觉得这问题挺无聊的，毕竟这种写法可能有那么点实际意义，但可读性很差，对于代码的维护来说很不友好，在我的观念中能在实际应用中写出这种代码的，要么是真大佬，要么就是迫于无奈的老代码。

但是，这会我不是在摸鱼么，在摸鱼的时候就是会对这种“无聊”的题目产生兴趣然后去研究下的 ╮(╯▽╰)╭

关于 JavaScript 中的 Event Loop 以及 宏任务和微任务 就不多废话了，这是前置知识，不清楚就先随便查下学习下好了，资料非常多。

在这道题中，主要的关注点就是`return Promise.resolve(4);`，从现象上来看，它占用了 2 个微任务，所以 4 才会在 3 之后被输出，那为什么会这样呢。

从文档[时序][1]中可以得知：
> 为了避免意外，即使是一个已经变成 resolve 状态的 Promise，传递给`then()`的函数也总是会被异步调用

也就是说`Promise.resolve(4);`本身会占用一个宏任务，导致接下来的`then()`被阻滞，于是`console.log(2);`优先输出，之后`Promise.resolve(4);`又会注册一个微任务来处理`resolve(4)`于是`console.log(3);`优先输出。

这么讲可能不太好理解，所以画个图来理解下。

![执行顺序][2]

如果你看过了微任务的概念的话，这时候你可能就要问了：不是说如果执行过程中如果遇到新的微任务，就将它添加到微任务的任务队列中，直到微任务全部执行完才会继续宏任务吗，那这样一来为什么 5 会在 4 之后输出呢，不是应该先吧微任务执行完的吗？

嗯，从原理上来说是应该这样的，不过这样一来就会产生事件循环无尽处理微任务的风险，所以每当一个任务存在，事件循环都会检查该任务是否正把控制权交给其他 JavaScript 代码，在这种情况下宏任务和微任务也是会交替执行的。

当然，Promise 的执行顺序也和 Promise 本身的实现有关系，不过这部分就展开讨论了，毕竟这就涉及到源码部分了，也更有难度，所以这次就仅从机制上来理解了。

虽然题目看上去很简单，但是涉及的内容却直指 JavaScript 的核心机制，通过对这道题的解析，也巩固和加强了自己对机制上的了解，从某种角度上来说，这也算是一个好问题了。

参考：
  - [使用 Promise #时序][1]
  - [在 JavaScript 中通过 queueMicrotask() 使用微任务 #任务_vs_微任务][3]
  - [深度揭秘 Promise 微任务注册和执行过程][4]
  - [js中的宏任务与微任务][5]
  - [JavaScript中的Event Loop（事件循环）机制][6]

[1]: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Using_promises#%E6%97%B6%E5%BA%8F
[2]: https://cdn.jsdelivr.net/gh/LuckyRabbitFeet/rabbitfeet.net@master/res/Promise%E5%BE%AE%E4%BB%BB%E5%8A%A1%E4%B8%8E%E6%89%A7%E8%A1%8C%E9%A1%BA%E5%BA%8F/执行顺序.png
[3]: https://developer.mozilla.org/zh-CN/docs/Web/API/HTML_DOM_API/Microtask_guide#%E4%BB%BB%E5%8A%A1_vs_%E5%BE%AE%E4%BB%BB%E5%8A%A1
[4]: https://juejin.cn/post/6844903987183894535
[5]: https://zhuanlan.zhihu.com/p/78113300
[6]: https://segmentfault.com/a/1190000022805523
