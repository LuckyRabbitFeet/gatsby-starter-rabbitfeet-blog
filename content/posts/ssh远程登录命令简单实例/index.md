---
title: ssh远程登录命令简单实例
date: 2018-09-26 19:59:00
cat: misc
tags:
  - linux
  - ssh
---

ssh 命令用于远程登录上 Linux 主机。

常用格式：`ssh [-l login_name] [-p port] [user@]hostname`<br>
更详细的可以用 ssh -h 查看。

举例

不指定用户：

```bash
ssh 192.168.0.11
```

指定用户：

```bash
ssh -l root 192.168.0.11
ssh root@192.168.0.11
```

如果修改过 ssh 登录端口的可以：

```bash
ssh -p 12333 192.168.0.11
ssh -l root -p 12333 216.230.230.114
ssh -p 12333 root@216.230.230.114
```

另外修改配置文件/etc/ssh/sshd_config，可以改 ssh 登录端口和禁止 root 登录。改端口可以防止被端口扫描。

编辑配置文件：

```bash
vim /etc/ssh/sshd_config
```

找到#Port 22，去掉注释，修改成一个五位的端口：

```bash
Port 12333
```

找到#PermitRootLogin yes，去掉注释，修改为：

```bash
PermitRootLogin no
```

重启 sshd 服务：

```bash
service sshd restart
```
