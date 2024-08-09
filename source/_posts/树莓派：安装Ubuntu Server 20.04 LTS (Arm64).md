---
title: 树莓派：安装Ubuntu Server 20.04 LTS (Arm64)
layout: post
cover: /background/98.jpeg
coverWidth: 1920
coverHeight: 1080
categories:
  - 编程开发
tags: 
  - Ubuntu
  - 树莓派
  - Raspberry

date: 2021/5/29 19:03:17
---
树莓派安装 Ubuntu Server 20.04 LTS (Arm64)

<!--more-->

!!! info
    本教程仅适用于 Raspberry Pi 4B，安装的Ubuntu版本为Ubuntu Server 20.04 LTS (Arm64)

## 需要准备

### 硬件

1. Raspberry 4B
2. Micro SD Card（≥16GB)
3. RJ45网线（超5类及以上）

### 软件

1. balenaEtcher
2. PUTTY

## 下载镜像

- [官网下载](https://cdimage.ubuntu.com/releases/20.04.2/release/ubuntu-20.04.2-preinstalled-server-arm64+raspi.img.xz)

## 烧录镜像

打开【balenaEtcher】软件。

加载SD卡和镜像之后烧录。

![01](/images/posts/2021-05-29-01/02.jpg)

## 连接Wifi

将SD卡重新插入到电脑，进入【此电脑】，打开SD卡根目录。

新建文件“wpa_supplicant.conf”。

键入以下内容（汉字部分需要修改）：

```yaml
country=CN
ctrl_interface=DIR=/var/run/wpa_supplicantGROUP=netdev
update_config=1
network={
    ssid="Wifi名称"
      psk="Wifi密码"
      key_mgmt=WPA-PSK（加密方式）
      priority=1
}
```

## 初始化

配置好Wifi后，将SD卡插入到树莓派，上电开机。

等待一段时间，打开路由器页面

查看树莓派的IP地址。

打开【PUTTY】软件。

![03](/images/posts/2021-05-29-01/03.jpg)

键入初始化账户密码（账户：Ubuntu；密码：Ubuntu）

之后修改密码。

![04](/images/posts/2021-05-29-01/04.jpg)

## 更换软件源

获取管理员权限。

```bash
sudo su
```

用vi编辑器编辑文件。

```bash
vi /etc/apt/sources.list
```

将文件内容替换为：

```yaml
# 默认注释了源码镜像以提高 apt update 速度，如有需要可自行取消注释
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu-ports/ focal main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu-ports/ focal main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu-ports/ focal-updates main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu-ports/ focal-updates main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu-ports/ focal-backports main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu-ports/ focal-backports main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu-ports/ focal-security main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu-ports/ focal-security main restricted universe multiverse

# 预发布软件源，不建议启用
# deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu-ports/ focal-proposed main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu-ports/ focal-proposed main restricted universe multiverse
```

:wq，保存。

刷新软件源：

```bash
sudo apt-get update
sudo apt-get upgrade
```

## 配置raspi-config

!!! note 可选择的操作
    ### 安装图形界面
    ``bash     sudo apt-get install ubuntu-desktop     ``
    ### 配置远程连接（基于Xrdp协议）
    ``bash     sudo apt install xrdp     ``

### 安装依赖文件

```bash
sudo apt install whiptail parted lua5.1 alsa-utils psmisc
```

### 下载官网deb程序

```bash
wget http://archive.raspberrypi.org/debian/pool/main/r/raspi-config/raspi-config_20191021_all.deb
```

### 安装软件

```bash
sudo dpkg -i raspi-config_20191021_all.deb
```

### 运行

```bash
sudo raspi-config
```

## Ubuntu安装完成

![06](/images/posts/2021-05-29-01/06.jpg)
