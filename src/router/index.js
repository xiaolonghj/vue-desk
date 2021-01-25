import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login/login'
import Layout from '@/components/layout/layout'
import Home from '@/views/home/home'
import Article from '@/views/article/article'
import Publish from '@/views/publish/publish'
import Image from '@/views/image/image'
import Comment from '@/views/comment/comment'
import Settings from '@/views/settings/settings'
import Fans from '@/views/fans/fans'


Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Layout',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Home',
        component: Home
      },
      {
        path: '/article',
        name: 'Article',
        component: Article
      },
      {
        path: '/publish',
        name: 'Publish',
        component: Publish
      },
      {
        path: '/image',
        name: 'Image',
        component: Image
      },
      {
        path: '/comment',
        name: 'Comment',
        component: Comment
      },
      {
        path: '/settings',
        name: 'Settings',
        component: Settings
      },
      {
        path: '/fans',
        name: 'Fans',
        component: Fans
      }
    ]
  }
  // {
  //   path: '/home',
  //   name: 'Home',
  //   component: Home
  // }
]

const router = new VueRouter({
  routes
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 从哪个路径跳转而来
  // next 是一个函数 表示放行
  //  next() 表示放行  next('/login') 表示强制跳转到登陆页

  if (to.path === '/login') return next()
  // 获取token
  const tokenstr = window.sessionStorage.getItem('token')
  if (!tokenstr) return next('/login')
  next()
})

export default router
