import { BASEURL } from './copnfig'
// 获取商品
const CARTURL = `${BASEURL}/goodslist`
// 增加商品
const ADDCARTURL = `${BASEURL}/cart/upload`

export default {
  /**
     * 获取店铺的信息
     * 采用同步方法发送后端请求
     */
  async getCartInfoByUserId () {
    // 通过fetch获取数据
    let res = await fetch(CARTURL)
    let data = await res.json()
    return data
  },
  // 异步获取
//   getCartInfoByUserId(cb){
//     fetch(CARTURL).then(res=>{
//         res.json().then(cb)
//     })
// }
  /**
   * 添加店铺的商品到购物车
   * @param name
   * @param pid
   * @returns {Promise<void>}
   */
  async addCart () {
    let res = await fetch(`${ADDCARTURL}`,{
    productId:"fjn",
    productName:"哈哈",
    salePrice:233,
    productImage:"decs",
     // 添加的属性
     checked:false,
     productNum:13
    })
    let data = await res.json()
    return data
  }

}
