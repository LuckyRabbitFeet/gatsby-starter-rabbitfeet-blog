---
title: npm 安装 Electron 慢的解决方案
date: 2020-03-18 21:36:05
cat: misc
tags:
  - electron
---

今天开始学习 Electron，结果一上来就遇到了大麻烦……

![卡住了](Snipaste_2020-03-18_21-41-10.png)

这个卡着不动的画面大家应该挺眼熟吧，放了 10 分钟居然都没动过，太悲伤了。

不过天无绝人之路，还好[文档][1]给出了解决方案，果然优先看了一眼文档是个正确的选择。

至于为啥会卡的原因咱就不深纠了，毕竟是在国内理由什么的大家都懂，所以不废话直接进正题吧。

## 结论

如果对后面的解析不感兴趣，那直接看这里就可以了。

- 方案一：使用自定义镜像
  windows：

  ```cmd
  set ELECTRON_MIRROR="https://npm.taobao.org/mirrors/electron/"
  set ELECTRON_CUSTOM_DIR="8.1.1"
  ```

  linux：

  ```bash
  export ELECTRON_MIRROR="https://npm.taobao.org/mirrors/electron/"
  export ELECTRON_CUSTOM_DIR="8.1.1"
  ```

- 方案二：使用代理
  windows：

  ```cmd
  set ELECTRON_GET_USE_PROXY=1 # 值为1或true
  set GLOBAL_AGENT_HTTP_PROXY=http://proxy.example.com:1080
  set GLOBAL_AGENT_HTTPS_PROXY=https://proxy.example.com:1080
  ```

  linux：

  ```bash
  export ELECTRON_GET_USE_PROXY=1 # 值为1或true
  export GLOBAL_AGENT_HTTP_PROXY=http://proxy.example.com:1080
  export GLOBAL_AGENT_HTTPS_PROXY=https://proxy.example.com:1080
  ```

## 使用自定义镜像和缓存

### 自定义镜像

根据文档描述，在无法访问 GitHub 或需要提供自定义构建时，可以通过环境变量提供镜像或现有的缓存目录来指定镜像来源。

```
url = ELECTRON_MIRROR + ELECTRON_CUSTOM_DIR + '/' + ELECTRON_CUSTOM_FILENAME
```

在国内，如果你手边正好没有科学上网的手段，那么淘宝镜像就是你最好的选择。

window：

```cmd
set ELECTRON_MIRROR="https://npm.taobao.org/mirrors/electron/"
```

linux：

```bash
export ELECTRON_MIRROR="https://npm.taobao.org/mirrors/electron/"
```

嘛~可惜光设置上面这项还不能解决问题，如果直接下载的话，你将会收到一个 404 报错……

![404](Snipaste_2020-03-18_22-15-05)

这个问题出现是因为 electron 的下载逻辑会在`version`后面多加一个`v`，嘛~毕竟人家默认是从 GitHub 上下载文件，所以这个`v`是为了对应 GitHub 的下载路径。

![下载逻辑](Snipaste_2020-03-18_22-20-21)

解决方法通过对比下载路径不难看出，只要再指定版本号就可以解决问题。

- github
  `ELECTRON_MIRROR`：`https://github.com/electron/electron/releases/download/`
  `ELECTRON_CUSTOM_DIR`：`v8.1.1`
  `ELECTRON_CUSTOM_FILENAME`：`electron-v8.1.1-win32-x64.zip`

- taobao
  `ELECTRON_MIRROR`：`https://npm.taobao.org/mirrors/electron/`
  `ELECTRON_CUSTOM_DIR`：`8.1.1`
  `ELECTRON_CUSTOM_FILENAME`：`electron-v8.1.1-win32-x64.zip`

window：

```cmd
set ELECTRON_CUSTOM_DIR="8.1.1"
```

linux：

```bash
export ELECTRON_CUSTOM_DIR="8.1.1"
```

### 缓存

首次安装 electron 之后，electron 会在本地建立缓存，所以之后的安装都可以使用缓存来进行安装。

不同系统的缓存路径见[文档#缓存][2]部分。

## 使用代理

刚开始觉得这个方案很简单，只要在 bash 里设置下`http_proxy`和`https_proxy`就好了，但是在下载过程中却发现 npm 包虽然都通过代理下载的很快，但唯独 electron 的下载完全没有通过代理，其次[官方文档][3]对于代理也只有一句简短的描述，让人有点无从入手。

研究了半天之后，我终于发现`ELECTRON_GET_USE_PROXY`只是一个开关，~~起初我还以为这个值是用于配置代理地址的~~，只有当其为`ture`的时候才会启用代理，而代理本身则是通过[global-agent][global-agent]来配置的。

[官方文档][3]给出了[global-agent][global-agent]配置文档：

- [Node 10 之后的版本参考这份文档](https://github.com/gajus/global-agent/blob/v2.1.5/README.md#environment-variables)
- [Node 10 之前的版本参考这份文档](https://github.com/np-maintain/global-tunnel/blob/v2.7.1/README.md#auto-config)

so，在了解了之后，配置起来就能抓到感觉了。

windows：

```cmd
set ELECTRON_GET_USE_PROXY=1 # 值为1或true
set GLOBAL_AGENT_HTTP_PROXY=http://proxy.example.com:1080
set GLOBAL_AGENT_HTTPS_PROXY=https://proxy.example.com:1080
```

linux：

```bash
export ELECTRON_GET_USE_PROXY=1 # 值为1或true
export GLOBAL_AGENT_HTTP_PROXY=http://proxy.example.com:1080
export GLOBAL_AGENT_HTTPS_PROXY=https://proxy.example.com:1080
```

配置完之后，下载速度果然有了肉眼可见的提升 👍

## 结论

|    \\    | 淘宝镜像                     | 代理                         |
| :------: | :--------------------------- | :--------------------------- |
| **优点** | 国内网络优化，下载快。       | 原生下载，该从哪下就从哪下。 |
| **缺点** | 需要手动指定 electron 版本。 | 下载速度受代理服务影响。     |

淘宝镜像真的是国内广大程序猿的福音，如果手边没有靠谱合适的代理的话，淘宝镜像就是你的不二之选。

但是，如果你像我一样，对淘宝镜像有着一股莫名的拒绝，那通过代理来进行安装也是个不错的选择。

参考：

- [Electron 文档 - 安装][4]
- [Proxy 環境下で Electron7 系以降を npm install すると ENOTFOUND github.com エラーになるのを解消する](https://qiita.com/geek_duck/items/9da9a87b3661e97b5b94)

[1]: https://www.electronjs.org/docs/tutorial/installation '安装文档'
[2]: https://www.electronjs.org/docs/tutorial/installation#%E7%BC%93%E5%AD%98 '安装文档#缓存'
[3]: https://www.electronjs.org/docs/tutorial/installation#%E4%BB%A3%E7%90%86 '安装文档#代理'
[global-agent]: https://github.com/gajus/global-agent 'global-agent'
[4]: https://www.electronjs.org/docs/tutorial/installation '安装指南'
