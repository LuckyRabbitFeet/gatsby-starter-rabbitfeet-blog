---
title: React组件的生命周期
date: 2019-04-23 16:31:00
cat: misc
tags:
  - react
  - 笔记
---

每个组件都包含“生命周期方法”。
通常，组件的生命周期可以分为三个阶段：**挂载阶段**、**更新阶段**、**卸载阶段**。
官方文档可参考：<https://reactjs.org/docs/react-component.html#the-component-lifecycle>
截至本文编辑日期，react 版本为：v16.8.6

## 挂载阶段

在这个阶段中，组件将会被创建，执行初始化，然后插入 DOM 中。
生命周期顺序如下：

- constructor()
- static getDerivedStateFromProps()
- render()
- componentDidMount()

## 更新阶段

在组件插入 DOM 后，组件的 props 或 state 发生变化时会触发更新。
生命周期顺序如下：

- static getDerivedStateFromProps()
- shouldComponentUpdate()
- render()
- getSnapshotBeforeUpdate()
- componentDidUpdate()

## 卸载阶段

即组件从 DOM 中移除。
此时会调用如下方法：

- componentWillUnmount()

## 补充

### 错误处理

当渲染过程，生命周期，或子组件的构造函数中抛出错误时，会调用如下方法：

- static getDerivedStateFromError()
- componentDidCatch()

### 过时的 API

值得注意的是，在许多早期教程中经常提到的部分 API 方法在文档中被标记为“过时”，虽然这些接口还可以使用，但是官方并不建议在新版本中继续使用他们。
这几个接口分别是：

- componentWillMount()
- componentWillReceiveProps()
- componentWillUpdate()

在官方博客[Update on Async Rendering](https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html)中可以看到相关建议与改进/替代方案。
