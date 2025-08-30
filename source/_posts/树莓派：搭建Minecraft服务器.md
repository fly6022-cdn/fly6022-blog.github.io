---
title: 树莓派：搭建Minecraft服务器
layout: post
cover: https://imageurl.kuri.ink/images/background/97.jpg
coverWidth: 1920
coverHeight: 1014
categories:
  - 随便写写
tags:
  - Minecraft
  - 服务器
date: 2021-01-26 18:58:13
---
树莓派搭建Minecraft服务器。

<!--more-->

## 本文章适合的情况

- 希望搭建一个属于自己的同学、基友服务器，对服务器配置要求不太高
- 希望开一个7*24小时服务器却又担心电费问题
- 平时玩游戏时间不多，租用服务器觉得不划算

## 注意事项

1. 树莓派的配置不高且高负荷工作时发热较严重，推荐搭配散热片及散热风扇来使用。
2. 树莓派的稳定性较差，仅适用于搭建个人小型服务器，不要跑图或者设置在线人数过多。
3. 本文章需要有一定的技术基础，小白请先了解相关知识。
4. 本教程一些步骤不单单局限于树莓派，可拓展至大部分安装有Linux系统的硬件设备。

## 你需要准备

- 安装好系统（建议图形界面）且可以联网的树莓派（此处使用的是Ubuntu 20.04 LTS Arm64系统）
- 公网映射软件（如：[Sakura FRP](https://www.natfrp.com/)等），局域网开服可略过。
- 一台能远程控制树莓派的手机/电脑

## 开始搭建

### 安装Java

和客户端一样，服务端也需要Java的支持，请按照以下命令来安装Java：

```bash
sudo apt-get install openjdk-16-jdk
```

### 下载开服核心

首先，搭建Minecraft服务器需要一个开服核心，这是搭建Minecraft服务器的必由之路。

这里，我推荐使用Spigot（水龙头）核心，原因是这个核心比较稳定，并且适合配置较低的设备。当然，你也可以使用其它核心，比如bukkit。

访问[Getbukkit](https://getbukkit.org/download/spigot)，下载你需要版本的核心。

![01](https://imageurl.kuri.ink/images/posts/2021-01-26-01/01.png)

核心是一个 ``.jar``文件,此处我使用的核心适用于Minecraft Java版 1.15.2。

![02](https://imageurl.kuri.ink/images/posts/2021-01-26-01/02.png)

### 配置服务器环境

在存有核心文件的目录新建一个 ``run.sh``文件，该文件作为服务器的启动脚本。

打开文件，在文本编辑器输入以下内容：

```bash
sudo java -Xms768M -Xmx2048M -jar /root/Desktop/Minecraft_server/Server_3/[核心名称].jar nogui
```

其中，**文件路径根据具体情况而定**。

> sudo：以管理员身份执行
> -Xms768M：程序运行时最小内存为768M
> -Xmx2048M：程序运行时最大内存为2048M
> nogui：即No GUI，无图形界面，可节省内存

![03](https://imageurl.kuri.ink/images/posts/2021-01-26-01/03.png)

之后保存文件。

在终端输入命令：

```bash
cd /root/Desktop/Minecraft_server/Server_3/

sh run.sh
```

回车。

命令执行结束，会发现在文件夹中多了几个文件。

![04](https://imageurl.kuri.ink/images/posts/2021-01-26-01/04.png)

打开文件夹中的 ``eula.txt``，将 ``eula``的参数由 ``false``改为 ``true``。

保存。

![05](https://imageurl.kuri.ink/images/posts/2021-01-26-01/05.png)

接着，打开文件夹中的 ``server.properties``文件（该文件是服务器的配置文件）。

![06](https://imageurl.kuri.ink/images/posts/2021-01-26-01/06.png)

参考[Minecraft Wiki](https://minecraft-zh.gamepedia.com/Server.properties).以下是各参数的实际含义：

```yml
#Minecraft server properties
#Wed Jan 27 16:46:05 CST 2021
broadcast-rcon-to-ops=true  # 广播RCON信息给OP
view-distance=10  # 视野距离
max-build-height=256  # 建筑最大高度，最大值65534
server-ip=  # 服务器IP（可留空或填localhost）
level-seed=  # 地图种子
rcon.port=25575  # 可忽略，RCON远程连接协议端口
gamemode=survival  # 游戏模式
server-port=25565 # 游戏端口，根据个人情况设置，可保持默认值25565
allow-nether=true  # 开放地狱
enable-command-block=false  # 开启命令方块
enable-rcon=false  # 开启RCON功能，建议不开启
enable-query=false  # 允许使用 GameSpy4 协议的服务器监听器
op-permission-level=4  # OP等级，最大值为4，等同于控制台权限
prevent-proxy-connections=false  # 检测异地登陆并阻止进入游戏
generator-settings=  # 生成器设置
resource-pack=  # 服务器使用资源包设置
level-name=world  # 地图名称
rcon.password=  # RCON密码，若不开启RCON功能可忽略
player-idle-timeout=0  # 挂机检测，0表示不开启，单位为分钟
motd=A Minecraft Server  # 服务器标题，要求使用Unicode格式文字
query.port=25565  # Query端口，若不开启Query可忽略
debug=false # 调试模式
force-gamemode=false  # 强制游戏模式
hardcore=false  # 极限生存
white-list=false  # 白名单
broadcast-console-to-ops=true  # 广播控制台信息给OP
pvp=true  # 玩家攻击
spawn-npcs=true  # 生成村民
generate-structures=true  # 生成建筑
spawn-animals=true  # 生成动物
snooper-enabled=true  # 允许采集服务器信息
difficulty=easy  # 强制难度选项
function-permission-level=2  # 默认权限等级
network-compression-threshold=256  # 数据包压缩大小
level-type=default  # 种子类型
spawn-monsters=true  # 生成怪物
max-tick-time=60000  # 服务器最大崩溃等待响应时间，单位毫秒
enforce-whitelist=false  # 强制白名单
use-native-transport=true  # 针对Linux的优化
max-players=20  # 最大玩家数量
resource-pack-sha1=  # 资源包验证，使用哈希加密SHA1
spawn-protection=16  # 出生点保护
online-mode=true  # 在线模式（正版模式）
allow-flight=false  # 允许飞行
max-world-size=29999984  # 世界生成上限
```

配置并保存后，再次运行启动脚本。

```bash
sh run.sh
```

稍等片刻。

![07](https://imageurl.kuri.ink/images/posts/2021-01-26-01/07.png)

待命令行出现 ``Done``时，即表示我们的服务器已经在本地成功运行了。

不过，想要邀请你的好朋友一起来玩服务器，还差最后一步——配置公网映射，在这里建议使用DDNS-GO或Sakura FRP.

DDNS-GO 适用于 IPv6 地址绑定域名，Sakura FRP 适用于不支持IPv6且没有公网IPv4地址的情况下使用。

DDNS-GO 的配置方法参照文章：[树莓派：利用ddns-go配置DDNS实现IPv6公网域名访问](/posts/树莓派：利用ddns-go配置DDNS实现IPv6公网域名访问/)，Sakura FRP的配置方法可以到官方文档了解学习。