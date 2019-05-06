import Vue from 'vue'
import Cube from 'cube-ui'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import store from './vuex/store'
import 'amfe-flexible'
import BaiduMap from 'vue-baidu-map'
import { post, fetch, patch, put } from './utils/http'

Vue.use(axios)
Vue.use(Cube)
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'lo0Pt3Z9IWXX5YzItCBu62KPcNHkss78'
})
Vue.config.productionTip = false
Vue.prototype.$post = post
Vue.prototype.$fetch = fetch
Vue.prototype.$patch = patch
Vue.prototype.$put = put
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
