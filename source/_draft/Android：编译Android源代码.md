---
title: Android：编译Android源代码
layout: post
cover: https://imageurl.kuri.ink/images/background/86.jpg
coverWidth: 3468
coverHeight: 2000
categories:
  - 随便写写
tags:
  - Hexo
  - hexo-renderer-kramed

date: 2022/02/19 13::39:41
---
hexo-renderer-kramed渲染器渲染表格时错误问题的解决。

<!--more-->

最近在将Hexo博客升级的时候，发现博客网页中的表格渲染有问题：

![04](https://cdn.jsdelivr.net/gh/imageurl/fly6022@masterhttps://imageurl.kuri.ink/images/posts/2022-02-19-01/04.png)

经过排查，发现与主题无关，我认为是渲染器出了问题。

在浏览器F12界面进行调试发现：

![05](https://cdn.jsdelivr.net/gh/imageurl/fly6022@masterhttps://imageurl.kuri.ink/images/posts/2022-02-19-01/05.png)

![06](https://cdn.jsdelivr.net/gh/imageurl/fly6022@masterhttps://imageurl.kuri.ink/images/posts/2022-02-19-01/06.png)

![01](https://cdn.jsdelivr.net/gh/imageurl/fly6022@masterhttps://imageurl.kuri.ink/images/posts/2022-02-19-01/01.png)

将 ``<table>``标签外面的 ``<div class="table-container>"``删除，表格恢复正常。

前往博客根目录，在地址栏键入：``<根目录文件夹>\node_modules\hexo-renderer-kramed\lib``

![02](https://cdn.jsdelivr.net/gh/imageurl/fly6022@masterhttps://imageurl.kuri.ink/images/posts/2022-02-19-01/02.png)

将 ``renderer.js``用编辑器打开，并将其中的第 ``35-47``行：

```js
// Add table-container div to set overflow-x: auto
Renderer.prototype.table = function(header, body) {
  return '<div class="table-container">\n'
    + '<table>\n'
    + '<thead>\n'
    + header
    + '</thead>\n'
    + '<tbody>\n'
    + body
    + '</tbody>\n'
    + '</table>\n'
    + '</div>\n';
};
```

更改为：

```js
/*// Add table-container div to set overflow-x: auto
Renderer.prototype.table = function(header, body) {
  return '<div class="table-container">\n'
    + '<table>\n'
    + '<thead>\n'
    + header
    + '</thead>\n'
    + '<tbody>\n'
    + body
    + '</tbody>\n'
    + '</table>\n'
    + '</div>\n';
};*/

// Add table-container div to set overflow-x: auto
Renderer.prototype.table = function(header, body) {
  return '<table>\n'
    + '<thead>\n'
    + header
    + '</thead>\n'
    + '<tbody>\n'
    + body
    + '</tbody>\n'
    + '</table>\n'
};
```

即可。

在博客根目录打开 ``git bash``命令行界面，键入：

```bash
hexo clean && hexo s
```

在 ``localhost:4000``刷新网页，即可使渲染恢复正常。

-- END
