---
title: 记录一次 基于 Fiddler 工具的 Web 逆向分析
layout: post
cover: /posts/fw1/01.jpg
coverWidth: 1396
coverHeight: 796
categories:
  - 编程开发
tags:
  - 逆向工程
  - Web
  - Fiddler
  - Python

date: 2023/7/31 23:06:59
---
本文章以 [百度题库: https://easylearn.baidu.com/edu-page/tiangong/questiondetail](https://easylearn.baidu.com/edu-page/tiangong/questiondetail) 为例，采用 Fiddler 工具及 Python 语言实现 Web 逆向分析。

<!--more-->

!!! ERROR 法律风险告知
    本文仅用于编程及相关技术的学习交流及经验分享，请勿利用相关技术手段从事商业侵权以及其它违法犯罪活动！

## 网页客户端操作逻辑

该网站是学习类网站，主要功能是提供作业习题内容及相关解析，客户端的操作逻辑是：用户将题目输入到搜索框，之后点击“搜索试题”按钮，网页便重定向到对应的页面。与搜索引擎的操作逻辑类似。

![02](/images/posts/fw1/02.png)

注意到，当按下“搜索试题”按钮后，URL后面多了键名为 ``query``，键值为 ``黄河小浪底水利枢纽是治理开发黄河的关键性工程。阅读材料回答问题。(14分) 材料``(编码后为：``%E9%BB%84%E6%B2%B3%E5%B0%8F%E6%B5%AA%E5%BA%95%E6%B0%B4%E5%88%A9%E6%9E%A2%E7%BA%BD%E6%98%AF%E6%B2%BB%E7%90%86%E5%BC%80%E5%8F%91%E9%BB%84%E6%B2%B3%E7%9A%84%E5%85%B3%E9%94%AE%E6%80%A7%E5%B7%A5%E7%A8%8B%E3%80%82%E9%98%85%E8%AF%BB%E6%9D%90%E6%96%99%E5%9B%9E%E7%AD%94%E9%97%AE%E9%A2%98%E3%80%82%2814%E5%88%86%29%20%E6%9D%90%E6%96%99``)的内容。

![04](/images/posts/fw1/04.png)

点击任意一条信息，我们跳转到了一个新页面，这个页面有一些像 作业帮 的搜题界面。

此页面展示了习题的题目内容及解答步骤。

同时，URL也发生了变化，此处的URL为 ``https://easylearn.baidu.com/edu-page/tiangong/questiondetail?id=1714572139188923485&from=jySearch``。

注意到此处出现了一个新参数 ``id``，它的值为 ``1714572139188923485``

## 实现原理及逆向工程

为了弄清以上操作的实际原理，我们使用 Fiddler 工具，对刚才的全部过程进行记录，并且抓取部分请求片段进行分析。

![03](/images/posts/fw1/03.png)

在刚才的请求操作中，以下请求片段引起了我们的注意：

```
GET https://easylearn.baidu.com/edu-web/content/search?query=%E9%BB%84%E6%B2%B3%E5%B0%8F%E6%B5%AA%E5%BA%95%E6%B0%B4%E5%88%A9%E6%9E%A2%E7%BA%BD%E6%98%AF%E6%B2%BB%E7%90%86%E5%BC%80%E5%8F%91%E9%BB%84%E6%B2%B3%E7%9A%84%E5%85%B3%E9%94%AE%E6%80%A7%E5%B7%A5%E7%A8%8B%E3%80%82%E9%98%85%E8%AF%BB%E6%9D%90%E6%96%99%E5%9B%9E%E7%AD%94%E9%97%AE%E9%A2%98%E3%80%82(14%E5%88%86)+%E6%9D%90%E6%96%99&type=&page=1&pageSize=10&clientType=pc HTTP/1.1
```

它将 ``query``的值由客户端发送到了服务端。

服务端返回的数据是一段 ``JSON``文本（实际内容较长，此处保留了一部分）：

```
{
  "errno": 0,
  "errmsg": "success",
  "data": {
    "count": 50,
    "list": [
      {
        "entityId": "1714572139188923485",
        "title": "<div><span class=\"high-light\">黄河小浪底水利枢纽是治理开发黄河</span>的<span class=\"high-light\">关键性工程</span>。<span class=\"high-light\">阅读材料回答问题</span>。 <span class=\"high-light\">材料</span>一 图a为<span class=\"high-light\">黄河</span>水系图,图b为<span class=\"high-light\">黄河</span>流量与含沙量统计图...</div>",
        "hotLevel": 100.3,
        "difficulty": 4,
        "sourceType": "question",
        "subject": "其他",
        "step": "其他",
        "knowPoint": "",
        "hasVideo": false,
        "hasDocument": true,
        "viewNum": "9.1w",
        "docPriority": 4
      },
      {
        "entityId": "1735129348683347666",
        "title": "<div><span class=\"high-light\">黄河小浪底水利枢纽是治理开发黄河</span>的<span class=\"high-light\">关键性工程</span>。<span class=\"high-light\">阅读材料回答问题</span>。  <span class=\"high-light\">材料</span>一 图a为<span class=\"high-light\">黄河</span>水系图，图b为<span class=\"high-light\">黄河</span>流量与含沙量统计...</div>",
        "hotLevel": 102,
        "difficulty": 2,
        "sourceType": "question",
        "subject": "地理",
        "step": "高中",
        "knowPoint": "",
        "hasVideo": false,
        "hasDocument": true,
        "viewNum": "4.9w",
        "docPriority": 4
      }
    ]
  }
}
```

不难发现，此处的 ``entityId``键值与之前在 ``URL``中看到的 ``id``的键值是一致的，因此，我们猜测它们有一定的关系。

![05](/images/posts/fw1/05.png)

同样的，我们发现了类似的请求片段：

```
GET https://easylearn.baidu.com/edu-web-go/shiti/basicinfo?id=1714572139188923485&eqid=&clientType=pc HTTP/1.1
```

服务端返回的数据是一段 ``JSON``文本：

```
{
    "errno":0,
    "errmsg":"success",
    "data":{
        "answer":[
            {
                "tag":"解答",
                "desc":"<div class="IILbHc"><div class="GSfhdv" style="text-indent:21.0pt;">成整正织该厂员人</div><span><div class="GSfhdv" style="text-indent:21.0pt;">成整正织该厂员人</div>[答案]小浪底水利枢纽改变了海陆间水循环的地表径流环节和库区的水汽蒸发环节(2分);调节了下游河段河流流量的季节变化,减少了泥沙对下游河道的沉积,并对河口三角洲海陆变化产生的影响。(3分)</span><div class="GSfhdv" style="text-indent:21.0pt;">成整正织该厂员人</div></div><div class="GSfhdv" style="text-indent:21.0pt;">成整正织该厂员人</div>"
            }
        ],
        "choice":[

        ],
        "collectNum":0,
        "difficulty":1,
        "first":false,
        "hotLevel":84.6,
        "id":"1714572139188923485",
        "isCollect":0,
        "isLike":0,
        "isShowAnswer":false,
        "isShowOcr":0,
        "knowList":[

        ],
        "likeNum":0,
        "material":[

        ],
        "ocrData":[

        ],
        "query":"",
        "question":"<div class="DlYrCn"><div class="uhTjAb" style="text-indent:21.0pt;">身整作四值面准近圆</div><span><div class="uhTjAb" style="text-indent:21.0pt;">身整作四值面准近圆</div>黄河小浪底水利枢纽是治理开发黄河的关键性工程。阅读材料回答问题。(14分)</span><div class="uhTjAb" style="text-indent:21.0pt;">身整作四值面准近圆</div></div><div class="uhTjAb" style="text-indent:21.0pt;">身整作四值面准近圆</div><div class="DlYrCn"><div class="uhTjAb" style="text-indent:21.0pt;">身整作四值面准近圆</div><span><div class="uhTjAb" style="text-indent:21.0pt;">身整作四值面准近圆</div>材料一  图A为黄河水系图,图B为黄河流量与含沙量统计图。</span><div class="uhTjAb" style="text-indent:21.0pt;">身整作四值面准近圆</div></div><div class="uhTjAb" style="text-indent:21.0pt;">身整作四值面准近圆</div><div class="DlYrCn"><div class="uhTjAb" style="text-indent:21.0pt;">身整作四值面准近圆</div><img class="img-max" src="https://tiku-data.cdn.bcebos.com/originalpic/89c12155f5ce077c1ba56d29ff103a25.jpg?auth_key=2320402241-0-0-acd57f0481a5f474e595b0ed62498bc8" style="width:588.00px;height:209.00px"><div class="uhTjAb" style="text-indent:21.0pt;">身整作四值面准近圆</div></div><div class="uhTjAb" style="text-indent:21.0pt;">身整作四值面准近圆</div><div class="DlYrCn"><div class="uhTjAb" style="text-indent:21.0pt;">身整作四值面准近圆</div><span><div class="uhTjAb" style="text-indent:21.0pt;">身整作四值面准近圆</div>材料二  黄河小浪底水利枢纽位于黄河中游最后一段峡谷的出口处,以防洪、减淤为主,兼顾供水、灌溉和发电,工程主要由壤土斜心墙堆石坝、泄洪排沙系统和引水发电系统组成。图C为黄河小浪底景观照片。</span><div class="uhTjAb" style="text-indent:21.0pt;">身整作四值面准近圆</div></div><div class="uhTjAb" style="text-indent:21.0pt;">身整作四值面准近圆</div><div class="DlYrCn"><div class="uhTjAb" style="text-indent:21.0pt;">身整作四值面准近圆</div><img class="img-max" src="https://tiku-data.cdn.bcebos.com/originalpic/66788145983dcc8ef1438b71c9097c6d.jpg?auth_key=2320402241-0-0-19597d773224ff445fb3c8e187c413de" style="width:239.00px;height:171.00px"><div class="uhTjAb" style="text-indent:21.0pt;">身整作四值面准近圆</div></div><div class="uhTjAb" style="text-indent:21.0pt;">身整作四值面准近圆</div><div class="DlYrCn"><div class="uhTjAb" style="text-indent:21.0pt;">身整作四值面准近圆</div><span><div class="uhTjAb" style="text-indent:21.0pt;">身整作四值面准近圆</div>试用水循环原理和地理环境整体性原理说明小浪底水利枢纽的建设对地理环境产生的影响。(5分)</span><div class="uhTjAb" style="text-indent:21.0pt;">身整作四值面准近圆</div></div><div class="uhTjAb" style="text-indent:21.0pt;">身整作四值面准近圆</div>",
        "similar":[
            {
                "id":"1714572139188923485"
            },
            {
                "id":"1714263992328526866"
            },
            {
                "id":"1714161626125941121"
            },
            {
                "id":"1713953333589690253"
            },
            {
                "id":"1728494088442452058"
            },
            {
                "id":"1712388657586605084"
            }
        ],
        "step":"qt",
        "stepName":"",
        "strquestion":"黄河小浪底水利枢纽是治理开发黄河的关键性工程。阅读",
        "subList":[

        ],
        "subject":"other",
        "subjectName":"",
        "testGuideVer":1,
        "testMergeVer":2
    }
}
```

由此，我们便获得了相关有效信息的源信息。
