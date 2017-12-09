import User from './components/user/User.vue';
import Home from './components/Home.vue';
import Upload from './components/upload/Upload.vue';
import Cate from './components/cate/Cate.vue';
import News from './components/news/News.vue';
import Comment from './components/comment/Comment.vue';
export const routes=[
	{path:'/',component:Home},
	{path:'/user',component:User},
	{path:'/upload',component:Upload},
	{path:'/cate',component:Cate},
	{path:'/news',component:News},
	{path:'/comment',component:Comment},
	{path:'/comment/:id',component:Comment}
]