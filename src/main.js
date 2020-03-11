import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import echarts from 'echarts'
import vueAxios from 'vue-axios'
import axios from 'axios'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)
import './assets/reset.css';
Vue.config.productionTip = false
import XButton from 'vux/src/components/x-button'
import {Tab,TabItem, Swiper,SwiperItem} from 'vux';
import 'element-ui/lib/theme-chalk/index.css';
import { Menu,Submenu,MenuItem,MenuItemGroup,Dialog,Button} from 'element-ui';
// import { Toast } from 'vux'
import shareBtn from './components/shareBtn';
Vue.component('sharebtn',shareBtn)
import urls from './api/urls.js';
Vue.prototype.$urls = urls;
import qs from 'qs';
Vue.prototype.$qs = qs;
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(Button)
Vue.use(MenuItemGroup);
Vue.use(Dialog);
Vue.prototype.$echarts = echarts;
Vue.use(vueAxios, axios)
Vue.component('tab', Tab)
Vue.component('tab-item', TabItem)
Vue.component('x-button', XButton)
Vue.component('swiper', Swiper)
Vue.component('swiper-item', SwiperItem)
import load from '@/components/loadmore';
import {baseurl} from '../src/utils/tools';
Vue.prototype.$baseurl= baseurl; 
Vue.component('load',load)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
