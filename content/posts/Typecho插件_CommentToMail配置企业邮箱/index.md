---
title: Typecho插件CommentToMail配置企业邮箱
date: 2018-10-15 16:06:00
cat: misc
tags:
  - typecho
---

最近总算是把新的博客给搭好了，修改博客样式、迁移文章花了不少时间和精力，所以文章的标签和板式还没来得及整理。<br>
前几天终于有空整理一下后台，突然发现有了一条评论，作为建站以来的第一条评论，我居然没有第一时间发现它，实在惭愧。<br>
综合以上因素，便决定找找看有没有评论邮件通知的插件。

## CommentToMail

这款插件有很多个版本，具体第一版我也不知道是谁做的，好多地方的下载链接也都已经过期（包括 typecho 官网的链接，死活下载不下来）。最终在 [【更新】CommentToMail typecho2017&v4.1& Mailer 三版本，支持 php5.6/7，插件详解][1] 这篇博文中找了了一个还活着的下载链接和配置教程。

### 企业邮箱的配置方法

利用 QQ 邮箱或者其他常见邮箱的配置方法网上已经很多了，本文便不再赘述，具体也可以看上面介绍的博文。

这次主要要说的是使用企业邮箱的配置方法……为什么要用企业邮箱呢，其实我的理由也颇为无聊，因为我的常用的 QQ 邮箱并没有实名制，而要使用**QQ 邮箱授权码**的话必须要进行实名认证，所以就选用了默认开启 SMPT 的企业邮箱。

废话不多说，具体的配置方法见下图

![CommentToMail企业邮箱配置.png][2]

由于我用的是腾讯企业邮箱，所以 SMTP 地址使用的是**smtp.exmail.qq.com**，如果是其他的企业邮箱，则要替换成对应的地址。<br>
顺便，关于接收邮件地址，这个地方其实可以设置成自己常用的用邮箱地址，因为邮件是通过 SMTP 用户这个地方填的邮箱发出的。

## 总结

这个插件还是挺不错的，虽然很多人评价无法使用，但根据的我使用体验来说，一般还是因为 SMPT 没有正确配置的原因。<br>
在配置好插件的现在，就不会再错过任何一条评论了，哈哈~

参考文章<br>
[Typecho 插件 CommentToMail 配置流程详解][3]

[1]: https://9sb.org/58
[2]: https://raw.githubusercontent.com/LuckyRabbitFeet/rabbitfeet.net/master/res/Typecho%E6%8F%92%E4%BB%B6CommentToMail%E9%85%8D%E7%BD%AE%E4%BC%81%E4%B8%9A%E9%82%AE%E7%AE%B1/CommentToMail%E4%BC%81%E4%B8%9A%E9%82%AE%E7%AE%B1%E9%85%8D%E7%BD%AE.png
[3]: https://www.zuozuovera.cn/archives/1196/
