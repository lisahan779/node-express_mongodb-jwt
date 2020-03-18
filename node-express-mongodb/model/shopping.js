/*
 * @Author: your name
 * 购物车表
 * @FilePath: /all/node-express-mongodb/model/shopping.js
 */
const mongoose = require('mongoose')
// 链接数据库
mongoose.connect('mongodb://localhost:27018/demo', {
    useCreateIndex: true,
    useNewUrlParser: true
}, function (erro, success) {
    if (erro) {
        console.log("数据库连接失败")
    } else {
        console.log("数据库连接成功")
    }
})
const Shoppingchema = new mongoose.Schema({
    url: {
        type: String
    },
    price: {
        type: Number
    },
    title: {
        type: String
    },
    num: {
        type: Number
    },
    checked:{
        type:Boolean
    }
})

const Shopping = mongoose.model('Shopping', Shoppingchema)

module.exports =Shopping