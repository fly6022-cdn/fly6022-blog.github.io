---
title: Spyder：[WinError 126] 找不到指定的模块 错误的解决
layout: post
cover: https://imageurl.kuri.ink/images/posts/spyder126/banner.png
coverWidth: 1919
coverHeight: 1021
categories:
  - 编程开发
tags:
  - Spyder
  - Python

date: 2023/8/20 21:56:53
---
Spyder [WinError 126] 找不到指定的模块 错误的解决.

<!--more-->

## 问题分析

考虑为Python解释器路径有误，导致Spyder无法正确连接到Ipython内核。

## 解决办法

### 寻找系统Python解释器路径

在CMD中键入：

```
where python
```

返回值即为 Python 解释器路径，将该路径复制到剪切板。

### 配置自定义解释器

Spyder中依次找到：工具 --> 偏好 --> Python 解释器 --> 使用下列 Python 解释器

![01](https://cdn.jsdelivr.net/gh/imageurl/fly6022@masterhttps://imageurl.kuri.ink/images/posts/spyder126/01.png)

将 Python 解释器路径 粘贴过来。

重启 Spyder

### 安装依赖

CMD中输入：

```
pip install spyder-kernels==2.0.*
```

重启 Spyder，即可解决问题。
