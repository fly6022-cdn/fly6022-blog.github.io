---
title: 树莓派：利用ddns-go配置DDNS实现IPv6公网域名访问
layout: post
cover: https://imageurl.kuri.ink/images/posts/ddns/1.png
coverWidth: 1920
coverHeight: 866
categories:
  - 随便写写
tags:
  - IPv6
  - DDNS
  - 树莓派
  - ddns-go
  - 内网穿透
  - Cloudflare

date: 2025/8/29 19:19:36
---

本文章以树莓派为例，利用ddns-go配置DDNS实现IPv6公网域名访问。

<!--more-->

## 环境

设备：Raspberry Pi 4B（4GB RAM）

系统：Ubuntu 24.04.3 LTS（arm64）

## 你还需要

- 个人域名

## 安装Go环境

打开命令行，键入:

```shell
sudo su
sudo add-apt-repository ppa:longsleep/golang-backports
apt update
apt-get install golang-go
```

```
go version
```

若返回信息为以下内容，则安装成功：

```
go version go 1.24.6 linux/arm64
```

到`/etc/apt/sources.list.d`修改go的list文件：

`url`参数更改为`https://launchpad.proxy.ustclug.org/longsleep/golang-backports/ubuntu`

配置GOPROXY代理：

```
go env -w GO111MODULE=on
go env -w GOPROXY=https://goproxy.cn,direct
```

## 拷贝ddns-go源码

```
git clone https://github.com/jeessy2/ddns-go.git
```

## 编译ddns-go源码

```
cd ddns-go
go build
```

## 配置ddns-go

```
./ddns-go
```

在浏览器输入`localhost:9876`，进入后台。

!!! WARNING

    ddns-go初始配置需要在5分钟之内完成，否则配置不能保存。

配置时，需要DNS平台的token，这里以Cloudflare为例进行配置。

在浏览器地址栏键入 ``https://dash.cloudflare.com/profile/api-tokens``.

![img](https://imageurl.kuri.ink/images/posts/ddns/2.png)

点击"创建令牌"→“编辑区域DNS（使用模板）”

![img](https://imageurl.kuri.ink/images/posts/ddns/3.png)

配置后点击"继续以显示摘要"→创建令牌。

将生成的令牌粘贴到ddns-go后台中。

![img](https://imageurl.kuri.ink/images/posts/ddns/4.png)

在IPv6的“Domains”一栏中添加好自己的域名，保存即可。

等待5分钟左右，即可通过域名从公网访问内容。

## 设置ddns-go开机自启动

### 自带命令设置

```
./ddns-go -s install
```

### 手动设置

新建服务文件：

```
nano /etc/systemd/system/ddns-go.service
```

向文件写入以下内容：

```
[Unit]
Description=Simple and easy to use DDNS. Automatically update domain name resolution to public IP.
ConditionFileIsExecutable={ddns-go路径}

Requires=network.target
After=network-online.target

[Service]
StartLimitInterval=5
StartLimitBurst=10
ExecStart={ddns-go路径} "-l" ":9876" "-f" "300" "-cacheTimes" "5" "-c" "/root/.ddns_go_co>

Restart=always

RestartSec=120
EnvironmentFile=-/etc/sysconfig/ddns-go

[Install]
WantedBy=multi-user.target
```

保存并关闭。

```
# 重载
systemctl daemon-reload
# 启动
systemctl start ddns-go.service
# 开机启动
systemctl enable ddns-go.service
```