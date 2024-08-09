---
title: Javascript：XMLHttpRequest请求API实例
layout: post
cover: /background/94.jpg
coverWidth: 3500
coverHeight: 1969
categories:
- 编程开发
tags:
- JavaScript
- Ajax

date: 2022/6/3 22:24:50
---

API（应用程序接口）在前端开发过程中起到了举足轻重的作用，利用Web API中的 ``XMLHttpRequest``对象可以便于我们对API的调用。请求API的方式有很多，本文为大家提供一个比较简单的范例。

本文内容所用语言若无特别说明均为JavaScript，且本文所提供的方法作用域不包含IE浏览器这类比较老旧的浏览器。

首先，构造一个函数 ``XMLHttpRequest()``得到实例对象。

```js
XHR = new XMLHttpRequest();
```

其次，调用 ``open()``方法，该方法提供了三个参数：请求类型（``GET``和 ``POST``等）、请求的目标链接（也就是我们需要请求的API地址）以及是否发送异步请求的布尔值（由于 ``XMLHttpRequest``默认为异步请求，所以该布尔值默认为`true`）。

这里以“[API服务,天气API - 帮!](http://api.help.bj.cn/api/?id=45)”网站提供的天气API接口作为例子，它支持使用GET方法调用，并且不需要Token。

该API的接口地址为 ``//api.help.bj.cn/apis/weather/?id=101060101``，id为城市代码（长春）。

```js
XHR.open('GET', '//api.help.bj.cn/apis/weather/?id=101060101');
```

事实上，大多数情况下，为了适应更多情况，我们是这样写的：

```javascript
citycode = '101060101'; // 假设citycode是通过表单提交的

	XHR.open('GET', '//api.help.bj.cn/apis/weather/?id=' + String(citycode), true);
```

之后发送一个 ``null``参数。

```js
XHR.send(null);
```

使用Javascript的 ``JSON.parse()``方法处理传入的JSON数据。

```js
	XHR.onload = function() {

        json = JSON.parse(XHR.response)
      
        console.log(json);

    }
```

正常情况下，获取到的数据格式（XHR.response）应为：（以下格式内容来自API官网，为示例内容）

```json
{
    "status": "0",       //反馈代码 0成功
    "msg": "反馈信息",      //反馈信息
    "cityen": "changchun",       //城市名称英文
    "city": "长春",       //城市名称
    "citycode": "101060101",       //城市编码
    "temp": "10",       //实时温度
    "tempf": "50",       //华氏温度
    "wd": "西风",       //风向
    "wden": "W",       //风向英文
    "wdforce": "3级",       //风力
    "wdspd": "<12km/h",       //风速
    "uptime": "12:00",       //更新时间
    "weather": "晴",       //天气状况
    "weatheren": "Sunny",       //天气状况英文
    "weatherimg": "d00",       //天气状况图标
    "stp": "994",       //气压
    "wisib": "35000",       //能见度
    "humidity": "46%",       //湿度
    "prcp": "0",       //降雨
    "prcp24h": "2.2",       //24小时降雨量
    "aqi": "22",       //AQI
    "pm25": "20",       //PM2.5
    "today": "10月17日(星期一)"      //今天日期
}
```

处理过后的 ``json``（将其转换为了对象）：

```
Object { status: "0", cityen: "changchun", city: "长春", citycode: "101060101", temp: "19", tempf: "66", wd: "东南风", wden: "SE", wdenimg: "//www.help.bj.cn/weather/images/wind/se.png", wdforce: "2级", … }
```

下面是范例代码的全部内容：

```js
XHR = new XMLHttpRequest();

	citycode = '101060101'; // 假设citycode是通过表单提交的

	XHR.open('GET', '//api.help.bj.cn/apis/weather/?id=' + String(citycode), true);

	XHR.send(null);
  
	XHR.onload = function() {

        json = JSON.parse(XHR.response)

        console.log(json);

    }
```
