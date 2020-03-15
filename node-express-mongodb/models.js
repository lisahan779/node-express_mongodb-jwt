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
// 创建用户Schema
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique:true //字段是否唯一s
    },
    password: {
        type: String,
        set(val) {
            // 通过bcryptjs对密码加密返回值 第一个值返回值， 第二个密码强度
            return require('bcryptjs').hashSync(val, 10)
        }
    }
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
    id:Number

})
// 定义user表
const User = mongoose.model('User', UserSchema)
// 产品Customers表
const Customer = mongoose.model('Customers', Customersschema)
// 全部删除
// User.db.dropCollection('users')
module.exports = {
    User,
    Customer
}