import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import App from './App.vue'
import MainPage from './components/MainPage.vue'
import store from './store.js'

Vue.use(VueRouter)
Vue.use(VueAxios, axios)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.config.productionTip = false

const routes = [
  { path: '/', component: MainPage }
]

const router = new VueRouter({
  routes
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
