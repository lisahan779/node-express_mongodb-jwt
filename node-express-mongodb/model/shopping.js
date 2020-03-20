/*
 * @Author: your name
 * 购物车表
 * @FilePath: /all/node-express-mongodb/model/shopping.js
 */
const mongoose=require("./almodel")
var produtSchema = new mongoose.Schema({
    'productId':String,
    'productName':String,
    'salePrice':Number,
    'productImage':String,
     // 添加的属性
     "checked":String,
     "productNum":Number
 })

const Goods= mongoose.model('good',produtSchema);

module.exports ={Goods}