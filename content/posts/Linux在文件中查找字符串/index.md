---
title: Linux在文件中查找字符串
date: 2018-09-26 20:03:00
cat: misc
tags:
  - linux
  - 笔记
---

如果你想在当前目录下 查找"hello,world!"字符串,可以这样:

```bash
grep -rn "hello,world!" *
```

\* 表示当前目录所有文件，也可以是某个文件名

-r 是递归查找

-n 是显示行号

-R 查找所有文件包含子目录

-i 忽略大小写

下面是一些有意思的命令行参数：

```bash
grep -i pattern files ：不区分大小写地搜索。默认情况区分大小写，

grep -l pattern files ：只列出匹配的文件名，

grep -L pattern files ：列出不匹配的文件名，

grep -w pattern files ：只匹配整个单词，而不是字符串的一部分（如匹配‘magic’，而不是‘magical’），

grep -C number pattern files ：匹配的上下文分别显示[number]行，

grep pattern1 | pattern2 files ：显示匹配 pattern1 或 pattern2 的行，

grep pattern1 files | grep pattern2 ：显示既匹配 pattern1 又匹配 pattern2 的行。
```

这里还有些用于搜索的特殊符号：

\\< 和 \\> 分别标注单词的开始与结尾。

例如：

`grep man *` 会匹配 ‘Batman’、‘manic’、‘man’等，

`grep '\\<man' *` 匹配‘manic’和‘man’，但不是‘Batman’，

`grep '\\<man\\>'` 只匹配‘man’，而不是‘Batman’或‘manic’等其他的字符串。

'^'：指匹配的字符串在行首，

'\$'：指匹配的字符串在行尾，

2，xargs 配合 grep 查找

find -type f -name '\*.php'|xargs grep 'GroupRecord'
