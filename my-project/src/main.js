import Vue from 'vue'
import App from './App.vue'
import Myhttpserver from './plugin/http'
import router from './router'
Vue.config.productionTip = false
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/basic.css' 
// 事件总线
Vue.prototype.bus=new Vue()
// 正则验证封装引入
import formValidation from "../src/config/formValidation"  //导入js所在文件夹
Vue.prototype.formValidation=formValidation; //挂载到原型上
Vue.use(ElementUI);
// 以插件的形式使用案axios
Vue.use(Myhttpserver);
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
