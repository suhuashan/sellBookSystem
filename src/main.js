// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from './http'
import store from './vuex/store'
import './common/css/iconfont.css'
import { Popup,Toast,Loadmore,InfiniteScroll } from 'mint-ui'

Vue.use(InfiniteScroll);


Vue.prototype.$Toast = Toast;

Vue.component(Popup.name, Popup);
Vue.component(Loadmore.name, Loadmore);

Vue.prototype.$http = axios
Vue.prototype.$store = store;
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  axios,
  store,
  components: { App },
  template: '<App/>'
})
