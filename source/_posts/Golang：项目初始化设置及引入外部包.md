---
title: Golang：项目初始化设置及引入外部包
layout: post
cover: /background/113.jpg
coverWidth: 2211
coverHeight: 1050
categories:
  - 编程开发
tags:
  - Golang

date: 2022/8/19 9:26:37
---
Golang 项目初始化设置及引入外部包

<!--more-->

## 项目初始化设置

在项目的根目录，输入：

```bash
go init tidy
```

之后，根目录会自动生成一个 ``go.mod``文件。

## 引入外部包

Golang 更新至 1.13 版本之后，支持了 ``go module``功能。在引入外部包时，应先对配置文件进行修改：

```bash
go env -w GO111MODULE=on
```

同时，可引入代理服务器，以方便后续的开发工作：

```bash
go env -w GOPROXY=https://goproxy.cn,direct
```

在引入外部包时，现在程序（.go文件）中的头部添加：

```go
import (
	"github.com/xxx/xxx"
)
```

之后在终端键入：

```bash
go get github.com/xxx/xxx
```

由此，我们已经完成了外部包的引入。
