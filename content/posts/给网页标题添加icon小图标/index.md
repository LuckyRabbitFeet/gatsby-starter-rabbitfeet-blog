---
title: 给网页标题添加icon小图标
date: 2018-09-30 17:52:00
cat: misc
tags:
  - html
  - 教程
---

自使用 workpress 框架搭建博客以来，已经过了差不多 3 个月了。
最近终于无法忍受 wp 那个庞大的系统所带来的卡卡的使用体验，于是索性换成了相对比较轻量级的 typecho。
但是在搭建过程中，发现网页标题在浏览器中没有图标，后台也没有设置…

![img1][1]

这就很尴尬了，于是决定查一下如何从代码里添加图标。

## 正文

方法一共有两种

### 第一种

在 html 文件的 head 部分添加下面这一行代码。

```html
<link
  rel="shortcut icon"
  href="http://xxx.xxx/usr/themes/default/img/favicon.ico"
  type="image/x-icon"
/>
```

`rel`参数：根据我的理解，这应该是一个标志，固定使用“shortcut icon”字符串，它将被多数遵守标准的浏览器识别为列出可能的关键词(“shortcut”将被忽略,而仅适用“icon”);而 Internet Explorer 将会把它作为一个单独的名称(“shortcut icon”)。这样做的结果是所有浏览器都可以理解此代码。

`href`参数：这个是图片所在的路径。

`type`参数：这个是图片的类型，在今时今日所有浏览器已经能正确识别，所以实际使用中可以省略。

一般来说图标格式最好是.ico 格式的，不过试了一下其实 png，jpg，bmp 的格式都可以。

### 第二种

制作一个 ico 格式的图标，命名为**favicon.ico**。把这个图标放到网站的根目录下就可以了，页面加载时浏览器会自动检索这个图标然后把它加到标题上。

## 最终效果

![img2][2]

参考文章：
[使用 link rel="shortcut icon"为网页标题加图标](https://www.cnblogs.com/GoTing/p/7494307.html)
[apple-touch-icon,shortcut icon 和 icon 的区别](https://www.aliyun.com/jiaocheng/687149.html)

[1]: https://cdn.jsdelivr.net/gh/LuckyRabbitFeet/rabbitfeet.net@master/res/%E7%BB%99%E7%BD%91%E9%A1%B5%E6%A0%87%E9%A2%98%E6%B7%BB%E5%8A%A0icon%E5%B0%8F%E5%9B%BE%E6%A0%87/noico.png
[2]: https://cdn.jsdelivr.net/gh/LuckyRabbitFeet/rabbitfeet.net@master/res/%E7%BB%99%E7%BD%91%E9%A1%B5%E6%A0%87%E9%A2%98%E6%B7%BB%E5%8A%A0icon%E5%B0%8F%E5%9B%BE%E6%A0%87/haveico.png
