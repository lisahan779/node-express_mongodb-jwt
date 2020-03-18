/*
 * @Author: your name
 * 用户信息表
 * @FilePath: /all/node-express-mongodb/model/customers.js
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
// / 创建用户信息Schema
const Customersschema = new mongoose.Schema({
    name: {
        type: String
    },
    phone: {
        type: Number
    },
    email: {
        type: String
    },
    education: {
        type: String
    },
    graduationschool: {
        type: String
    },
    job: {
        type: String
    },
    profile: {
        type: String
    },
    id: Number

})

// 产品Customers表
const Customer = mongoose.model('Customers', Customersschema)

module.exports = {Customer}

