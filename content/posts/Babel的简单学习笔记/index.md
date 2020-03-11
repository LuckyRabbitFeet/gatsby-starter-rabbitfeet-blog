---
title: Babel的简单学习笔记
date: 2020-03-11 16:06:22
cat: code
tags:
  - 笔记
  - babel
---

我又回来回顾基础了，在之前的[配置 React 脚手架](https://rabbitfeet.net/archives/%E9%85%8D%E7%BD%AEReact%E8%84%9A%E6%89%8B%E6%9E%B6)一文中我简单介绍了 Babel，但当时对 Babel 的了解还十分浅显，很多地方还时不清不楚不明不白的，于是今天就来重新学习整理一下。

<a href="https://rabbitfeet.net/archives/%E9%85%8D%E7%BD%AEReact%E8%84%9A%E6%89%8B%E6%9E%B6" title="配置 React 脚手架" style="display:block;width:80%;margin: 16px auto;padding: 16px;border: 1px solid rgba(0, 0, 0, 0.2);border-radius: 3px;color: inherit; text-decoration: none">
<p style="margin: 0 0 5px 0">配置 React 脚手架</p>
<p style="margin: 0 0 5px 0; color: gray; font-size: 0.9em">一开始学习 React 的时候，一直使用官方提供的`creat-react-app`命令来进行项目的创建，最近心血来潮，想看看官方的脚手架搭建方式...</p>
<p style="margin: 0; font-size: 0.85em">https://rabbitfeet.net/archives/%E9%85%8D%E7%BD%AEReact%E8%84%9A%E6%89%8B%E6%9E%B6</p>
</a>

## 几句废话

打开 Babel 的官网，说实话每次都看得头昏眼花，什么东西可以不装？什么东西必装？哪些设置有用？哪些设置可以默认？总要研究好久……

总之，Babel 的配置可以简单理解成 **预设 + 插件** 的模式。预设解决常用的语法转换，插件搞定预设不能解决的情况。

## 依赖包

- `@babel/core`

  开发依赖，必装。
  如果按官网教程来，那第一个安装的就是他，他作为 Babel 的核心模块包含了所有的转换 api。

- `@babel/cli`

  开发依赖，非必装。
  Babel 的命令行工具。

- `@babel/preset-env`

  开发依赖。

  > `@babel/preset-env` is a smart preset that allows you to use the latest JavaScript without needing to micromanage which syntax transforms (and optionally, browser polyfills) are needed by your target environment(s). This both makes your life easier and JavaScript bundles smaller!

  简单讲就是语法插件预设，通过配置可以实现自动兼容代码，包括自动引入 polyfill 垫片处理新的 API（例如：Promise,Generator,Symbol 等）以及实例方法（例如 Array.prototype.includes 等）。

  虽说不装也行，不过这比手动配置一大堆语法插件要来的方便许多。

  除了 env 这个预设之外，还有 stage-0、stage-1、stage-2、stage-3、flow、react、minify、typescript 这几个预设值。

  从 Babel v7 开始 stage 预设已被弃用可以不再考虑，剩下 4 个预设则可以使用在特定场合。

- `@babel/plugin-transform-runtime`

  开发依赖，非必装。
  他的作用是可以复用工具函数以缩减代码大小。
  同时，这个插件还提供了一个沙盒环境。

- `@babel/runtime`

  生产依赖，非必装。
  在安装`@babel/plugin-transform-runtime`时被要求安装，与`@babel/plugin-transform-runtime`同时存在。
  这个插件提供了 runtime helpers 和 `regenerator-runtime`。

## Polyfill

> 🚨 As of Babel 7.4.0, this package has been deprecated in favor of directly including core-js/stable (to polyfill ECMAScript features) and regenerator-runtime/runtime (needed to use transpiled generator functions):
>
> ```js
> import 'core-js/stable'
> import 'regenerator-runtime/runtime'
> ```
>
> from https://babeljs.io/docs/en/usage#polyfill

在 Babel 7.4.0 之前，可以通过安装`@babel/polyfill`来处理实例方法和 ES+新增的内置函数，而 7.4.0 之后，由于 Babel 舍弃了`@babel/polyfill`，所以需要通过安装`core-js`来替代。

`regenerator-runtime`会在安装`@babel/runtime`时自动安装，所以不必单独安装。

### 通过`@babel/preset-env`处理 polyfill

在`@babel/preset-env`中，可以通过配置`useBuiltIns`选项来处理 polyfill。

嘛~ 这部分文档写的也挺清楚了，就不废话了：
https://babeljs.io/docs/en/babel-preset-env#usebuiltins

### 通过`@babel/plugin-transform-runtime`处理 polyfill

在 Babel 7.4.0 之后，可以选择引入`@babel/runtime-corejs3`，设置 `corejs: 3`来实现对实例方法的支持。
https://babeljs.io/docs/en/babel-plugin-transform-runtime#corejs

## 沙盒

那么问题来了，`@babel/preset-env`和`@babel/plugin-transform-runtime`对 polyfill 的支持有啥区别呢？

首先，我们需要明确一点，那就是 polyfill 的使用会造成全局空间的命名污染。

而`@babel/plugin-transform-runtime`所提供的沙盒环境正好解决了这个问题。

配置项:

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "usage",
        "corejs": 2
      }
    ]
  ],
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "corejs": 3
      }
    ]
  ]
}
```

input:

```js
const a = new Promise()
```

使用`@babel/plugin-transform-runtime`前
output:

```js
'use strict'

require('core-js/modules/es.object.to-string')

require('core-js/modules/es.promise')

var a = new Promise()
```

使用`@babel/plugin-transform-runtime`后
output:

```js
'use strict'

var _interopRequireDefault = require('@babel/runtime-corejs3/helpers/interopRequireDefault')

var _promise = _interopRequireDefault(
  require('@babel/runtime-corejs3/core-js-stable/promise')
)

var a = new _promise.default()
```

如示例所示，在使用了`@babel/plugin-transform-runtime`后，`require('@babel/runtime-corejs3/core-js-stable/promise')`被包裹在了`_interopRequireDefault`函数中。

## 总结

在普通开发时使用`preset-env`或`@babel/plugin-transform-runtime`配置 polyfill 都可以，但在开发类库项目时，最好还是采用`@babel/plugin-transform-runtime`来进行配置。

最后看了几个 GitHub 项目，感觉大家对 Babel 的配置都很简单，不知为何很多人都没有引入 polyfill……也许正好是我参考学习的项目方向可以不使用 ployfill 吧。

---

参考
[Babel docs](https://babeljs.io/docs/en/)
[Babel 快速上手使用指南](https://juejin.im/post/5cf45f9f5188254032204df1)
[史上最清晰易懂的 babel 配置解析](https://segmentfault.com/a/1190000018721165)
[结合 Babel 7.4.0 谈一下 Babel-runtime 和 Babel-polyfill](https://juejin.im/post/5d0373a95188251e1b5ebb6c)
