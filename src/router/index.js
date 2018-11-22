import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Index from '@/components/Index'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: '引导页',
      component: Index,
      hidden: true
    },
    {
      path: '/Home',
      name: '主页',
      component: Home,
      hidden: true,
      meta: {
        requireAuth: true
      }
      // ,
      // children: [
      //   {
      //     path: '/chat',
      //     name: '消息',
      //     component: Chat,
      //     hidden: true,
      //     meta: {
      //       keepAlive: false,
      //       requireAuth: true
      //     }
      //   }
      // ]
    }
  ]
})
