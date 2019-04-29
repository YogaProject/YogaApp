import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/layout/LoginPage'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('./components/layout/RegistPage.vue')
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('./components/layout/MainPage.vue'),
      children: [
        {
          path: 'newsPage',
          name: 'newsPage',
          component: () => import('./components/panelPage/NewsPage.vue')
        },
        {
          path: 'coachPage',
          name: 'coachPage',
          component: () => import('./components/panelPage/CoachPage.vue')
        },
        {
          path: 'venuePage',
          name: 'venuePage',
          component: () => import('./components/panelPage/VenuePage.vue')
        },
        {
          path: 'mePage',
          name: 'mePage',
          component: () => import('./components/panelPage/MePage.vue')
        }]
    },
    {
      path: '/addnews',
      name: 'addnews',
      component: () => import('./components/newsPage/addNewsPage.vue')
    },
    {
      path: '/newsDetail',
      name: 'newsDetail',
      component: () => import('./components/newsPage/NewsDetail.vue')
    },
    {
      path: '/personalPage',
      name: 'personalPage',
      component: () => import('./components/common/PersonalPage.vue')
    },
    {
      path: '/comment',
      name: 'comment',
      component: () => import('./components/common/CommentPage.vue')
    },
    {
      path: '/follow',
      name: 'follow',
      component: () => import('./components/mePage/FollowList.vue')
    },
    {
      path: '/follower',
      name: 'follower',
      component: () => import('./components/mePage/FollowerList.vue')
    },
    {
      path: '/course',
      name: 'course',
      component: () => import('./components/mePage/coursePage/Course.vue')
    },
    {
      path: '/addcourse',
      name: 'addcourse',
      component: () => import('./components/mePage/coursePage/AddMyCourse.vue')
    },
    {
      path: '/purse',
      name: 'purse',
      component: () => import('./components/mePage/PursePage.vue')
    },
    {
      path: '/mynews',
      name: 'mynews',
      component: () => import('./components/mePage/MyNews.vue')
    },
    {
      path: '/coachorder',
      name: 'coachorder',
      component: () => import('./components/mePage/CoachOrder.vue')
    },
    {
      path: '/comments',
      name: 'comments',
      component: () => import('./components/mePage/Comments.vue')
    },
    {
      path: '/myvenue',
      name: 'myvenue',
      component: () => import('./components/mePage/MyVenuePage.vue')
    },
    {
      path: '/venuedetail',
      name: 'venuedetail',
      component: () => import('./components/venuePage/VenueDetail.vue')
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('./components/mePage/Settings.vue')
    },
    {
      path: '/personal',
      name: 'personal',
      component: () => import('./components/mePage/settings/PersonalInfo.vue')
    },
    {
      path: '/permissions',
      name: 'permissions',
      component: () => import('./components/mePage/settings/Permissions.vue')
    },
    {
      path: '/binding',
      name: 'binding',
      component: () => import('./components/mePage/settings/BindingPhone.vue')
    },
    {
      path: '/deposit',
      name: 'deposit',
      component: () => import('./components/mePage/pursePage/Deposit.vue')
    },
    {
      path: '/withdraw',
      name: 'withdraw',
      component: () => import('./components/mePage/pursePage/Withdraw.vue')
    }, {
      path: '/coupons',
      name: 'coupons',
      component: () => import('./components/mePage/pursePage/Coupons.vue')
    },
    {
      path: '/depositLog',
      name: 'depositLog',
      component: () => import('./components/mePage/pursePage/DepositLog.vue')
    }
  ]
})
