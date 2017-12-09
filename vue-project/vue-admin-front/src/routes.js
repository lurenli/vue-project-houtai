import Home from './components/Home.vue';
import User from './components/user/User.vue';
import Upload from './components/upload/Upload.vue';
import News from './components/news/News.vue';
import Cate from './components/cate/Cate.vue';
import Comment from './components/comment/Comment.vue';


export const routes = [
//	path是路径
//后面的component是在js里面通过Import导入的
	{ path:'/',component:Home },
	{ path:'/user',component:User }	,
	{ path:'/upload',component:Upload }	,
	{ path:'/news',component:News }	,
	{ path:'/cate',component:Cate }	,
	{path:'/comment',component:Comment},
	{path:'/comment/:id',component:Comment}
];



