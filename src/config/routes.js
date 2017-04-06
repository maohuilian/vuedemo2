// 引用子路由
import frame from '../frame/subroute.vue'
// 引用模版
import index from '../page/index.vue'
import Login from '../page/login.vue'

// 文章管理
import indexArticle from '../page/article/index.vue'
import editArticle from '../page/article/edit.vue'
import detailArticle from '../page/article/detail.vue'
// 栏目管理
import indexChannel from '../page/channel/index.vue'
import editChannel from '../page/channel/edit.vue'
// 管理员管理
import indexAdmin from '../page/administrator/index.vue'
import editAdmin from '../page/administrator/edit.vue'
// 系统设置
import indexSite from '../page/site/index.vue'
// 配置路由
export default [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/',
    component: frame,
    children: [
      {path: '/', component: index}
    ]
  },
  {
    path: '/article',
    component: frame,
    children: [
      {path: '', component: indexArticle},
      {path: 'add', component: editArticle},
      {path: 'edit/:id', component: editArticle},
      {path: 'detail/:id', component: detailArticle}

    ]
  },
  {
    path: '/channel',
    component: frame,
    children: [
      {path: '/', component: indexChannel},
      {path: 'add', component: editChannel},
      {path: 'edit/:id', component: editChannel}
    ]
  },
  {
    path: '/administrator',
    component: frame,
    children: [
      {path: '/', component: indexAdmin},
      {path: 'add', component: editAdmin},
      {path: 'edit/:id', component: editAdmin}
    ]
  },
  {
    path: '/site',
    component: frame,
    children: [
      {path: '/', component: indexSite}
    ]
  }

]
