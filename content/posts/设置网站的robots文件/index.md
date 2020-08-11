---
title: 设置网站的robots文件
date: 2018-10-09 21:02:00
cat: misc
tags:
  - rebots
---

> 搜索引擎通过一种程序“蜘蛛”（又称 spider），自动访问互联网上的网页并获取网页信息。您可以在您的网站中创建一个纯文本文件 robots.txt，在这个文件中声明该网站中不想被蜘蛛访问的部分，这样，该网站的部分或全部内容就可以不被搜索引擎访问和收录了，或者可以通过 robots.txt 指定使搜索引擎只收录指定的内容。搜索引擎爬行网站第一个访问的文件就是 robots.txt。
> 引自百度百科——[robot.txt][1]

# 作用

那么这个文件有什么用呢，他的用处其实并不体现在网站的实际建设中，而是 SEO 中的一环。

所谓的 SEO 就是指[搜索引擎优化][2]。对于用户来说，这个文件可以避免蜘蛛爬取收录不必要的页面，所以还是有些用处的。

# 生成方式

虽然可以直接手写文件，不过也有比较方便的工具可以更简便的生成这个文件。

通过站长工具的[robots 文件生成][3]工具就可以简单快速生成文件。

![img][4]

参考文章
[Typecho 的 robots 文件][5]

[1]: https://baike.baidu.com/item/robot.txt/3936191?fr=aladdin
[2]: https://baike.baidu.com/item/%E6%90%9C%E7%B4%A2%E5%BC%95%E6%93%8E%E4%BC%98%E5%8C%96/3132
[3]: http://tool.chinaz.com/robots/
[4]: https://cdn.jsdelivr.net/gh/LuckyRabbitFeet/rabbitfeet.net@master/res/%E8%AE%BE%E7%BD%AE%E7%BD%91%E7%AB%99%E7%9A%84robots%E6%96%87%E4%BB%B6/img.png
[5]: https://www.9imc.cn/archives/14/
