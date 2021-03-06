import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store'
import 'normalize.css'
import '@/assets/styles/glob.styl'
import api from '@/api'
import VueLazyload from 'vue-lazyload'
import APlayer from '@moefe/vue-aplayer'
Vue.use(APlayer, {
  defaultCover:
    'https://img-1256555015.file.myqcloud.com/navigation/webicon/aplyer.png',
  productionTip: false
})

Vue.prototype.axios = api
Vue.config.productionTip = false

Vue.use(VueLazyload, {
  error:
    'https://img-1256555015.file.myqcloud.com/2019/03/05/5c7e6b9e43d27.jpg',
  loading:
    'https://img-1256555015.file.myqcloud.com/2019/03/05/5c7e6b9e9befa.gif'
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
