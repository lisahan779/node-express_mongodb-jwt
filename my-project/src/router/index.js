import Vue from 'vue'
import VueRouter from "vue-router"
Vue.use(VueRouter);
const customers = () => import("../components/custom.vue")
const about = () => import("../components/about.vue")
const add = () => import("../components/add.vue")
const detais = () => import("../components/details.vue")
const edit = () => import("../components/edit.vue")
const login = () => import("../components/login.vue")
const register = () => import("../components/register.vue")
const user = () => import("../views/user.vue")
const imgupload = () => import("../components/imgupload.vue")
const alter = () => import("../components/alter.vue")
const router = new VueRouter({
  mode: 'history',
  routes: [{
      path: '/user',
      name: 'user',
      component: user,
      meta: {
        needLogin: true
      },
      children: [{
        path: "/customers",
        name: "customers",
        component: customers,
        // meta:{needLogin: true}
      }]
    },
    {
      path:'/alter',
      component:alter
    },
    {
      path: "/login",
      name: "login",
      component: login,
       meta:{needLogin: true}
    },
    // 重定向
    {
      path: '/',
      redirect: "/login",
    },
    {
      path:"/imgupload",
      component:imgupload
    },
    
    {
      path: "/register",
      name: "register",
      component: register
    },
    {
      path: "/about",
      name: "about",
      component: about,
      meta: {
        needLogin: true
      }

    },
    {
      path: '/add',
      name: "add",
      component: add,
      meta: {
        needLogin: true
      }
    },
    {
      path: '/customer/',
      name: "",
      component: detais,
      meta: {
        needLogin: true
      }
    },
    {
      path: "/edit/:id",
      component: edit,
      meta: {
        needLogin: true
      }
    }
  ]
})
router.beforeEach((to, from, next) => {
  if(to.meta.needLogin){
    let token=window.sessionStorage
      if(!token){
        next('/login')
      }else{
      // alert('session为空，请先登录')
      //如果没有，让页面进入登录页
      next()
      }
      
    }
    else{
      next()
    }
})
export default router;