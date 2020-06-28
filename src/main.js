import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import './utils/rem'
import { Message } from "element-ui"

Vue.config.productionTip = false
Vue.prototype.$message = Message

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
