import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
//引入routes 后缀是js路由模块写法
import {routes} from './routes';
import iView from 'iview';
import 'iview/dist/styles/iview.css';    // 使用 CSS
import axios from 'axios';
import VueAxios from 'Vue-axios';
//import {store}  from './store';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
//相对于src这个路径
import VueQuillEditor from 'vue-quill-editor';

Vue.use(VueQuillEditor);
Vue.use(VueAxios,axios);
Vue.use(VueRouter);
Vue.use(iView);
//在main.js中引入vue-router模块并进行使用Vue.use(VueRouter)，并且new VueRouter以后将引入的router模块进行设置，最后需要在new Vue实例对象中设置router模块。还有，在app.vue主组件中显示路由内容需要用<router-view></router-view> 来进行渲染
const router = new VueRouter({
	routes:routes // 可以直接写成routes
	//设置router模块
})

new Vue({
  el: '#app',
//store,
  router, // router:router
  render: h => h(App)
})
