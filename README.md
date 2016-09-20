# CLReactAntDesign
基于antdesign 前端框架搭建的后端框架

#框架所用的开源架构
[antdegin](http://ant.design/)1.1.0版本，前端react框架
koa，后端web框架

#前端编译
atool-build：是antd基于webpack二次开发的编译工具

#安装

安装node依赖

```
npm install

```

修改数据库
修改serer/database/mysqlUtil.js下的数据库配置文件

#启动

首先编译前端页面

```
npm run build
```

启动服务

mac下

```
npm start
```

windows下

```
node server/server.js
```

#介绍

框架使用前后端分离的方式，交互通过接口，api的方式

server文件夹下是基于koa的后端api框架
src文件夹下是用react编写的前端控件，与页面,最终编译在dist文件夹下

#展示
登录用户名密码，admin/123

![](img/login.png)

![](img/main.png)
