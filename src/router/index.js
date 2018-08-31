import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path:'/',
      redirect:'/login',
    },
    {
      path: '/login', component: resolve => require(['@/components/contain/login'],resolve)
    },
    {
      path: '/index',
      component: resolve => require(['@/components/contain/index'],resolve),
      meta: {
        requiresAuth: true
      },
      children:[
      {
        path: '/index/changePassWord',
        component: resolve => require(['@/components/containFrame/changePassWord'],resolve),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/index/clockInSettings',
        component: resolve => require(['@/components/containFrame/clockInSettings'],resolve),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/index/bigViewportSettings',
        component: resolve => require(['@/components/containFrame/bigViewportSettings'],resolve),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/index/learnDateSettings',
        component: resolve => require(['@/components/containFrame/learnDateSettings'],resolve),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/index/roleManagement',
        component: resolve => require(['@/components/containFrame/roleManagement'],resolve),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/index/realTimeStatistics',
        component: resolve => require(['@/components/containFrame/realTimeStatistics'],resolve),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/index/checkData',
        component: resolve => require(['@/components/containFrame/checkData'],resolve),
        meta: {
          requiresAuth: true
        }
      },
        {
          name:'studentsDetails',
          path: '/index/studentsDetails',
          component: resolve => require(['@/components/containFrame/studentsDetails'],resolve),
          meta: {
            requiresAuth: true
          }
        }
      ]
    },
  ]
})
router.beforeEach((to, from, next) => {
  let token = sessionStorage.getItem('token')
  if (to.matched.some(record => record.meta.requiresAuth) && (!token || token === null)) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
})

export default router
