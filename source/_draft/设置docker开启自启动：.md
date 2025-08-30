设置docker开启自启动：

```shell
systemctl enable docker.service
```

## 配置Docker

为了使ddns-go安装过程顺利，故需要提前更换Docker的安装源：

```shell
sudo nano /etc/docker/daemon.json
```

将Docker的安装源更换为下面内容：

```shell
{
    "registry-mirrors": [
        "https://do.nark.eu.org",
        "https://dc.j8.work",
        "https://docker.m.daocloud.io",
        "https://dockerproxy.com",
        "https://docker.mirrors.ustc.edu.cn",
        "https://docker.nju.edu.cn"
    ]
}
```

输入下方命令重启服务：

```shell
systemctl daemon-reload
systemctl restart docker
```

键入下方命令检查是否更换成功：

```
docker info
```

!!! ERROR
    若终端报错，可重启终端重试。

若返回内容中包括以下内容，则证明更换成功。

```
 Registry Mirrors:
  https://do.nark.eu.org/
  https://dc.j8.work/
  https://docker.m.daocloud.io/
  https://dockerproxy.com/
  https://docker.mirrors.ustc.edu.cn/
  https://docker.nju.edu.cn/
```