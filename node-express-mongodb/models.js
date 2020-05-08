/*
 * @Author: your name
 * @Date: 2020-03-11 15:40:41
 * @LastEditTime: 2020-03-18 13:47:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /all/node-express-mongodb/models.js
 */
const mongoose = require('mongoose')
// 链接数据库
mongoose.connect('mongodb://localhost:27018/demo', {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true
})
mongoose.connection.on("connected", function () {
    console.log("MongoDB connected successful")
})
mongoose.connection.on("error", function () {
    console.log("MongoDB connected fail")
})
mongoose.connection.on("disconnected", function () {
    console.log("MongoDB disconnected")
})
// 创建用户Schema集合
const UserSchema = new mongoose.Schema({
    userId: String,
    username: String,
    password: {
        type: String,
        unique: true, //字段是否唯一
        set(val) {
            // 对密码进行散列
            // 通过bcryptjs对密码加密返回值 第一个值返回值， 第二个密码强度
            return require('bcryptjs').hashSync(val, 10)
        }
    },
    orderList: Array,
    cartLisr: [{
        productId: String,
        productName: String,
        salePrice: String,
        productImage: String,
        checked: Boolean,
        productNum: String
    }],
    "addressList": Array

})
// 创建用户信息Schema
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
// 商品
var produtSchema = new mongoose.Schema({
    productId: {
        type: String
    },
    productName: {
        type: String
    },
    salePrice: {
        type: Number
    },
    productImage: {
        type: String
    },
    // 添加的属性
    checked: {
        type: Boolean
    },
    productNum: {
        type: Number
    }
})
const Imguploadchema = new mongoose.Schema({
    filename: {
        type: String
    },
    filesize: {
        type: Number
    },
    base64: {
        type: String
    }
})

// 定义user表
const User = mongoose.model('User', UserSchema)
// 产品Customers表
const Customer = mongoose.model('Customers', Customersschema)
// 全部删除
// User.db.dropCollection('users')

const Imgupload = mongoose.model('Imgupload', Imguploadchema)
const Goods = mongoose.model('good', produtSchema);
module.exports = {
    User,
    Customer,
    Goods,
    Imgupload
}