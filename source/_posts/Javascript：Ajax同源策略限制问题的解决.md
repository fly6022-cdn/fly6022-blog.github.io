---
title: Javascript：Ajax 同源策略限制问题的解决
layout: post
cover: /background/7.jpg
coverWidth: 2500
coverHeight: 1352
categories:
  - 编程开发
tags:
  - Javascript
  - Ajax

date: 2021/3/7 9:29:22
---
Ajax 同源策略限制问题的解决。

<!--more-->

![01](/images/posts/2021-03-07-01/01.jpg)

## 写在前面

首先，我们要了解，何为『同源策略』。

> **同源策略**是一个重要的**安全策略**，它用于限制一个origin的文档或者它加载的脚本如何能与另一个源的资源进行交互。它能帮助阻隔恶意文档，减少可能被攻击的媒介。
>
> 如果两个 URL 的 protocol、port (如果有指定的话)和 host 都相同的话，则这两个 URL 是*同源*。这个方案也被称为“协议/主机/端口元组”，或者直接是 “元组”。（“元组” 是指一组项目构成的整体，双重/三重/四重/五重/等的通用形式）。
>
> <p align="right">—— <a href="https://developer.mozilla.org/zh-CN/docs/Web/Security/Same-origin_policy" target="_blank">MDN官方文档</a></p>

例如：

| URL                     | 结果 | 原因                       |
| ----------------------- | ---- | -------------------------- |
| http://a.com/1.html     | 同源 | 只有路径不同               |
| http://a.com/src/2.html | 同源 | 只有路径不同               |
| https://a.com/3.html    | 失败 | 协议不同                   |
| http://a.com:81/4.html  | 失败 | 端口不同(http默认端口是80) |
| http://b.com/1.html     | 失败 | 主机不同                   |

总结一下，满足 `<u>`同源 `</u>`的条件：

- 主机相同
- 端口相同
- 协议相同

三者缺一不可。

## 解决方法

我们已经了解了『同源策略』的基本概念，虽然说，它是一种浏览器主动的安全策略，但是，却时常给我们的前端开发造成了困难。

那么，我们如何解决『同源策略』给我们带来的不便呢？

比较推荐的方法有两种。

### JSONP

JSONP 是利用html标签不受『同源策略』限制的影响，从而达到解决『同源策略』限制的目的。通俗来讲，叫“曲线救国”。

这种方法的好处是：

- 比较简单
- 兼容性较好（较老版本的浏览器也支持）
- 不必对服务器端进行配置（或配置相对较少）

但是，这种方法有一定的局限性：它仅支持GET方式请求数据。

#### 基本原理

在网页添加一个 ``<script>``元素，再向服务器请求JSON数据。服务器收到请求后，将数据存放在一个指定的回调函数 ``callback()``里。

### CORS（跨域资源共享）

这种方法允许浏览器向跨源服务器发出 ``XMLHttpRequest``请求，从而克服了同源策略的限制。

好处是：

- 较方便配置
- 兼容所有请求方式

局限性是：

- 较老版本的浏览器可能不支持
- 需要在服务器端配置

#### 基本原理（仅针对简单请求：HEAD、GET、POST）

对于简单请求，浏览器直接发出CORS请求。具体来说，就是在头信息之中，增加一个 ``Origin``字段。

下面是一个例子，浏览器发现这次跨源AJAX请求是简单请求，就自动在头信息之中，添加一个 ``Origin``字段。

```yaml
GET /cors HTTP/1.1
Origin: http://api.bob.com
Host: api.alice.com
Accept-Language: en-US
Connection: keep-alive
User-Agent: Mozilla/5.0...
```

上面的头信息中，``Origin``字段用来说明，本次请求来自哪个源（协议 + 域名 + 端口）。服务器根据这个值，决定是否同意这次请求。

如果 ``Origin``指定的源，不在许可范围内，服务器会返回一个正常的HTTP回应。浏览器发现，这个回应的头信息没有包含 ``Access-Control-Allow-Origin``字段（详见下文），就知道出错了，从而抛出一个错误，被 ``XMLHttpRequest``的 ``onerror``回调函数捕获。注意，这种错误无法通过状态码识别，因为HTTP回应的状态码有可能是200。

如果 ``Origin``指定的域名在许可范围内，服务器返回的响应，会多出几个头信息字段。

```yaml
Access-Control-Allow-Origin: http://api.bob.com
Access-Control-Allow-Credentials: true
Access-Control-Expose-Headers: FooBar
Content-Type: text/html; charset=utf-8
```

<hr>

`<small>`1. MDN官方文档（ https://developer.mozilla.org/zh-CN/docs/Web/Security/Same-origin_policy ）- Author(s): Jesse Ruderman `</small>`
`<small>`2. 阮一峰.跨域资源共享CORS详解[EB/OL]. (2016-4-12)[2021-03-07].http://www.ruanyifeng.com/blog/2016/04/cors.html - 许可证:自由转载-非商用-非衍生-保持署名(创意共享3.0许可证).`</small>`
