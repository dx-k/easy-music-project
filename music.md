# 运行设置

## 1.运行vue项目

```
cd vue	进入vue文件夹下
npm install 安装vue及vue-router
npm run dev	运行项目
```

## 2.运行后台服务

```node.js
需要node环境
node server.js
或者
nodemon server.js
```

# 项目简述

## 1.开发初目标

在开发之初，只是想做一个注册功能，能够将用户信息存储到后台，以及检测用户是否存在

很显然注册是写完了，但是由于前期是想到啥写啥，没有具体的目标，导致代码不够复用，不够灵活。在开发后续更多功能时出现需要多次修改已完成代码的情况。

目前将项目上线 github 用于告诫自身，在开发前需要大致的流程，在写代码时需要考虑更多情况，使得代码能够复用，灵活，轻便。

## 2.目前完成了那些目标

完成了注册前查询用户是否存在

完成了注册用户，后台可以以json文件格式存储用户基本信息

完成了音乐的查询，如果没有查询到，前端暂时还没有做提示

完成了音乐查询到之后的播放

## 3.以后的目标

尽可能完善音乐项目，使得能够登录，注册，播放音乐，限制某些音乐需要登录才能播放

## 4.音乐的设置

需要自己手动的放置音乐在 **music后台** 文件夹的 **music **文件夹下

并且文件名称需要修改，例如我在请前端搜索的音乐名称为 "在你的身边" ，那么在 **music** 文件夹下需要有 "在你的身边.m4a"文件

即可播放
