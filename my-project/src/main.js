import Vue from 'vue'
import App from './App.vue'

import Myhttpserver from './plugin/http'
import router from './router'

Vue.config.productionTip = false
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/basic.css' 
import VuePreview from 'vue-preview';
import Mint from 'mint-ui'
import 'mint-ui/lib/style.min.css'
import Vuex from 'vuex'
import store from "./store"
import formValidation from "../src/config/formValidation"  //导入js所在文件夹
import vuelazyload from 'vue-lazyload'
// 无限滚动
import infiniteScroll from 'vue-infinite-scroll'
Vue.use(infiniteScroll)
 
Vue.prototype.formValidation=formValidation; //挂载到原型上
Vue.use(VuePreview)
Vue.use(ElementUI);
Vue.use(Mint)
Vue.use(Vuex) 
// 以插件的形式使用案axios
Vue.use(Myhttpserver);
Vue.use(vuelazyload,{
  loading:'assets/img/q.jpg',

  })
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
