// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index.js'
import BootstrapVue from 'bootstrap-vue'
import './assets/css/style.css'
import auth from './lib/vendor/auth0/auth.js'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'


Vue.config.productionTip = false


Vue.use(BootstrapVue)
Vue.use(auth)
Vue.use(ElementUI)


export const bus = new Vue()
//router.beforeEach(Vue.prototype.$auth.authRedirectGuard())

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  render: h => h(App) // <-- that one
  //template: '<App/>'
})
