import Vue from 'vue'
import Cube from 'cube-ui'
import App from './App.vue'
import router from './router'
import 'amfe-flexible'
import BaiduMap from 'vue-baidu-map'

Vue.use(Cube)
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'lo0Pt3Z9IWXX5YzItCBu62KPcNHkss78'
})
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
