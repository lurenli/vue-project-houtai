import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import {routes} from './routes';
import iView from 'iview';
import 'iview/dist/styles/iview.css';    // 使用 CSS
import VueAxios from 'vue-axios';
import {store} from './store';
import axios from 'axios';
import VueQuillEditor from 'vue-quill-editor';



axios.defaults.headers.post['Content-Type']='application/x-www-form-urlencoded';
Vue.use(VueRouter);
Vue.use(iView);
Vue.use(VueAxios, axios);
Vue.use(VueQuillEditor)



//路由的实例化
const router =new VueRouter({
 	routes:routes
 	
 	
 })

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
