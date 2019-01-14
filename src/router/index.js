import Vue from 'vue'
import Router from 'vue-router'
import buyPage from '@/views/buyPage.vue'
import sellPage from '@/views/sellPage.vue'
import minePage from '@/views/minePage.vue'
import myPublish from '@/views/myPublish.vue'
import myInfo from '@/views/myInfo.vue'
import myDeal from '@/views/myDeal.vue'
import detailPost from '@/views/detailPost'
import contactWay from '@/views/contactWay.vue'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/mine'
    },
    {
      path: '/buy',
      name: 'buyPage',
      component: buyPage,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/sell',
      name: 'sellPage',
      component: sellPage,
      meta: {
        // requireAuth: true,
        keepAlive: true
      }
    },
    {
      path: '/mine',
      name: 'minePage',
      component: minePage,
      meta: {
        keepAlive: true
      }
    },
    {
      path: "/myDeal",
      name: "myDeal",
      component: myDeal,
      meta: {
        requireAuth: true,
        keepAlive: true
      }
    },
    {
      path: "/myPublish",
      name: "myPublish",
      component: myPublish,
      meta: {
        requireAuth: true,
      }
    },
    {
      path: "/myInfo",
      name: "myInfo",
      component: myInfo,
      meta: {
        requireAuth: true,
        keepAlive: true
      }
    },
    {
      path: "/detailPost",
      name: "detailPost",
      component: detailPost,
      meta: {
        requireAuth: true,
        keepAlive: true
      }
    },
    {
      path: "/contactWay",
      name: "contactWay",
      component: contactWay,
      meta: {
        keepAlive: false
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
      if (localStorage.getItem('jwtToken')) {  // 通过vuex state获取当前的token是否存在
          next();
      }
      else {
          next({
              path: '/mine',
              query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
          })
      }
  }
  else {
      next();
  }
});

export default router
