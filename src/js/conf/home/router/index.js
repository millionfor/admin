import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: {
        name: 'home'
      }
    },
    {
      path: '/home',
      name: 'home',
      component: resolve => require(['../pages/home/index'], resolve),
      meta: {
        title: '首页'
      }
    },
    {
      path: '/classify',
      name: 'classify',
      component: resolve => require(['../pages/classify/index'], resolve),
      meta: {
        title: '分类'
      },
      redirect: {
        name: 'classify-list'
      },
      children: [
        {
          path: '/classify/list',
          name: 'classify-list',
          component: resolve => require(['../pages/classify/pages/list/index'], resolve),
          meta: {
            title: '分类列表 '
          }
        },
        {
          path: '/classify/create',
          name: 'classify-create',
          component: resolve => require(['../pages/classify/pages/create/index'], resolve),
          meta: {
            title: '添加分类'
          }
        },
        {
          path: '/classify/details/:id',
          name: 'classify-details',
          component: resolve => require(['../pages/classify/pages/create/index'], resolve),
          meta: {
            title: '添加分类'
          }
        }
      ]
    },
    {
      path: '/photo',
      name: 'photo',
      component: resolve => require(['../pages/photo/index'], resolve),
      meta: {
        title: '照片管理'
      },
      redirect: {
        name: 'photo-list'
      },
      children: [
        {
          path: '/photo/list',
          name: 'photo-list',
          component: resolve => require(['../pages/photo/pages/list/index'], resolve),
          meta: {
            title: '照片列表 '
          }
        },
        {
          path: '/photo/create',
          name: 'photo-create',
          component: resolve => require(['../pages/photo/pages/create/index'], resolve),
          meta: {
            title: '照片列表 '
          }
        }
      ]
    },
    {
      path: '/setting',
      name: 'setting',
      component: resolve => require(['../pages/setting/index'], resolve),
      meta: {
        title: '设置'
      }
    }

  ]
})

export default router
