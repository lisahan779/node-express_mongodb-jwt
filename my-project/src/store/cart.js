
import cartApi from '../api/cat'

// 执行顺序
// actions:获得前台组件发来的存数据指令,告诉mutations,
// mutations操作数据保存到state中,getters拿到state中的值返回给组件
var INITCART = 'INITCART'
export default {
state: {
cartInfo: []
},
// 对数据进行操作将他赋给state仓库
mutations: {
'INIT': (state, data) => {
console.log('#3 mutations: init')
state.cartInfo = data
}
},
actions: {
// [INITCART]是一个变量 ,和上面的INT一样，由外面导入，commit是解构赋值,
[INITCART]: async ({ commit }) => {
// 从api的方法中拿到数据
let data = await cartApi.getCartInfoByUserId()
console.log('#2 actions: data')
// 用commit方法调用mutation中的INIT方法
commit('INIT', data)
}
},
// 拿数据把他绑定到需要的组件中
getters: {
// { cartInfo }这种写法是解构赋值,相当于state.cartInfo获取state里的cartInfo
'GETCART': ({ cartInfo }) => {
return cartInfo
}
}
}
