---
title: 关于ESLint和Prettier那点配置的事
date: 2019-12-19 23:54:50
cat: code
tags:
  - eslint
  - prettier
---

## ESLint 篇

关于 ESLint，知道的人应该多少都有点了解，不知道的人……

戳 → https://eslint.org/

> ESLint 是静态代码分析工具，用于识别 JavaScript 代码中发现的有问题的模式。

嘛~就算不想点开他的官网，随手谷歌一下，wiki 也会马上告诉你答案。

### 配置 ESLint

关于安装之类的废话就不多说了，详情可以点击[官方入门][官方入门]看一看，我主要想写一写的是关于`.eslinrc.*`的配置。

虽然 ESLint 内置一套默认规则，通过`eslint --init`命令可以轻松生成配置文件，但每个程序猿多多少少都会有些编码“个性”，所以修改配置做些调整是避免不了的。

对于每个配置项，虽然文档都写得很清楚，但是莫名的就感觉很难懂，所以把每个配置项单独理解下做个记录。

#### parserOptions

解析器选项，可以指定想要支持的 JavaScript 语言选项。

在这个选项中，有以下几个可以配置的选项：

##### ecmaVersion

指定要使用的 ECMAScript 语法的版本，默认值为 5。

##### sourceType

指定来源类型，默认值是`"script"`，但是如果你使用的是 ECMAScript 模块，则可以改成`"module"`。

小声 BB：当设置为`"script"`时使用`import / export`就会提示错误，反之设置为`"module"`时使用`'use strict'`会提示错误。

##### ecmaFeatures

一个对象，代表要使用哪些其他语言功能，他包含了以下几个配置项

- globalReturn ：允许在全局作用域下使用 return 语句
- impliedStrict ：启用全局严格模式（如果 ecmaVersion 大于等于 5）
- jsx ：启用 JSX

#### parser

ESLint 解析器，可以简单理解为引擎，默认值为`Espree`，一般来说没必要去修改他，但是如果你在代码中使用了 ESLint 本身不支持的类型或功能的时候，才要更具需求修改更换其的解析器。

顺便，官网上列出了以下几个常用解析器。

> 以下解析器与 ESLint 兼容：
> Esprima
> Babel-ESLint - Babel 解析器的包装，使其与 ESLint 兼容。
> @ typescript-eslint / parser-一种将 TypeScript 转换为与 ESTree 兼容的形式以便可以在 ESLint 中使用的解析器。

#### env

定义环境。一个环境定义了一组预定义的全局变量。简单讲就是确定要使用哪些环境变量。

具体有哪些环境可以在[文档][文档1]中查看。

一般情况下，可以配置为：

```json
"env": {
  "browser": ture,
  "node": ture,
  "es6": true
}
```

如果不使用 es6 则可以把 es6 删去。顺带一提，如果在这里将 es6 开启，那么这会自动将 ecmaVersion 解析器选项设置为 6。

#### globals

指定全局变量。在这里设置的变量可以在全部的代码中使用，并且 ESLint 不会提示错误。

#### plugins

插件，可以使用插件所提供的功能，使用前需要先通过 npm 安装包，至于插件怎么配置使用，则要在插件的文档中查找。

#### rules

ESLint 提供的具体规则设置项，整个 ESLint 的灵魂所在。

规则列表也可以在[文档][文档2]内找到。

每个规则都可以设置错误级别：

- `"off"`或`0` - 关闭规则
- `"warn"`或`1` - 开启规则，使用警告级别的错误：`warn`(不会导致程序退出)
- `"error"`或`2` - 开启规则，使用错误级别的错误：`error`(当被触发的时候，程序会退出)

#### setting

文档原文是：

> ESLint supports adding shared settings into configuration file. You can add settings object to ESLint configuration file and it will be supplied to every rule that will be executed. This may be useful if you are adding custom rules and want them to have access to the same information and be easily configurable.

根据文档所说，这个配置中的内容将提供给每一个将被执行的规则。感觉好像有点懂，但又不太好理解，去看了看其他人写的规则，也几乎没人用到这个设置，所以完全不知道这个配置项有什么用，如果有人用过的话请指教一下，谢谢。

#### extends

继承规则，懒人福利！

通过这个配置可以继承一些流行的代码风格例如 [Airbnb][airbnb] 或 [Standard][standard] 的规则。而在继承规则后，也可以通过 rules 属性扩展（或覆盖）部分规则。

通过配置这个选项，可以省去大部分的配置内容，仅仅只需找到基本合乎自己习惯的规则后略作修改即可。

**在使用字符串数组继承多个规则的时候，每个配置将会继承它前面的配置。**

## Prettier 篇

官网 → https://prettier.io/

虽然 ESLint 十分强大，但是对于代码风格来说它并不能保证代码 100% 一致，这时候就轮到 Prettier 出场了。

Prettier 是一款专注于格式化代码的工具，它运用自身的规则将你的的代码重新格式化，是个十分方便的工具。

### 配置 Prettier

和 ESLint 一样，Prettier 也可以通过配置文件进行个性化配置，不过 Prettier 的配置可比 ESLint 简单多了，因为 Prettier 需要配置的项目非常少，几乎没有学习成本。

因为配置项相对较少又简单明了，这里就不多 BB 了，看下[文档][文档3]很快就能掌握。

## 在 ESLint 中集成 Prettier

看了网上很多关于在 ESLint 中集成 Prettier 的文章，大家对于这两个工具的组合使用几乎都是“ESLint + Prettier”或者“ESLint 和 Prettier”这样命名，我个人觉得这种说法很有误导性（别问我为啥知道，因为我当初就被误导了），这种说法很容易让人觉得 ESLint 和 Prettier 处于同级别的，其实不然，正确的思路应该是 Prettier 从属于 ESLint，**所有语法报错的情况都应该在 ESLint 中找原因，而不是在 Prettier 中找，因为 Prettier 只是个格式化工具**。

关于这两个工具，我的主要思路是：**完全把代码风格交由 Prettier 来进行管理，ESLint 主要负责管理语法问题而不参与风格管理。**

这样子分开功能既方便管理，也能减少配置复杂程度。

### 我的配置

我个人采用了 standard 的规范来作为基础配置。

#### 安装相关包

```bash
// 安装包
npm install --save-dev eslint prettier

// 安装 standard 相关插件
npm install --save-dev eslint-config-standard eslint-plugin-standard eslint-plugin-promise eslint-plugin-import eslint-plugin-node

// 安装 prettier 相关插件
npm install --save-dev eslint-config-prettier eslint-plugin-prettier
```

#### 最终配置文件

```json
// .eslintrc.json
{
  "env": {
    "browser": true,
    "node": true,
    "es6": true
  },
  "extends": [
    "standard",
    "plugin:prettier/recommended" // 懒人做法，使用prettier推荐配置直接覆盖 standard 的部分规则
  ],
  "plugins": ["prettier"],
  "rules": {
    "space-before-function-paren": "off" // 关闭standard与prettier冲突的规则
  }
}
```

```json
// .prettierrc
{
  "printWidth": 60,
  "endOfLine": "auto",
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5"
}
```

嗯，真是个超精简的配置啊，不过这只是个基础配置，根据日后的需要还可以在这个基础上做更多的细节配置。

## 总结

ESLint 果然还是十分强大的，它可以做的事还要远远超出文中所述，本文只是赘述了其冰山一角而已，之后还有待更深入去学习。

Prettier 作为后来者，在文本格式化上还是蛮有一套的~~虽然对于某些格式有着蜜汁偏见~~，通过编辑器集成插件便可实现保存即格式化，非常的方便好用。

总之，在这篇文章里充满了各种独断与偏见，不过程序猿不就是这样的群体嘛~哈哈（逃

[官方入门]: https://eslint.org/docs/user-guide/getting-started
[文档1]: https://eslint.org/docs/user-guide/configuring#specifying-environments
[文档2]: https://eslint.org/docs/rules
[airbnb]: https://airbnb.io/javascript/
[standard]: https://standardjs.com/
[文档3]: https://prettier.io/docs/en/options.html
