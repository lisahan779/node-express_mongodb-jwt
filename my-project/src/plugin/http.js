// 将axios转化成使用vue.use的形式引用
const Myhttpserver = {}
import axios from 'axios'
Myhttpserver.install = (Vue) => {
  // 4.反向代理
  axios.defaults.baseURL = "http://localhost:3001"
  Vue.prototype.$http = axios
  axios.defaults.headers.common['token'] = sessionStorage.token;
  axios.defaults.headers.post['Content-Type'] = 'application/json';
  axios.defaults.headers.put['Content-Type'] = 'application/json';
  // 添加请求拦截器
  axios.interceptors.request.use( (config)=> {
    config.headers.token = sessionStorage.token;
    // console.info(sessionStorage.token);
    return config;
  }, function (error) {
    return Promise.reject(error);
  });
  // 响应拦截
  axios.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      if (error.response.status === 401) {
       //输出授权失败错误信息
      } else {
       //输出其他错误信息
      }
      return Promise.reject(error);
    }
  );
}
export default Myhttpserver