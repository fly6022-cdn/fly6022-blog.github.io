---
title: 树莓派：配置config.txt实现超频及启用HDMI功能
layout: post
cover: https://imageurl.kuri.ink/images/background/52.jpg
coverWidth: 1920
coverHeight: 1080
categories:
  - 随便写写
tags:
  - 配置文件
  - HDMI
  - 超频
  - 树莓派

date: 2024/8/10 20:00:59
---
本文章以树莓派为例，通过配置 `config.txt`文件实现对树莓派CPU/GPU的超频并启用HDMI功能。

<!--more-->

## 环境

设备：Raspberry Pi 4B（4GB RAM）

系统：Ubuntu 22.04 LTS（arm64）

## 你还需要

- Micro SD Card 读卡器

## 超频

!!! warning 注意

    1. 在配置`config.txt`之前，请对原文件进行备份，以免造成树莓派无法启动的后果。

    2. 超频会造成树莓派运行稳定性下降，请根据实际情况合理超频。

    3. 将``force_turbo``选项赋值为 `1`会使CPU强制在最大频率工作，可能会造成严重发热问题，同时会失去保修。

将存储卡连接到电脑上，打开 `system-boot`文件夹，找到 `config.txt`文件。

在文件末尾新增一行，添加以下内容：

```plaintext
[pi4]
arm_boost=1
over_voltage=6
arm_freq=2000
gpu_freq=750
force_turbo=0
```

以下内容摘自 [树莓派文档](https://pidoc.cn/docs/computers/config-txt#%E8%B6%85%E9%A2%91%E9%80%89%E9%A1%B9) ：

| 选项                 | 描述                                                                                                                                                                                                                                                                                                                                                                                   |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| arm_freq             | ARM CPU 频率（MHz）。                                                                                                                                                                                                                                                                                                                                                                  |
| arm_boost            | 将 `arm_freq`提升至板卡类型和固件支持的最高频率。设置为 `1`时启用。                                                                                                                                                                                                                                                                                                                |
| gpu_freq             | 同时设置 `core_freq`、`h264_freq`、`isp_freq`、`v3d_freq`和 `hevc_freq`。                                                                                                                                                                                                                                                                                                    |
| core_freq            | GPU 处理器内核的频率（MHz）。影响 CPU 性能，因为它驱动二级缓存和内存总线；二级缓存仅对树莓派 Zero/树莓派 Zero W/树莓派 1 有利；SDRAM 对树莓派2和树莓派3有微小的好处。有关在树莓派4上的使用，请参阅下面的章节。                                                                                                                                                                         |
| h264_freq            | 硬件视频模块的频率（MHz）；可单独覆盖 `gpu_freq`设置。                                                                                                                                                                                                                                                                                                                               |
| isp_freq             | 图像传感器流水线模块的频率（MHz）；可单独覆盖 `gpu_freq`设置。                                                                                                                                                                                                                                                                                                                       |
| v3d_freq             | 3D 模块的频率（MHz）；可单独覆盖 `gpu_freq`设置。在树莓派5上，V3D 独立于 `core_freq`、`isp_freq`和 `hevc_freq`。                                                                                                                                                                                                                                                               |
| hevc_freq            | 高效视频编解码器块的频率（MHz）；可单独覆盖 gpu_freq 设置。仅适用于树莓派4。                                                                                                                                                                                                                                                                                                           |
| sdram_freq           | SDRAM 频率（MHz）。不支持 树莓派 4 或更新版本的 SDRAM 超频。                                                                                                                                                                                                                                                                                                                           |
| over_voltage         | CPU/GPU内核电压上限。该值范围应为 [-16,8]，相当于 [0.95V,1.55V]（树莓派1 上为 [0.8,1.4V]），步长为 0.025V。换句话说，指定 -16 时，CPU/GPU 内核电压最大值为 0.95V（树莓派 1 为 0.8V）；指定 8 时，CPU/GPU 内核电压最大值为 1.55V（树莓派 1 为 1.4V）。有关默认值，请参见下表。只有指定 `force_turbo=1`时，才允许电压值超过 6：如果同时设置 `over_voltage_*`>`0`，则会设置保修位。 |
| over_voltage_sdram   | 同时设置 `over_voltage_sdram_c`、`over_voltage_sdram_i`和 `over_voltage_sdram_p`。                                                                                                                                                                                                                                                                                               |
| over_voltage_sdram_c | SDRAM 控制器电压调整。[-16,8]相当于 [0.8V,1.4V]，步长为 0.025V。不支持树莓派4或更高版本设备。                                                                                                                                                                                                                                                                                          |
| over_voltage_sdram_i | SDRAM I/O 电压调整。[-16,8] 相当于 [0.8V,1.4V]，步长为 0.025V。不支持树莓派4或更高版本设备。                                                                                                                                                                                                                                                                                           |
| over_voltage_sdram_p | SDRAM phy 电压调整。[-16,8] 相当于 [0.8V,1.4V]，步长为 0.025V。不支持树莓派4或更高版本设备。                                                                                                                                                                                                                                                                                           |
| force_turbo          | 即使 ARM 内核不忙时也强制执行超频模式频率。如果同时设置了 `over_voltage_*`，则启用此功能可能会设置保修位。                                                                                                                                                                                                                                                                           |
| initial_turbo        | 在给定值（秒）或 cpufreq 设置频率之前，从启动开始启用[超频模式](https://forums.raspberrypi.com/viewtopic.php?f=29&t=6201&start=425)。最大值为 `60`。                                                                                                                                                                                                                                    |
| arm_freq_min         | 用于动态频率时钟的 `arm_freq`最小值。请注意，将该值降至默认值以下并不会显著降低功耗，目前也不支持该功能。                                                                                                                                                                                                                                                                            |
| core_freq_min        | 用于动态频率时钟的 `core_freq`最小值。                                                                                                                                                                                                                                                                                                                                               |
| gpu_freq_min         | 用于动态频率时钟的 `gpu_freq`最小值。                                                                                                                                                                                                                                                                                                                                                |
| h264_freq_min        | 用于动态频率时钟的 `h264_freq`最小值。                                                                                                                                                                                                                                                                                                                                               |
| isp_freq_min         | 用于动态频率时钟的 `isp_freq`最小值。                                                                                                                                                                                                                                                                                                                                                |
| v3d_freq_min         | 用于动态频率时钟的 `v3d_freq`最小值。                                                                                                                                                                                                                                                                                                                                                |
| hevc_freq_min        | 用于动态频率时钟的 `hevc_freq`最小值。                                                                                                                                                                                                                                                                                                                                               |
| sdram_freq_min       | 用于动态频率时钟的 `sdram_freq`最小值。                                                                                                                                                                                                                                                                                                                                              |
| over_voltage_min     | 用于动态频率时钟的 `over_voltage`。该值范围应为 [-16,8]，相当于 [0.8V,1.4V]，步长为 0.025V。换句话说，指定 -16 时，CPU/GPU 内核空闲电压为 0.8V，指定 8 时，最低电压为 1.4V。此设置在树莓派4和树莓派5上已被弃用。                                                                                                                                                                     |
| over_voltage_delta   | 在 树莓派4和树莓派5上，over_voltage_delta 参数会在 DVFS 算法计算出的数值上添加以微伏为单位的偏移量。                                                                                                                                                                                                                                                                                   |
| temp_limit           | 过热保护。当 SoC 达到该值（摄氏度）时，该参数会将时钟和电压设置为默认值。超过 85 的值将被箝位在 85。                                                                                                                                                                                                                                                                                   |
| temp_soft_limit      | **仅限 3A+/3B+** 。CPU 速度节流控制。该值用于设置 CPU 时钟速度节流系统启动时的温度。在此温度下，时钟速度将从[1400MHz](http://pan.baidu.com/s/1400MHz#undefined)降至[1200MHz](http://pan.baidu.com/s/1200MHz#undefined)。默认值为 `60`，最大可升至 `70`，但可能导致不稳定。                                                                                                         |

## HDMI配置

新增一行，添加下列内容（其中 `hdmi_group`和 `hdmi_mode`的值视具体情况而定）：

```plaintext
hdmi_group=1
hdmi_mode=16
hdmi_enable_4kp60=1
hdmi_force_hotplug=1
config_hdmi_boost=4
```

将下列内容注释掉：

```
# dtoverlay=vc4-kms-v3d,cma-128
```

`hdmi_group`和 `hdmi_mode`的赋值详见 [自定义树莓派的显示分辨率 - 树莓派实验室](https://shumeipai.nxez.com/2013/08/31/custom-display-resolution-raspberry-pie.html)

## 原版 `config.txt`

```plaintext
[all]
kernel=vmlinuz
cmdline=cmdline.txt
initramfs initrd.img followkernel

[pi4]
max_framebuffers=2
arm_boost=1

[all]
# Enable the audio output, I2C and SPI interfaces on the GPIO header. As these
# parameters related to the base device-tree they must appear *before* any
# other dtoverlay= specification
dtparam=audio=on
dtparam=i2c_arm=on
dtparam=spi=on

# Comment out the following line if the edges of the desktop appear outside
# the edges of your display
disable_overscan=1

# If you have issues with audio, you may try uncommenting the following line
# which forces the HDMI output into HDMI mode instead of DVI (which doesn't
# support audio output)
#hdmi_drive=2

# Enable the serial pins
enable_uart=1

# Autoload overlays for any recognized cameras or displays that are attached
# to the CSI/DSI ports. Please note this is for libcamera support, *not* for
# the legacy camera stack
camera_auto_detect=1
display_auto_detect=1

# Config settings specific to arm64
arm_64bit=1
dtoverlay=dwc2

# Enable the KMS ("full" KMS) graphics overlay, leaving GPU memory as the
# default (the kernel is in control of graphics memory with full KMS)
dtoverlay=vc4-kms-v3d
disable_fw_kms_setup=1

[pi3+]
# Use a smaller contiguous memory area, specifically on the 3A+ to avoid an
# OOM oops on boot. The 3B+ is also affected by this section, but it shouldn't
# cause any issues on that board
dtoverlay=vc4-kms-v3d,cma-128

[pi02]
# The Zero 2W is another 512MB board which is occasionally affected by the same
# OOM oops on boot.
dtoverlay=vc4-kms-v3d,cma-128

[all]

[cm4]
# Enable the USB2 outputs on the IO board (assuming your CM4 is plugged into
# such a board)
dtoverlay=dwc2,dr_mode=host

[all]

```
