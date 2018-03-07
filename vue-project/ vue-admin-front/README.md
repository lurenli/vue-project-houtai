# vue-admin-front

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

# vue-houtai

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

1.安装vue:npm i vue --save;
2.需要安装npm install -g vue-cli;
3.vue init webpack-simple vue-houtai（这里的vue-houtai是自定义项目名称）;
4.cd vue-houtai（进入项目）——》npm install或者cnpm install——》;
5.安装：npm install iview --save；
6.安装：npm i vue-router --save;(路由插件)；
7.设置好后，npm run dev运行，报错
8.和element.elema的package.json做对比，发现少了style-loader，所以安装npm i style-loader -D
9.对比发现少了vue-style-loader ，所以安装npm i vue-style-loader -D;
10.安装npm i css-loader -D;
11.安装npm install --save axios vue-axios;($http请求用)
12.在后端node.js里安装上传插件：$ npm install --save multer
13.表单文件上传
	<form enctype='multipart/form-data'><input type="file" name="avatar"></form>
14.安装新闻支持插件：npm install vue-quill-editor --save



问题：1.User.vue里的page传不上去？
		解决方案：先用postman查找接口，如果正确，再查找user.controller.js里的{ page: page, limit: parseInt(rows) }，后面那个需要rows需要转化为数字，一一定要重启文件
	  2.分页问题： var rows = (req.body.rows) ? req.body.rows:2;
	  	里的rows总是获取2，req.body.rows获取不到
	  	解决方案：console.log(req.body),有数据，但是只有limit，没有rows，所以修改上面为
	  		var rows = (req.body.limit) ? req.body.limit:2;然后就好了 
