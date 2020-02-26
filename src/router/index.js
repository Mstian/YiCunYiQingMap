import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'tab',
    component: ()=> import ('../views/tab.vue')
  },
  {
    path:'/fanghushare',
    name:'fanhu',
    component:()=> import ('../components/fanghu_detail_share.vue')
  },
]

const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

export default router
