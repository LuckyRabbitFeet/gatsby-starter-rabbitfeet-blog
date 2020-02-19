---
title: Shadowsocks Python版一键安装脚本
date: 2019-03-01 21:24:00
cat: repro
tegs:
  - shadowsocks
---

![img][1]

本脚本适用环境：<br>
系统支持：CentOS 6，7，Debian，Ubuntu<br>
内存要求：≥128M<br>
日期：2018 年 02 月 07 日

关于本脚本：<br>
一键安装 Python 版 Shadowsocks 的最新版。<br>
友情提示：如果你有问题，请先参考这篇[《Shadowsocks Troubleshooting》][2]后再问。

默认配置：<br>
服务器端口：自己设定（如不设定，默认从 9000-19999 之间随机生成）<br>
密码：自己设定（如不设定，默认为 teddysun.com）<br>
加密方式：自己设定（如不设定，默认为 aes-256-gcm）<br>
备注：脚本默认创建单用户配置文件，如需配置多用户，安装完毕后参照下面的教程示例手动修改配置文件后重启即可。

Shadowsocks for Windows 客户端下载：<br>
https://github.com/shadowsocks/shadowsocks-windows/releases

使用方法：<br>
使用 root 用户登录，运行以下命令：

```bash
wget --no-check-certificate -O shadowsocks.sh https://raw.githubusercontent.com/teddysun/shadowsocks_install/master/shadowsocks.sh
chmod +x shadowsocks.sh
./shadowsocks.sh 2>&1 | tee shadowsocks.log
```

安装完成后，脚本提示如下：

```bash
Congratulations, Shadowsocks-python server install completed!
Your Server IP        :your_server_ip
Your Server Port      :your_server_port
Your Password         :your_password
Your Encryption Method:your_encryption_method

Welcome to visit:https://teddysun.com/342.html
Enjoy it!
```

卸载方法：<br>
使用 root 用户登录，运行以下命令：

```bash
./shadowsocks.sh uninstall
```

单用户配置文件示例（2015 年 08 月 28 日修正）：<br>
配置文件路径：/etc/shadowsocks.json

```json
{
  "server": "0.0.0.0",
  "local_address": "127.0.0.1",
  "local_port": 1080,
  "port_password": {
    "8989": "password0",
    "9001": "password1",
    "9002": "password2",
    "9003": "password3",
    "9004": "password4"
  },
  "timeout": 300,
  "method": "your_encryption_method",
  "fast_open": false
}
```

使用命令（2015 年 08 月 28 日修正）：<br>
启动：`/etc/init.d/shadowsocks start`<br>
停止：`/etc/init.d/shadowsocks stop`<br>
重启：`/etc/init.d/shadowsocks restart`<br>
状态：`/etc/init.d/shadowsocks status`<br>

文章转载自：[Shadowsocks Python 版一键安装脚本][3]

[1]: https://teddysun.com/wp-content/uploads/2014/shadowsocks.png
[2]: https://teddysun.com/399.html
[3]: https://teddysun.com/342.html
