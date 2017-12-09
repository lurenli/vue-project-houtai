项目的搭建
1.码云上面创建  vue-admin-front
2.在sourcetree  
3. 搭建环境
	1) vue init webpack-simple project_name    cd vue-admin-front    cnpm i
	2) npm install iview --save    ===npm i iview --save 
 	3)npm i vue-router -S
 	4)npm i style-loader -D
	5)npm i vue-style-loader -D
	6)npm i css-loader -D
	7)npm install --save axios vue-axios
	8）npm install --save multer    上传 在nodejsapi
	9)npm install vue-quill-editor
	10)np i vuex -S
	11)npm i -D babel-preset-stage-2
	12)npm i ctypto-js -S   //加密
4.技术栈
	vue-router
	iview
	style-loader
	vue-style-loader
	axios
	vue-axios
	multer
	quill-editors
	vuex
	babel
	async
步骤：
1.用户管理
1）进行基本的环境创建
2）引入布局的iview ;
3）后端与前台的连接，启动mogodb启动mongod --dbpath d:\mongodb  ,post当时显示数据库的内容
4）分页的操作  :page-size="2"  绑定成number
5)添加用户按钮==》对话框==》form
6）获取单个？ params
7)用户管理 添加，删除，修改，查看，搜索，多选框
8）上传管理
9）vue的编辑器  quill-editors
10）新闻管理，分类管理，用户管理，上传管理，评论管理，退出系统，登录系统
注意点：1.用post的时候注意要设置全局抛送类型
		axios.defaults.headers.post['Content-Type']='application/x-www-form-urlencoded';
		2./的话要用params
		3.添加和编辑的话要进行一层判断
		4.文件上传原理：通过form 表要进行enctype="multipart/form-data" 
		input tyle="file"    name="avatar[]"
		5.分类管理：进行添加根节点 ，修改  ，删除 
		
疑难问题以及解决方案
1.用户管理：删除多条；=》运用foreach找到数据的id,在弹窗出进行delete的操作
			搜索功能的实现；=》写一个函数getdata();进行请求，里面的数据运用过滤；最后调用该函数

2.分类管理：修改;=》v-model数据绑定；添加根节点进行一次请求；在添加和修改的时候进行判断

3.新闻管理：点击tree,出现新闻，=》 写一个initList（cartid）的一个函数
			点击查看评论进行跳转并且传送id;=》this.$router.push({ path: `/comment/${params.row._id}` })
			当前新闻下出现对应评论数==》async

4.评论管理：如何接收这个id;=》 在created钩子函数里面this.initList(this.$route.path.split('/')[2])

			在添加评论时如何直接刷新到当前添加的那个页面；=》要进行过滤
5.上传管理：添加一个upload路由；如何在表格里面出现上传的图片信息；=》运用:on-success； Object.assign是一个对象合并的操作 

6.登录：运用vuex

7.评分；进行双向数据绑定；

8.编辑器不能解析标签：用渲染render: (h, params) => {
                            return h('div', {
                                domProps:{
                                    innerHTML:params.row.content
                                }
                            })
                        }

