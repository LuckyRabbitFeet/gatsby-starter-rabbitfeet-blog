---
title: 站点地图sitemap设置
date: 2018-10-09 17:49:00
cat: misc
tags:
  - sitemap
  - 教程
---

## 前言

> Sitemap 可方便网站管理员通知搜索引擎他们网站上有哪些可供抓取的网页。最简单的 Sitemap 形式，就是 XML 文件，在其中列出网站中的网址以及关于每个网址的其他元数据（上次更新的时间、更改的频率以及相对于网站上其他网址的重要程度为何等），以便搜索引擎可以更加智能地抓取网站。
> 引自百度百科——[sitemap][1]

## 由来

因为 Google 首先于 2005 年提出 sitemap 技术，sitemap 文件采用 xml 格式，后来 YAHOO，Live，AOL，ASK 都采纳了 Google 提出的 sitemap 技术，成为事实上的技术标准，所以，人们也习惯说 Google Sitemap，或者 Google XML Sitemap。

不过百度似乎对谷歌的地位有所不满，也有一套自己的标准~~(辣鸡百度扰乱业界)~~——百度 Sitemap 是指百度支持的收录标准，在原有协议上做出了扩展。百度 sitemap 的作用是通过 Sitemap 告诉百度蜘蛛全面的站点链接，优化自己的网站。百度 Sitemap 分为三种格式：txt 文本格式、xml 格式、Sitemap 索引格式。

## 作用

对于一个网站来说，向搜索引擎提供一份完整的 sitemap 是很重要的事情，可以有效的加快网站页面的收录。

网络抓取工具通常会通过网站内部和其他网站上的链接查找网页。Sitemap 会提供此数据以便允许支持 Sitemap 的抓取工具抓取 Sitemap 提供的所有网址，并了解使用相关元数据的网址。使用 Sitemap 协议并不能保证网页会包含在搜索引擎中，但可向网络抓取工具提供一些提示以便它们更有效地抓取网站。

## 生成方式

sitemap 生成方式有很多种，可以自己直接编写 xml 文件，通过在线工具直接生成，或者通过客户端软件来完成。

相对于客户端来说，在线工具轻量、免安装的优势尤为明显，通过在线工具生成后直接上传服务器也很方便。

在线工具的话可以使用[XML-Sitemaps][2]来生成站点地图的，500 个链接内免费使用，我个人感觉还是挺不错的。

本地工具的话，有个叫做[Sitemap X][3]的免费工具似乎可以用用看，这个工具除了基础的功能之外还可以设置计划任务，自动抓爬、上传等。由于时间上的限制~~懒~~就先不做这个工具的测试了，如果有朋友使用的这款软件的话，请务必在下面留言说说看使用体验。

当然，本博客是采用的[sitemap 插件][4]生成的站点地图。

参考文章<br>
[如何设置 Google Sitemap 格式中的优先级和更新频率][5]

[1]: https://baike.baidu.com/item/sitemap/6241567?fr=aladdin
[2]: https://www.xml-sitemaps.com/
[3]: http://cn.sitemapx.com/
[4]: https://plugins.typecho.me/plugins/sitemap-xml.html
[5]: http://www.maixj.net/wlyx/sitemap-youxianji-gengxinpinlv-9308
