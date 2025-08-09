---
title: 基于Python语言的小项目：Extract From TXT
layout: post
cover: https://imageurl.kuri.ink/images/background/111.jpg
coverWidth: 2000
coverHeight: 1000
categories:
  - 编程开发
tags:
  - 文本编辑
date: 2023/5/9 13:25:03
---
✅ 对文本文件具有线性关系的行数对应内容的提取。

<!--more-->

基于Python语言. 本脚本文件可以帮助您提取TXT文本文件中具有一定规律的信息.

## 版本

version 1.0.0

### 支持的内容

- 对具有线性关系的行数对应内容的提取(version 1.0.0)

## 库

- linecache

## 输入格式

```bash
<TXT文件路径> <首定位行数> <步长数> <循环次数>
```

## 样例输入

注：先执行 ``demo.py``，在脚本所在目录生成 ``demo.txt``文件.

```bash
demo.txt 1 5 5
```

## 样例输出

```
这是第1行.

这是第6行.

这是第11行.

这是第16行.

这是第21行.

内容共计100行.
```

## 源信息

```python
# !/usr/bin/python
# -*- coding: utf-8 -*-
# @name   : Extract_From_TXT/main.py
# @author : fly6022
# @date   : 2022/5/29
# @Email  : cl@kuri.ink
# @license: MIT
```

## 解决问题

若程序报错，则是TXT文件的文本编码不是UTF-8，请尝试将文本编码转为UTF-8.

## 源代码

!!! note main.py

    ```python
    # !/usr/bin/python
    # -*- coding: utf-8 -*-
    # @name   : Extract_From_TXT/main.py
    # @author : fly6022
    # @date   : 2022/5/29
    # @Email  : cl@kuri.ink
    # @license: MIT

    import linecache

    filename,p,q,loop=input().split(' ');

    p = int(p);

    q = int(q);

    loop = int(loop);

    def main(p,q,loop):

    PRINT_OR_LIST = "n"

    count = len(open(filename, encoding='UTF-8').readlines())

    if int(loop) > count:
            count,loop = loop,count

    for i in range(p, loop, q):
            with open(filename, encoding="UTF-8") as f:
                for num, line in enumerate(f):
                    if num == i-1:
                        if PRINT_OR_LIST == "Y":
                            line=line.strip("\n")
                            list=[]
                            list.append(line)
                            print(list)
                        else:
                            print(line)
        print("内容共计" + str(loop) + "行.")

    main(p,q,loop)
    ```

!!! note demo.py

    ```python
    full_path = 'demo' + '.txt'
    file = open(full_path, encoding='UTF-8')

    for i in range(1,101,1):
        output = ("这是第" + str(i) + "行.\n")
        file.write(output)
    ```
