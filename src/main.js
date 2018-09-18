// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import IView from 'iview'; //Iview
import 'iview/dist/styles/iview.css'; // 使用 IVIEW CSS
import store from './store/index'
import Vuex from 'vuex'
import './assets/less/common/common.less'; // 定制公共 less
import Toast from './libs/toast/'
import router from './router'
import {checkLoginOrNot} from "./api/api"
import VueClipboard from 'vue-clipboard2'


Vue.config.productionTip = false
Vue.use(IView);
Vue.use(Toast);
Vue.use(VueClipboard)

router.beforeEach((to, from, next) => {
  var loginParams = {};
  let _this = this;
  if (to.path == '/login'){
    next();
  }
  if (!sessionStorage.getItem('USER') || sessionStorage.getItem('USER') === 'null'){
    next({ path: '/login' });
  }
  checkLoginOrNot(loginParams).then(data => {
    if (data.success == 'FAILED'){
      next({ path: '/login' });
    }else {
      next();
    }
  });
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router, 
  store,
  template: '<App/>',
  components: { App }
})
