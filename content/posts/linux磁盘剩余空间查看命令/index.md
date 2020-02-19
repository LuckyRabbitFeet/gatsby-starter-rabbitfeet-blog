---
title: Linux磁盘空间查看命令剩余空间查看
date: 2018-09-26 20:03:00
cat: misc
tags:
  - linux
  - 笔记
---

## １、查看硬盘的使用情况

`df -h`

```bash
文件系统        容量  已用  可用 已用% 挂载点
udev            3.9G  4.0K  3.9G    1% /dev
tmpfs           790M  1.5M  788M    1% /run
/dev/sda7        98G   24G   70G   26% /
none            4.0K     0  4.0K    0% /sys/fs/cgroup
none            5.0M     0  5.0M    0% /run/lock
none            3.9G  156K  3.9G    1% /run/shm
none            100M   52K  100M    1% /run/user
```

`df -m`

```bash
文件系统        1M-块  已用  可用 已用% 挂载点
udev             3936     1  3936    1% /dev
tmpfs             790     2   788    1% /run
/dev/sda7      100174 24181 70882   26% /
none                1     0     1    0% /sys/fs/cgroup
none                5     0     5    0% /run/lock
none             3947     1  3947    1% /run/shm
none              100     1   100    1% /run/user
```

-h 单元为根据大小适当显示，-m 单位为 M

---

## 2、查看制定目录的文件大小

查看当前目录的总大小

`sudo du -sh`
查看指定目录的大小

`sudo du -h FCN`
FCN 是个目录

查看指定目录的文件

`sudo du -h FCN/xxx.xxx`

查看 `xxx.xxx` 文件
