---
title: AI：RX590通过Ollama本地部署Deepseek-R1大模型
layout: post_a_cover
cover: https://api.ee123.net/img/bingimg/dayimg.jpg
coverWidth: 1920
coverHeight: 1080
categories:
  - 随便写写
tags:
  - AI
  - Deepseek
  - Ollama
  - AMD
  - RX590
  - ROCm

date: 2025/2/5 10:24:00
---

Ollama 并不原生支持部分系列的 AMD 显卡，因此，想要通过 RX590 显卡运行大模型（LLM），需要手动进行修改配置。

<!--more-->

## 下载安装Ollama-for-AMD

首先下载Ollama-for-AMD：[https://github.com/likelovewant/ollama-for-amd/releases/tag/v0.5.4](https://github.com/likelovewant/ollama-for-amd/releases/tag/v0.5.4)。

![01](https://imageurl.kuri.ink/images/posts/rx590-ollama-deepseek/01.png)

正常安装，Ollama会自动在后台运行，在任务栏中右键Ollama图标，点击“View logs”。

![02](https://imageurl.kuri.ink/images/posts/rx590-ollama-deepseek/02.png)

此时会跳转到目录：`C:\Users\<用户名>\AppData\Local\Ollama`

![03](https://imageurl.kuri.ink/images/posts/rx590-ollama-deepseek/03.png)

用文本编辑器打开“`server.log`”或“`server-1.log`”。

![04](https://imageurl.kuri.ink/images/posts/rx590-ollama-deepseek/04.png)

日志提示WARN：显卡`gpu type`为`gfx803`，且`ROCm`版本为`5.7`。

我们需要下载对应`gfx version`及`ROCm`的文件。

## 配置ROCm（HIP SDK）

首先下载ROCm的相关驱动，HIP SDK：[https://www.amd.com/en/developer/resources/ROCm-hub/hip-sdk.html](https://www.amd.com/en/developer/resources/ROCm-hub/hip-sdk.html)

![05](https://imageurl.kuri.ink/images/posts/rx590-ollama-deepseek/05.png)

找到对应操作系统版本`Windows 10 & 11`，`ROCm`版本`5.7.x`的SDK，下载并安装。

## 配置Rocmlibs

![06](https://imageurl.kuri.ink/images/posts/rx590-ollama-deepseek/06.png)

![07](https://imageurl.kuri.ink/images/posts/rx590-ollama-deepseek/07.png)

显卡`gpu type`为`gfx803`，对应为`rocm.gfx803.optic.vega10.logic.hip.sdk.6.1.2.7z`。

下载完毕后解压。

打开目录：`C:\Users\<用户名>\AppData\Local\Programs\Ollama\rocm`

将解压后文件中的`hipblas.dll`替换本目录中的文件。

打开目录：`C:\Users\<用户名>\AppData\Local\Programs\Ollama\rocm\rocblas`

将解压后文件中的`library`文件夹替换本目录中的文件夹。

**重启电脑**。

## 安装Deepseek

![09](https://imageurl.kuri.ink/images/posts/rx590-ollama-deepseek/09.png)

打开Ollama官网模型目录：[https://ollama.com/library/deepseek-r1](https://ollama.com/library/deepseek-r1)

根据自身电脑配置选择对应参数（`x b`代表`10x 亿参数`，例如`14b`代表`140亿参数`）

例如，我们要安装14b的大模型。

在CMD中键入`ollama run deepseek-r1:14b`

等待安装完毕即可。

或者，你也可以采用图形化界面与AI交互，例如使用[Chatbox](https://chatboxai.app/zh)。

## 检查

![08](https://imageurl.kuri.ink/images/posts/rx590-ollama-deepseek/08.png)

尝试与AI进行对话，例如输入“你好。”

打开任务管理器，发现GPU在工作，证明配置成功。

![10](https://imageurl.kuri.ink/images/posts/rx590-ollama-deepseek/10.png)

![11](https://imageurl.kuri.ink/images/posts/rx590-ollama-deepseek/11.png)