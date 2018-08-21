import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login', component: resolve => require(['@/components/contain/login'],resolve)
    },
    {
      path: '/index',
      redirect:'/index/changePassWord',
      component: resolve => require(['@/components/contain/index'],resolve),
      children:[
      {
        path: '/index/changePassWord',
        component: resolve => require(['@/components/containFrame/changePassWord'],resolve),
      },
      {
        path: '/index/clockInSettings',
        component: resolve => require(['@/components/containFrame/clockInSettings'],resolve),
      },
      {
        path: '/index/bigViewportSettings',
        component: resolve => require(['@/components/containFrame/bigViewportSettings'],resolve),
      },
      {
        path: '/index/learnDateSettings',
        component: resolve => require(['@/components/containFrame/learnDateSettings'],resolve),
      },
      {
        path: '/index/roleManagement',
        component: resolve => require(['@/components/containFrame/roleManagement'],resolve),
      },
      {
        path: '/index/realTimeStatistics',
        component: resolve => require(['@/components/containFrame/realTimeStatistics'],resolve),
      },
      {
        path: '/index/checkData',
        component: resolve => require(['@/components/containFrame/checkData'],resolve),
      },
        {
          name:'studentsDetails',
          path: '/index/studentsDetails',
          component: resolve => require(['@/components/containFrame/studentsDetails'],resolve),
        }
      ]
    },
  ]
})

