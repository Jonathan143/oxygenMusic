import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store'
import 'normalize.css'
import '@/assets/styles/glob.styl'
import Axios from 'axios'
import VueLazyload from 'vue-lazyload'
import APlayer from '@moefe/vue-aplayer'
Vue.use(APlayer, {
  defaultCover:
    'https://img-1256555015.file.myqcloud.com/navigation/webicon/aplyer.png',
  productionTip: false
})

// Axios.defaults.baseURL = "https://api.yang143.cn/";
Axios.defaults.baseURL = 'http://api.hejinkang.cn/'
Axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded'
Axios.withCredentials = true
Vue.prototype.axios = Axios
Vue.config.productionTip = false

Vue.use(VueLazyload, {
  error: require('./assets/images/error.jpg'),
  loading: require('./assets/images/loading.gif')
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
