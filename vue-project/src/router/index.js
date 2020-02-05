import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: ()=> import('../views/Home.vue'),
      beforeEnter: (to, from, next) => {
        if (!/[auth]/.test(document.cookie)) next('/login')
        else next()
      }
    },
    {
      path: '/login',
      name: 'login',
      component: ()=> import('../views/Login.vue')
    }
  ]
})

export default router;