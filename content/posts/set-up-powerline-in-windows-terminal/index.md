---
title: 在 Windows Terminal 里配置 Powershell
date: 2019-03-01 21:24:00
cat: misc
tags:
  - windows
  - terminal
  - powershell
---

各位 Windows 开发者，是不是很羡慕他们 Linux 和 mac 用户的 terminal 在配置过 oh-my-zsh 之后变得非常漂亮？现在不用羡慕了，因为你的 Powershell 也可以变得非常漂亮
（<ゝω・）~☆

[这里是巨硬教程][1]，教你如何配置 Powershell，当然你也可以看我下面的总结。

## 简单快速的开启新世界吧

首先得为 Powershell 安装必要的插件，安装这些插件需要管理员权限，所以别忘了以管理员身份启动 Powershell。

```powershell
# 为当前用户安装 posh-git
Install-Module posh-git -Scope CurrentUser
# 为当前用户安装 oh-my-posh
Install-Module oh-my-posh -Scope CurrentUser
```

然后打开PowerShell配置文件，这个文件你可以通过`notepad $PROFILE`命令打开编辑，当然`notepad`也可以换成你自己常用的文本编辑器。

在配置文件中把这些内容添加到末尾：

```powershell
Import-Module posh-git # 引入 posh-git
Import-Module oh-my-posh # 引入 oh-my-posh
Set-PoshPrompt -Theme Paradox # 设置主题为 Paradox

Set-PSReadLineOption -PredictionSource History # 设置预测文本来源为历史记录
 
Set-PSReadlineKeyHandler -Chord Tab -Function Complete # 设置 Tab 键补全
Set-PSReadLineKeyHandler -Chord Ctrl+d -Function MenuComplete # 设置 Ctrl+d 为菜单补全和 Intellisense
Set-PSReadLineKeyHandler -Chord Ctrl+z -Function Undo # 设置 Ctrl+z 为撤销
Set-PSReadLineKeyHandler -Chord Ctrl+u -Function RevertLine # 设置 Ctrl+u 为重置行
Set-PSReadLineKeyHandler -Chord UpArrow -Function HistorySearchBackward # 设置向上键为后向搜索历史记录
Set-PSReadLineKeyHandler -Chord DownArrow -Function HistorySearchForward # 设置向下键为前向搜索历史纪录
```

其中快捷键的设置可以根据自己需要随意配置，具体文档看这 [PSReadLine][2]

## 安装字体

oh-my-posh 和 oh-my-zsh 一样，需要一套带各种图标的等宽字体才能正常的显示，所以我们现在该去安装字体了。

对于字体，你可以有以下几种选择方案：

- 直接按教程来，使用`Cascadia Code PL`字体，字体可以在[这里][3]下载
- 或者在 [Nerd Fonts][4] 这个网站中下载字体，这个网站的字体几乎都是为了开发定制的

安装好之后右键 Powershell 的菜单栏，打开`属性 -> 字体`，把字体设置为上面安装的字体之后就可以了。

## 安装 Windows Terminal

巨硬新款终端，帅气又漂亮，安装也非常简单，打开 [Microsoft Store][5] 直接搜索 Windows Terminal 然后安装就行了，至于 Windows Terminal 本身的配置的话，截至本文发布时间，已经可以支持界面化设置，不用再直接修改配置文件了，所以对于设置就不过多赘述了。

[1]: (https://docs.microsoft.com/en-us/windows/terminal/tutorials/powerline-setup)	"Tutorial: Set up Powerline in Windows Terminal"
[2]: (https://docs.microsoft.com/en-us/powershell/module/psreadline/?view=powershell-7.1) "PSReadLine"
[3]: (https://github.com/microsoft/cascadia-code/releases) "cascadia-code"
[4]: (https://www.nerdfonts.com/) "nerdfonts"
[5]: (https://www.microsoft.com/zh-cn/p/windows-terminal/9n0dx20hk701?activetab=pivot:overviewtab) "
Windows Terminal"