---
title: 一加7：刷入 PixelExperience ROM
layout: post
cover: /posts/op7pe/banner.png
coverWidth: 1920
coverHeight: 1080
categories:
  - 随便写写
tags:
  - 一加7
  - 类原生
  - PixelExperience
  - ROM
  - 刷机

date: 2023/1/31 09:57:03
---
OnePlus 7 刷入类原生ROM ``PixelExperience``.

<!--more-->

## 前言

!!! error 注意
    刷机有风险，成功率不保证是100%，请务必备份好手机数据，并且做好有可能失败的心理准备！

### 选择阅读的部分

以下部分为选择性阅读部分，如果您的手机之前已经刷入过其它类型的ROM或未遇到相关问题，可以略过。

- 安装Autumn Box（秋之盒）
- 安装 OnePlus USB 驱动并开启手机调试功能
- 解除 BootLoader[^1] 锁【适用问题：第一次刷机，或以前刷机后又回锁的情况）
- 高通 EDL 刷机（9008模式）【适用问题：通过官方 OTA 更新到 Color OS 后无法刷入 TWRP 的情况】
- 注脚内容

### 必须阅读的部分

除以上说明以外的其它部分。

### 特别注意的部分

用红色字体注明的部分，该部分内容您应当特别注意。

### 下载链接

以下是本文章中所需要的文件：[^2]

| Key                               | Value                                                                                                                                                                    |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 秋之盒                            | https://atmb.sm9.top/AutumnBox/%E4%B8%BB%E7%A8%8B%E5%BA%8F/AutumnBox-2019.4.13.zip                                                                                       |
| OnePlus USB驱动                   | https://oneplususbdrivers.com/oneplus-7-usb-driver-download/                                                                                                             |
| 高通9008驱动                      | https://yun.daxiaamu.com/files/tool/%E9%AB%98%E9%80%9A%E7%BA%BF%E5%88%B7%E9%A9%B1%E5%8A%A8/%E9%AB%98%E9%80%9A9008%E9%A9%B1%E5%8A%A8(%E6%8E%A8%E8%8D%90).exe              |
| 9008工具QPST                      | https://www.52pojie.cn/thread-1216032-1-1.html                                                                                                                           |
| 9008固件                          | https://yun.daxiaamu.com/OnePlus_Roms_2/%E4%B8%80%E5%8A%A07/9008%E7%BA%BF%E5%88%B7%E6%95%91%E7%A0%96%E5%8C%85%E6%B0%A2OS%2011.0.6.1/guacamoleb_14_H.01_220211_repack.zip |
| **TWRP（官方）**            | https://dl.twrp.me/guacamolev2/                                                                                                                                          |
| **Oxygen OS 12.1 H32底包**  | https://yun.daxiaamu.com/OnePlus_Roms_2/%E4%B8%80%E5%8A%A07/%E6%B0%A7OS%2012.1%20H.32/6393320e5fee4d859dc8e6dcea69e7a9.zip/                                              |
| **PixelExperience（官方）** | https://download.pixelexperience.org/changelog/guacamoleb/PixelExperience_Plus_guacamoleb-13.0-20230106-1142-OFFICIAL.zip/                                               |

## 安装Autumn Box（秋之盒）

点击上方链接，下载安装即可。具体使用参见官网：https://atmb.top/

## 安装 OnePlus USB 驱动并开启手机调试功能

### 安装 USB 驱动

安装 USB 驱动的目的是让电脑识别手机，从而能够使用ADB对手机进行控制。

### 打开调试功能

设置 --> 关于手机 --> 版本号（快速点击5次）--> 开发者选项 --> 打开USB调试。

## 解除 BootLoader 锁

以下是解锁需要的命令：

```bash
adb devices // 判断手机是否连接成功；若输出一串字符，则证明手机连接成功
adb reboot bootloader // 重启手机至 fastboot 模式
fastboot oem unlock // 解除 Bootloader 锁
```

!!! error 注意
    此步骤会清空手机 data 分区，请事先备份好个人数据！

之后手机会弹出一个确认界面，使用音量键勾选确认。

手机自动重启，解锁完毕。

## 刷入第三方 REC TWRP

```
adb reboot bootloader // 重启至 fastboot 模式
fastboot boot twrp-3.7.0_12-0-guacamolev2.img // 临时刷入TWRP
```

稍等5-10秒钟，手机会自动进入REC.

!!! info FAQ

    ### 无法刷入TWRP或刷入后手机迟迟无反应

    一般情况下，升级到 Color OS 之后会出现这种问题，建议备份手机数据，之后采用9008刷机回到 氢 OS，再刷入 TWRP。

    9008刷机教程详见文章底部。

## 双清，刷入氧OS底包

这是一个重要的环节，一般情况下刷入第三方ROM都需要先刷入底包。

若上一步操作成功，您现在应该已经成功进入了 TWRP。

!!! error 注意
    此步骤会清空手机 data 分区，请事先备份好个人数据！

确认手机数据已完全备份，点击“Format”，擦除手机data分区。

将下载好的 [Oxygen OS 12.1 H32底包](https://yun.daxiaamu.com/OnePlus_Roms_2/%E4%B8%80%E5%8A%A07/%E6%B0%A7OS%2012.1%20H.32/6393320e5fee4d859dc8e6dcea69e7a9.zip/) 拷贝到手机内置存储目录中，之后点击 TWRP 中的“Install”，找到后缀名为“.zip”的刷机包，安装。

安装完毕后，点击“Reboot”，重启。

## 刷入PixelExperience ROM

重复步骤 【2.2. 打开调试功能】以及步骤【4. 刷入第三方 REC TWRP】。

**注意，此时不需要再清除data分区。**

将下载好的 [PixelExperience ROM](https://yun.daxiaamu.com/OnePlus_Roms_2/%E4%B8%80%E5%8A%A07/%E6%B0%A7OS%2012.1%20H.32/6393320e5fee4d859dc8e6dcea69e7a9.zip/) 拷贝到手机内置存储目录中，之后点击 TWRP 中的“Install”，找到后缀名为“.zip”的刷机包，安装。

安装完毕后，点击“Reboot”，重启。

!!! info FAQ

    ### 重启后手机不进入系统，而是进入Recovery模式

    考虑切换A/B分区。（如果目前是A分区，就切换到B，反之，切换到A）

    ``      adb reboot bootloader // 进入 Fastboot 模式               fastboot set_active b // 切换到 B 分区（视具体情况而定）      ``

    完成这一步，手机应该会自动重启到系统。

**刷机到此结束！**

## （补充）9008刷机操作教程

在电脑安装好 [高通9008驱动](https://yun.daxiaamu.com/files/tool/%E9%AB%98%E9%80%9A%E7%BA%BF%E5%88%B7%E9%A9%B1%E5%8A%A8/%E9%AB%98%E9%80%9A9008%E9%A9%B1%E5%8A%A8(%E6%8E%A8%E8%8D%90).exe)。

将手机关机，同时按住【音量+】及【音量-】键，之后将手机连接电脑。

在电脑上解压 9008 刷机固件。

打开 QFIL。

点击 "Browse"，找到固件路径下的“prog_emmc_firehose_8953_ddr.mbn”文件。

点击 “Load XML", 找到固件路径下的“patch0.xml”文件，此时会再次弹出一个窗口，点击"rawprogram_unsparse.xml"

点击“Download”，等待手机重启即可。

## 版权说明及引用说明

1. 文章中提到的TWRP REC、PixelExperience ROM等的版权按照相关开源/闭源协议归其开发者所有。部分资源的下载地址来源为大侠阿木。
   - TWRP：https://eu.dl.twrp.me/guacamolev2/
   - PixelExperience：https://forum.xda-developers.com/t/rom-official-guacamoleb-13-pixelexperience-6th-january-2023.4465935/
   - 大侠阿木：https://yun.daxiaamu.com/
2. 本文章的官方发布渠道为酷安网(https://coolapk.com/)及本站(https://blog.fly6022.fun/)，采用 署名-非商业性使用-禁止演绎 4.0 国际 (CC BY-NC-ND 4.0) 协议进行许可，转载请注明原出处。

[^1]: Bootloader 锁，即一种对引导加载程序的锁定系统，是手机厂商为了防止用户滥用  Fastboot 或篡改手机官方 Recovery 而设置的一种安全措施。想要刷入第三方ROM，必须解除 BootLoader 锁。
    
[^2]: 鸣谢：感谢热心读者 [@lsqAI](https://github.com/lsqAl) 指出文章中的过时内容，现已更正。
