import Vue from 'vue';
import App from './App.vue';

// element下的button
import { Button, MessageBox } from 'element-ui';
// 组件全局注册
Vue.component(Button.name, Button);
// 原型注册
Vue.prototype.$alert = MessageBox.alert;

//引入路由
import router from './router/index';

// 三级联动组件--全局
import TypeNav from '@/components/TypeNav';
Vue.component(TypeNav.name, TypeNav);

// 轮播图组件--全局
import Carousel from '@/components/Carousel';
Vue.component(Carousel.name, Carousel);

// 分页器组件--全局
import Pagination from '@/components/Pagination';
Vue.component(Pagination.name, Pagination);

// 引入vuex仓库
import store from '@/store/index';
// 引入MockServe.js---模拟数据
import '@/mock/mockServe';
// 引入swiper
import 'swiper/css/swiper.css'

//统一接收api里所有的请求函数 
import * as API from '@/api'

// 引入自定义插件
// import myPlugins from '@/plugins/myPlugins'
// Vue.use(myPlugins, { name: 'xian' })


// 懒加载
import VueLazyload from 'vue-lazyload'
import pic from '@/assets/lazy.jpg'
Vue.use(VueLazyload, {
  // 懒加载默认组件
  loading: pic,
});

// 引入表单校验插件
import '@/plugins/validate'

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  beforeCreate() {
    // 配置全局事件总线
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
  //注册路由:组件身上会拥有$route,$router属性
  router,
  //注册仓库:组件身上会拥有$store属性
  store
}).$mount('#app');
