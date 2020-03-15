// 将axios转化成使用vue.use的形式引用
const Myhttpserver={}
import axios from 'axios'
Myhttpserver.install = (Vue)=> {
    // 4. 添加实例方法
    axios.defaults.baseURL="http://localhost:3001"
    Vue.prototype.$http = axios
    axios.defaults.headers.common['token'] =sessionStorage.token;
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.defaults.headers.put['Content-Type'] = 'application/json';
    // 添加请求拦截器
axios.interceptors.request.use(function(config) {
    config.headers.token =sessionStorage.token;
    console.info(sessionStorage.token);
    return config;
  }, function(error) {
    return Promise.reject(error);
  });
  
    }
   

    export default Myhttpserver 
  