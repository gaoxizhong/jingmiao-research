import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'

import researchHome from '../views/researchPages/researchHome.vue'  //  科研灵感主页




const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location)
}
Vue.use(VueRouter)

const routes = [

  {  // 科研灵感界面
    path: '/',
    name : 'researchHome',
    component: researchHome,
    redirect: '/popularLiterature',
    children:[
      { 
        path: '/popularLiterature', // 文献默认页面 --- 热门推荐
        name: 'popularLiterature',
        component: () => import('@/views/researchPages/popularLiterature'),
        meta: {
          keepAlive: true,
          scollTopPosition: 0,
          requireAuth:true
        }
      },
      { 
        path: '/literatureDetails', // 文献默认页面 --- 文献详情页
        name: 'literatureDetails',
        component: () => import('@/views/researchPages/literatureDetails'),
        meta: {
          keepAlive: false, // 刷新不缓存
          scollTopPosition: 0,
          requireAuth:true
        }
      },
      { 
        path: '/myFavorite', //  --- 我收藏的
        name: 'myFavorite',
        component: () => import('@/views/researchPages/myFavorite'),
        meta: {
          keepAlive: false,
          scollTopPosition: 0,
          requireAuth:true
        }
      },
      { 
        path: '/literatureAuthor', //  --- 作者详情页
        name: 'literatureAuthor',
        component: () => import('@/views/researchPages/literatureAuthor'),
        meta: {
          keepAlive: false,
          scollTopPosition: 0,
          requireAuth:true,
        }
      },
      { 
        path: '/scholarAnalysis', //  --- 学者分析首页
        name: 'scholarAnalysis',
        component: () => import('@/views/researchPages/scholarAnalysis'),
        meta: {
          keepAlive: true,
          scollTopPosition: 0,
          requireAuth:true,
        }
      },
      { 
        path: '/scholarAnalysisDetails', //  --- 学者分析详情页
        name: 'scholarAnalysisDetails',
        component: () => import('@/views/researchPages/scholarAnalysisDetails'),
        meta: {
          keepAlive: false,
          scollTopPosition: 0,
          requireAuth:true,
        }
      },
      { 
        path: '/subjectAnalysis', //  --- 学科分析首页
        name: 'subjectAnalysis',
        component: () => import('@/views/researchPages/subjectAnalysis'),
        meta: {
          keepAlive: true,
          scollTopPosition: 0,
          requireAuth:true,
        }
      },
      { 
        path: '/journalAnalysis', //  --- 期刊分析首页
        name: 'journalAnalysis',
        component: () => import('@/views/researchPages/journalAnalysis'),
        meta: {
          keepAlive: true,
          scollTopPosition: 0,
          requireAuth:true,
        }
      },
      { 
        path: '/journalDetails', //  --- 期刊分析详情页
        name: 'journalDetails',
        component: () => import('@/views/researchPages/journalDetails'),
        meta: {
          keepAlive: false,
          scollTopPosition: 0,
          requireAuth:true,
        }
      },
      { 
        path: '/useTutorial', //  --- 使用教程
        name: 'useTutorial',
        component: () => import('@/views/researchPages/useTutorial'),
        meta: {
          keepAlive: true,
          scollTopPosition: 0,
          requireAuth:true,
        }
      },
      { 
        path: '/institutionalAnalysis', //  --- 机构分析首页
        name: 'institutionalAnalysis',
        component: () => import('@/views/researchPages/institutionalAnalysis'),
        meta: {
          keepAlive: false,
          scollTopPosition: 0,
          requireAuth:true,
        }
      },
      { 
        path: '/user-center', //  --- 个人中心
        name: 'userCenter',
        component: () => import('@/views/researchPages/userCenter'),
        meta: {
          title: '个人中心',
          keepAlive: true,
          scollTopPosition: 0,
          requireAuth:true,
        }
      },
    ]
  },

]

// 页面刷新时，重新赋值token
if (window.localStorage.getItem('token')) {
  store.dispatch("setToken",window.localStorage.getItem('token'));
}

const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

// console.log(process.env.BASE_URL)
router.afterEach((to) => {
  if(to.meta.title){
    document.title = to.meta.title
  }else{
    document.title = '科研探索'
  }
  window.scrollTo(0,0);

})

router.beforeEach(async(to, from, next) => {
  // to要进入的目标路由;from离开的路由
  //判断是否需要缓存
  if(to.path == from.path ){
    // 让 列表页 即不缓存，刷新
    to.meta.keepAlive = false; 
  }
  if(to.path == '/popularLiterature' && from.path == '/user-center' ){
    to.meta.keepAlive = false; 
  }
  next()
})


export default router
