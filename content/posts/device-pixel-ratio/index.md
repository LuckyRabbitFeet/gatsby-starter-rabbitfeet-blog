---
title: 设备像素比
date: 2018-11-09 18:48:00
cat: essay
tags:
  - 笔记
  - 前端
---

最近在搞移动端适配，突然发觉自己对设备尺寸、物理像素和css像素之类的东西没什么概念，导致完全想象不出同样的东西在不同设备上会有什么样的显示差异。

难受，逐查之……

查了些资料，和[这篇文章][1]一样，我也收获了一大堆名词hhh

> 最近查了好多关于移动端适配的资料，把人都看懵了，收获了一堆名词：
> > CSS像素、物理分辨率、逻辑分辨率、设备像素比、PPI、DPI、DPR、DIP、Viewport

其实废话那么多，和我们做开发的根本没多大关系，咱们只需要知道三个概念就完了。

1. 物理分辨率，就是设备实际上的分辨率。
2. 逻辑分辨率，开发时会用到的分辨率，这是个相对值。
3. 设备像素比，物理分辨率和逻辑分辨率之间的比值。

## 物理分辨率

这东西非常好理解，物理像素数量，设备制造商说多少就是多少。

一般开发时用到的像素单位都是物理像素。

## 设备像素比

看着很简单，其实是个不太好理解的东西，简单讲的话就是指一个逻辑像素需要多少个物理像素来显示。
在计算上一般来说会选择一行的像素数量来做计算。

```text
设备像素比 = 物理分辨率 / 逻辑分辨率

// 这样思考或许是比较好
逻辑分辨率 = 物理分辨率 / 设备像素比
```

🌰例如 iphone 6，它的物理分辨率是`750 x 1334`，逻辑分辨率是`375 x 667`，设备像素比是 2（`750 / 375`）。

在 JavaScript 中，可以通过`window.devicePixelRatio`来获取设备像素比。

## 逻辑分辨率

逻辑像素数量，这玩意是个相对值，这东西也是设备制造商提供的。

✨注意：开发时用到的像素单位和这东西完全没有关联，你得自己把开发像素（例如 css 的 px）和逻辑像素对应起来才行，也就是说得通过设备像素比算出来。

🌰例如 iphone 6，如果直接把`width: 750px`怼上去，你只会得到一个超出手机显示范围的盒子，但你如果用`width: 375px`就会刚刚好一屏宽。

在 PC 端一般情况下逻辑分辨率和物理分辨率是一致的，所以在相同尺寸的屏幕下，高分屏屏所显示的内容会变得更小。

不过还有2种特殊情况。

第一种：
“更改文本、应用等项目的大小”
他是通过调整逻辑分辨率来缩放显示的。
![change szie](https://cdn.jsdelivr.net/gh/LuckyRabbitFeet/rabbitfeet.net@master/res/device-pixel-ratio/change%20size.png)

第二种：
“显示分辨率”
他从系统层面修改了显示分辨率，所以他虽然也是逻辑分辨率，但是可以直接当物理分辨率使用。
![change szie](https://cdn.jsdelivr.net/gh/LuckyRabbitFeet/rabbitfeet.net@master/res/device-pixel-ratio/change%20show%20size.png)

## HTML

在 html 里常常会用到这个元数据。

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

在这个元数据中，`width=device-width`的意思是让浏览器窗口的宽度和设备逻辑像素的宽度一致。
讲人话就是让 CSS 和逻辑像素对应起来，让 1px 需要用到的物理像素数量和逻辑像素一样。

这东西在 PC 端上是没什么用，他的主要作用还是在手机端这种设备像素比大于1的地方，可以让你省去自己手动转换开发像素和逻辑像素的过程。

## 参考

- [移动端开发一些常见问题的解决方案][1]
- [标准元数据名称][2]
- [Window.devicePixelRatio][3]


[1]: (https://juejin.cn/post/6897937643372937224)
[2]: (https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/meta/name)
[3]: (https://developer.mozilla.org/zh-CN/docs/Web/API/Window/devicePixelRatio)