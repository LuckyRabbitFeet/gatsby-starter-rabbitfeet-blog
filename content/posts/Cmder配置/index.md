---
title: Cmder配置
date: 2018-09-26 19:58:00
cat: misc
tags:
  - 工具
  - cmder
---

最近终于看腻了 Windows 自带的 cmd 那个黑洞洞的界面，使用起来也是非常的不方便：代码、关键字不能变色；有行数限制不能，无法回滚去找之前执行过的命令和输出等等。<br>
虽然巨硬新推出了 powershell 这个工具，但是在此之前，我发现了一个更好用的工具——Cmder。<br>
官网地址：[http://cmder.net/](http://cmder.net/)<br>
Cmder 是一款 Windows 环境下非常简洁美观易用的 cmd 替代者，它是一个跨平台的命令行增强工具，可以集成 windows batch, power shell, git, linux bash 等多种命令行于一体，支持了大部分的 Linux 命令。十分方便。还可以通过自定义，让它更方便。<br>
Cmder 不仅完善了 cmd 的不足之处，还增加了不少功能：<br>

> 1. 把 conemu，msysgit 和 clink 打包在一起，让你无需配置就能使用一个真正干净的 Linux 终端！甚至还附带了漂亮的 monokai 配色主题。
> 2. 选中右击直接可以实现复制功能
> 3. 主控台文字自动放大缩小功能，按下 Ctrl+滑鼠滚轮就可以办到
> 4. 可在视窗内搜寻画面上出现过的任意关键字。
> 5. 新增页签按钮。
> 6. 切换页签按钮。
> 7. 锁定视窗，让视窗无法再输入。
> 8. 切换视窗是否提供卷轴功能，启动时可查询之前显示过的内容。
> 9. 按下滑鼠左键可开启系统选单，滑鼠右键可开启工具选项视窗。
> 10. Cmder 增加了 alias 功能。
>     他让你用短短的指令执行一些常见但指令超长又难以记忆的语法;在其控制台输入 alias 可以查看。
> 11. 自定义 aliases。
>     打开 Cmder 目录下的 config 文件夹，里面的 aliases 文件就是我们可以配置的别名文件，只需将里面 ls 命令的别名按下列方式修改就可以在 ls 命令下显示中文。

![cmder.png][1]

## cmder 的一些基础配置

### 注册到右键菜单

以管理员身份运行 cmder，执行下面的命令即可。

```
Cmder.exe /REGISTER ALL
```

### 解决中文乱码问题

> `win+alt+p`打开设置面板，找到`Startup -> Envrioment`选项
> 在下面的文本框里添加两行设置

```bash
set LANG=zh_CN.UTF-8
set LC_ALL=zh_CN.utf8
```

> 然后重启 cmder
> 然后用 ls 命令查看目录下的文件，带中文的文件名都能正常显示了。

### 语言设置

针对于 v1.3.6 版本的语言设置，设置为中文后，重启 cmder 将会重置为英文。

可以在`.\vendor\conemu-maximus5\ConEmu.xml`直接把 `<value name="Language" type="string" data="en"/>` 中的`en`改为`zh`，然后重启 cmder 就会发现语言已经被改变。

### 修改命令提示符号

cmder 默认的命令提示符是 λ ，如果想改成常见的 \$ ,具体操作如下：

> bash 的情况下
>
> 把`.\vendor\clink.lua`文件中`local lambda = "λ"`改为`local lambda = "$"`，然后在`.\vendor\git-for-windows\etc\profile.d\git-prompt.sh`文件中，把`PS1="$PS1"'λ ' ## prompt: always λ`改为`PS1="$PS1"'$ ' ## prompt: always λ`，然后重启 cmder 即可 。
> PowerShell 的情况下
>
> 把`.\vendor\profile.ps1`文件中 **Microsoft.PowerShell.Utility\Write-Host "`nλ " -NoNewLine -ForegroundColor "DarkGray"** 改为 **Microsoft.PowerShell.Utility\Write-Host "`n\$ " -NoNewLine -ForegroundColor "DarkGray"** ，然后重启 cmder 即可。

### 设置默认打开目录

`win+alt+p`打开设置面板，找到`Startup -> Tasks`选项,在右侧选中`{cmd::Cmder}` 把
**cmd /k "%ConEmuDir%..init.bat"** 修改成 **cmd /k "%ConEmuDir%..init.bat" -new_console:d:E:\www** 即可。
`E:\www`就是我们指定的默认打开目录

### 自定义 aliases

cmder 还增加了 alias 功能，它让你用短短的指令执行一些常见但指令超长又难以记忆的语法;比如 ls cls 等等<br>
打开 cmder 安装目录下的**\config\user-aliases.cmd**文件<br>
下面是我自己定义的常用的

```bash
st="D:\Sublime Text 3\sublime_text.exe" //输入st打开Sublime Text 3编辑器
w=cd /d E:/www  //输入w跳转到E盘下的www目录
..=cd ..  //输入..返回上一级文件夹
wp=.\node_modules\.bin\webpack $* //如果webpack不是全局安装而是安装在项目下webpack命令不能直接用，
                                  //需要.\node_modules\.bin\webpack调用，每次都这样写太麻烦。
                                  //现在只要输入wp就可以用webpack命令
```

你还可以根据自己的需求配置各种 alias

### 常用功能介绍

![clipboard.png][2]

如上图示编号的部分说明如下：

1. Cmder 常用快捷键

| 快捷键      | 含义                                 |
| ----------- | ------------------------------------ |
| Tab         | 自动路径补全                         |
| Ctrl+T      | 建立新页签                           |
| Ctrl+W      | 关闭页签                             |
| Ctrl+Tab    | 切换页签                             |
| Alt+F4      | 关闭所有页签                         |
| Alt+Shift+1 | 开启 cmd.exe                         |
| Alt+Shift+2 | 开启 powershell.exe                  |
| Alt+Shift+3 | 开启 powershell.exe (系统管理员权限) |
| Ctrl+1      | 快速切换到第 1 个页签                |
| Ctrl+n      | 快速切换到第 n 个页签( n 值无上限)   |
| Alt + enter | 切换到全屏状态                       |
| Ctr+r       | 历史命令搜索                         |
| Win+Alt+P   | 开启工具选项视窗                     |

2. 可在视窗内搜寻画面上出现过的任意关键字。
3. 新增页签按钮。
4. 切换页签按钮。
5. 锁定视窗，让视窗无法再输入。
6. 切换视窗是否提供卷轴功能，启动时可查询之前显示过的内容。
7. 按下滑鼠左键可开启系统选单，滑鼠右键可开启工具选项视窗。 Win+Alt+P ：开启工具选项视窗。

参考资料<br>
[Cmder 利器](https://blog.csdn.net/u012111465/article/details/78524159)<br>
[Windows 命令行工具 cmder 配置](https://segmentfault.com/a/1190000011361877)<br>
[cmder 使用简介](https://segmentfault.com/a/1190000008501694)

[1]: https://raw.githubusercontent.com/LuckyRabbitFeet/rabbitfeet.net/master/res/Cmder%E9%85%8D%E7%BD%AE/cmder.png
[2]: https://raw.githubusercontent.com/LuckyRabbitFeet/rabbitfeet.net/master/res/Cmder%E9%85%8D%E7%BD%AE/articlex.png
