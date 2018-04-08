**前端**
    
[前端地址](https://github.com/fengyaogit123/bookqd.git)
[后端地址](https://github.com/fengyaogit123/bookAdmin.git)

	觉得不错给个star，谢谢~
    
# 介绍
    由于最近需要做一个简单的图书管理系统，于是就用了vue前后端分离的开发模式
	模块
	1.分类管理
	2.出版管理
	3.读者管理
	4.图书管理
	5.借阅管理
	6.借阅记录
	7.图书概览
	另外还有主题功能，有多个主题可供选择(主题代码被我注释了，在store/modules/menu.js下) 
	可以全屏放大缩小
## 技术栈
```js
    //前端 https://github.com/fengyaogit123/bookqd.git
    1.vue
    2.vue-router
    3.vuex
    4.iview
    5.axios

    //后端 https://github.com/fengyaogit123/bookAdmin.git
    1.Node
    2.Eggjs
    3.Mongodb + Mongoose

```

## 安装
```js
    //使用前端之前 需要后端的项目已经运行  详情请看
    //https://github.com/fengyaogit123/bookAdmin.git
    $ git clone  https://github.com/fengyaogit123/bookqd.git
    $ cd bookqd
    $ npm i
    $ npm run dev 

    //打开地址 http://127.0.0.1:9898  查看
```

**后端**
# 介绍
    由于最近需要做一个简单的图书管理系统，于是就用了vue前后端分离的开发模式

## 技术栈
```js
    //前端 https://github.com/fengyaogit123/bookqd.git
    1.vue
    2.vue-router
    3.vuex
    4.iview
    5.axios

    //后端 https://github.com/fengyaogit123/bookAdmin.git
    1.Node
    2.Eggjs
    3.Mongodb + Mongoose

```

## 安装
```js
    //确认已经安装mongodb  这里默认配置是 
    config.mongoose = {
        url: 'mongodb://127.0.0.1:27017/book',
        options: {},
    };
    //没有设置账号密码 ，确保mongo服务已经打开

    //前端项目地址 https://github.com/fengyaogit123/bookqd.git
    $ git clone  https://github.com/fengyaogit123/bookAdmin.git
    $ cd bookAdmin
    $ npm i
    $ npm run dev 

    //打开地址 http://127.0.0.1:7001/public/web/index.html  查看
```
## 预览
   ![1.jpg](http://ooaa8syjw.bkt.clouddn.com/FkmDqxC6VB7b_wUmv464shTpeX1f)
   登录
   ![2.jpg](http://ooaa8syjw.bkt.clouddn.com/FhIHskYQivj5H56uqaaG1YsKeGmg)
   图书简介
   ![3.jpg](http://ooaa8syjw.bkt.clouddn.com/Fny0qZU463t12CQelfTTw4IKhMGp)
   图书借还
   ![4.jpg](http://ooaa8syjw.bkt.clouddn.com/Fl2aCFTZuHHDcnIOvYdIMYJKU79S)
   图书管理
   ![6.jpg](http://ooaa8syjw.bkt.clouddn.com/Fg_yAJ1vj3MJ_1CErWnYnAeuskwe)
   读者管理
   ![7.jpg](http://ooaa8syjw.bkt.clouddn.com/Fm-scuetubCUorxdifCBSL1073ZT)
   借阅记录
   ![image.png](http://ooaa8syjw.bkt.clouddn.com/FuzYQxIVnh0tx_zLt_s70KK_K5e2)
   出版管理以及分类管理
   
 ## 参考
 iView GitHub：https://github.com/iview/iview
 iView Admin GitHub：https://github.com/iview/iview-admin
