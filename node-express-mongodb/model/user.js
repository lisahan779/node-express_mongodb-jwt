/*
 * @Author: Lisa
 * 注册用户表
 * @FilePath: /all/node-express-mongodb/model/user.js
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
// 创建用户Schema
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    password: {
        type: String,
        unique: true, //字段是否唯一
        set(val) {
            // 通过bcryptjs对密码加密返回值 第一个值返回值， 第二个密码强度
            return require('bcryptjs').hashSync(val, 10)
        }
    }
})
// 定义user表
const User = mongoose.model('User', UserSchema)
module.exports = {User}