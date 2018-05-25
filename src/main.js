// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueLazyLoad from 'vue-lazyload'  //引入懒加载图片
import 'common/stylus/index.styl'
Vue.config.productionTip = false
Vue.use(VueLazyLoad, {
  loading: require('./common/image/loading.gif')
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
