---
title: 树莓派：基于docker利用ddns-go配置DDNS实现公网域名访问
layout: post
cover: https://imageurl.kuri.ink/images/posts/ddns/1.png
coverWidth: 1920
coverHeight: 866
categories:
  - 随便写写
tags:
  - IPv6
  - docker
  - DDNS
  - 树莓派
  - ddns-go
  - 内网穿透
  - Cloudflare

date: 2024/7/17 14:17:40
---
本文章以树莓派为例，基于Docker，利用ddns-go实现IPv6网络公网域名访问。

<!--more-->

## 环境

设备：Raspberry Pi 4B（4GB RAM）

系统：Ubuntu 22.04 LTS（arm64）

## 你还需要

- 个人域名

## 安装Docker

打开命令行，键入:

```shell
sudo su
sudo apt update
sudo apt upgrade
sudo apt install docker-ce
```

设置docker开启自启动：

```shell
systemctl enable docker.service
```

## 配置Docker

为了使ddns-go安装过程顺利，故需要提前更换Docker的安装源：

```shell
sudo nano /etc/docker/daemon.json
```

将Docker的安装源更换为下面内容：

```shell
{
    "registry-mirrors": [
        "https://do.nark.eu.org",
        "https://dc.j8.work",
        "https://docker.m.daocloud.io",
        "https://dockerproxy.com",
        "https://docker.mirrors.ustc.edu.cn",
        "https://docker.nju.edu.cn"
    ]
}
```

输入下方命令重启服务：

```shell
systemctl daemon-reload
systemctl restart docker
```

键入下方命令检查是否更换成功：

```
docker info
```

!!! ERROR
    若终端报错，可重启终端重试。

若返回内容中包括以下内容，则证明更换成功。

```
 Registry Mirrors:
  https://do.nark.eu.org/
  https://dc.j8.work/
  https://docker.m.daocloud.io/
  https://dockerproxy.com/
  https://docker.mirrors.ustc.edu.cn/
  https://docker.nju.edu.cn/
```

## 安装及配置ddns-go

在任意路径下新建文件夹：

```shell
mkdir ddns-go
```

在文件夹内创建 ``docker-compose.yml``文件。

```plaintext
cd ddns-go
touch docker-compose.yml
nano docker-compose.yml
```

```yaml
services:
  ddns-go:
    image: jeessy/ddns-go
    restart: always
    network_mode: "host"
    volumes:
      - ./ddns-go_data:/root
```

运行以下命令，安装ddns-go：

```shell
sudo docker compose up -d
```

安装成功后，在浏览器地址栏输入：`http://[树莓派ip地址]:9876`进入后台配置。

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
