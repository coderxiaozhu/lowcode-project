import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "layout",
      component: () => import("../views/Layout.vue"),
      children: [
        {
          path: '',
          name: 'home',
          meta: {
            title: "欢迎来到xz的lowcode平台"
          },
          component: () => import("../views/home.vue")
        },
        {
          path: '/template/:id',
          name: 'template',
          component: () => import("../views/TemplateDetail.vue"),
          meta: {
            title: "模板详情"
          }
        },
        {
          path: 'works',
          name: 'works',
          component: () => import("../views/Works.vue"),
          meta: {
            title: "我的作品",
            requiredLogin: true
          }
        }
      ]
    },
    {
        // path: '/editor/:id',
        path: '/editor',
        name: 'editor',
        meta: {
          title: "编辑我的设计",
          requiredLogin: true
        },
        component: () => import("../views/Editor.vue")
    },
    {
        path: '/login',
        name: 'login',
        component: () => import("../views/Login.vue")
    }
  ]
})

export default router
