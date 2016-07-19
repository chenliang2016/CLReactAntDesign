# CLReactAntDesign
基于antdesign 前端框架搭建的后端框架

#框架所用的开源架构
[antdegin](http://ant.design/)0.12.12版本，前端react框架
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
npm run dev
```

windows下

```
node server/app.js
```

#介绍

框架使用前后端分离的方式，交互通过接口，api的方式

server文件夹下是基于koa的后端api框架
app文件夹下是用react编写的前端控件，与页面
