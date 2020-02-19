---
title: 配置React脚手架
date: 2019-07-18 21:16:00
cat: code
tags:
  - react
  - webpack
  - javascript
  - 笔记
---

一开始学习 React 的时候，一直使用官方提供的`creat-react-app`命令来进行项目的创建，最近心血来潮，想看看官方的脚手架搭建方式，于是运行了`npm run eject`这个命令……好家伙，生成了一大堆文件。

![react配置文件][1]

随便打开一个……卧槽，密密麻麻的，看的我满头冒汗 emmmm

![密密麻麻][2]

稍微阅览了一下，我发现这个 628 行的配置文件散发着让（wo）人（bu）拒（xiang）绝（kan）的味道……

![拒绝][3]

仔细想了想，这也是因为之前草草的学习了一下 webpack 没有实际应用过导致的后遗症吧，所以决定趁这个机会，学习一下如何自己配置 React 脚手架，顺便就当作 webpack 的实践学习了。

## 主要依赖安装

```bash
// webpack
npm install --save-dev webpack    // webpack本体
npm install --save-dev webpack-cli    // webpack v4+ 版本需要安装CLI
npm install --save-dev webpack-merge webpack-dev-server    // webpack合并工具 | webpack调试工具

// babel
npm install --save-dev @babel/core @babel/preset-env @babel/preset-react    // babel支持

// webpack loader
npm install --save-dev babel-loader
npm install --save-dev style-loader css-loader
npm install --save-dev file-loader

// webpack plugin
npm install --save-dev html-webpack-plugin clean-webpack-plugin

// react
npm install --save react react-dom
```

~~别问这些都是干啥用的，装就是了，都用的着……~~

## 目录配置

![目录配置][4]

## 主要是 webpack 的配置

React 主要依赖 webpack 来完成脚手架的构建，所以 webpack 的配置是关键（也最麻烦）。

```js
// webpack.common.js

const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')

module.exports = {
  devtool: 'source-map',
  entry: {
    app: path.join(__dirname, '../src/index.js'),
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, '../build'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.join(__dirname, '../public/index.html'),
      filename: 'index.html',
      favicon: path.join(__dirname, '../public/favicon.ico'),
    }),
  ],
}
```

```js
// webpack.dev.js

const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common')

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, '../build'),
    host: 'localhost',
    port: 8080,
    hot: true,
    open: true,
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
})
```

```js
// webpack.prod.js

const merge = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const common = require('./webpack.common')

module.exports = merge(common, {
  mode: 'production',
  plugins: [new CleanWebpackPlugin()],
})
```

这里一共分配了三个配置文件，分别用于**调式**和**打包**。`webpack.common.js`为共通配置，`webpack.dev.js`为调试配置，`webpack.prod.js`为打包配置。

这些配置拆开来说其实每个都不算复杂，难点主要体现在如何组合和搭配上，不过这也算是 webpack 的魅力之一了吧，通过各种组合搭配就能轻松管理一个项目。

加载器：`babel-loader`用于`jsx`的语法支持，`style-loader`、`css-loader`用于样式模块化，`file-loader`用于文件模块化。

插件：`html-webpack-plugin` 用于自动生成`html`文件，只需提供一个模板（或者直接配置参数也行），之后在打包的时候 webpack 会自动把脚本和样式代码填充进去，省去了手动配置的过程。`clean-webpack-plugin` 用于清理打包文件夹，把旧文件删除。

关于调试部分，我的配置中是由`webpack-dev-server`来实现的，他提供了一个简单的 web server，而且有实时重新加载的功能。这个功能简单讲就是把代码的修改实时显示到页面上，通过修改配置文件中的`devServer`参数也可以对其功能做一些有针对性的配置。

模块热替换：`webpack-dev-server`配合 webpack 内置的`HMR`（就是代码里的`webpack.HotModuleReplacementPlugin()`）插件，可以允许在运行时更新所有类型的模块，而无需完全刷新。简单讲就是可以在不刷新页面的情况下替换模块，可以提升开发效率和体验。

## babel 居然这么难配置？

对于 babel 的配置主要是希望可以愉快的使用 ES6 的部分语法（比如箭头函数之类的）。

按照官网教程配置加上自己修改之后：

```js
{
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: {
        loader: 'babel-loader',
        options: {
        presets: ['@babel/preset-env', '@babel/preset-react']
        }
    }
}
```

没错，就是 webpack 中的这一段，原本是配置在`.babelrc`这个文件中的，但是效果差不多，就配置在一起了。

随手在`index.js`里写了一段箭头函数：

```js
handleCilck = () => {
  this.setState({
    a: this.state.a + 1,
  })
}
```

运行一下……

![箭头函数报错][5]

和预期好像哪里不太一样……

好在只有 ES6 部分的语法不能使用，待之后研究研究 babel 的配置方法之后再做修改吧。

## 添加 npm script

大体上的配置已经完成的差不多了，之后在`package.js`中加入命令就搭建完成了：

```json
"scripts": {
	"start": "webpack-dev-server --config ./config/webpack.dev.js",
	"build": "webpack --config ./config/webpack.prod.js"
},
```

通过这两条命令可以快速启动调试和打包。

## 菜的扣脚

弄到这里，这个脚手架算是基本完成了……

实际动手试试就会发现 webpack 其实是非常好用的，通过这个工具可以更方便的做到前端模块化，从而更好得进行项目模块管理。在我的配置中，仅仅只是使用了最简单的基础配置，还有很多高级配置手法还需要更进一步去学习才行。

关于 babel 的配置感觉意外得有难度，可能还是因为我对整套体系不够了解，之后有空就把文档好好读读先。

[1]: https://raw.githubusercontent.com/LuckyRabbitFeet/rabbitfeet.net/master/res/%E9%85%8D%E7%BD%AEReact%E8%84%9A%E6%89%8B%E6%9E%B6/react%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6.png
[2]: https://raw.githubusercontent.com/LuckyRabbitFeet/rabbitfeet.net/master/res/%E9%85%8D%E7%BD%AEReact%E8%84%9A%E6%89%8B%E6%9E%B6/%E5%AF%86%E5%AF%86%E9%BA%BB%E9%BA%BB.png
[3]: https://raw.githubusercontent.com/LuckyRabbitFeet/rabbitfeet.net/master/res/%E9%85%8D%E7%BD%AEReact%E8%84%9A%E6%89%8B%E6%9E%B6/%E6%8B%92%E7%BB%9D.jpg
[4]: https://raw.githubusercontent.com/LuckyRabbitFeet/rabbitfeet.net/master/res/%E9%85%8D%E7%BD%AEReact%E8%84%9A%E6%89%8B%E6%9E%B6/%E7%9B%AE%E5%BD%95%E9%85%8D%E7%BD%AE.png
[5]: https://raw.githubusercontent.com/LuckyRabbitFeet/rabbitfeet.net/master/res/%E9%85%8D%E7%BD%AEReact%E8%84%9A%E6%89%8B%E6%9E%B6/%E7%AE%AD%E5%A4%B4%E5%87%BD%E6%95%B0%E6%8A%A5%E9%94%99.png
