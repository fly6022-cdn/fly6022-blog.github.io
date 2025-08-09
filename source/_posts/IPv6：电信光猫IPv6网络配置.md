---
title: IPv6：电信光猫IPv6网络配置
layout: post
cover: https://imageurl.kuri.ink/images/posts/ipv6_dx/0.png
coverWidth: 1920
coverHeight: 1017
categories:
  - 随便写写
tags:
  - IPv6
  - 中国电信
  - 网络

date: 2024/7/16 20:19:00
---
本文章以 `天翼网关 4.0`（设备型号：`ZXHN F610GV9`）为例，实际演示电信光猫IPv6网络的配置。

<!--more-->

## 配置方法

打开浏览器，在地址栏键入光猫的局域网IP地址（我的是 `192.168.1.1`），进入光猫后台。

![img](https://imageurl.kuri.ink/images/posts/ipv6_dx/0.png)

输入管理员用户名及密码，用户名：`telecomadmin`，密码：`nE7jA%5m`。

点击导航栏中的“网络”→“网络设置”，选择连接名称及IP模式。

![img](https://imageurl.kuri.ink/images/posts/ipv6_dx/1.png)

![img](https://imageurl.kuri.ink/images/posts/ipv6_dx/6.png)

![img](https://imageurl.kuri.ink/images/posts/ipv6_dx/7.png)

![img](https://imageurl.kuri.ink/images/posts/ipv6_dx/8.png)

将“IPv6”信息修改为下图所示并**保存**：

![img](https://imageurl.kuri.ink/images/posts/ipv6_dx/9.png)

> 地址获取方式：AutoConfigured
> 获取前缀：是
> 前缀获取方式：PrefixDelegration
> DNS获取方式：DHCPv6

回退到“用户侧管理”，点击“IPv6设置”，将本页设置修改为下图所示并保存。

![img](https://imageurl.kuri.ink/images/posts/ipv6_dx/2.png)

![img](https://imageurl.kuri.ink/images/posts/ipv6_dx/4.png)

![img](https://imageurl.kuri.ink/images/posts/ipv6_dx/5.png)

打开路由器后台，在IPv6相关设置下更改为“桥模式”。

重启光猫及路由器。

打开网页[IPW.cn](https://ipw.cn/)，检查IPv6连接情况。

若为下图所示，证明配置成功

![img](https://imageurl.kuri.ink/images/posts/ipv6_dx/10.png)

## IPv6有什么好处

### 免去内网穿透的烦恼

每一个IPv6地址都是一个公网IP地址。这使得游戏联机、远程连接等更加便捷。

### 实现真正意义上的P2P

每一个IPv6地址对应一个设备，为点对点传输创造了条件。

### 取之不尽用之不竭

IPv6的地址池足够巨大，甚至可以为地球上每一粒沙子都分配一个IPv6地址。
