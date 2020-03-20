/*
 * @Author: your name
 * 用户信息表
 * @FilePath: /all/node-express-mongodb/model/customers.js
 */
const {mongodb} = require("./almodel")
// / 创建用户信息Schema
const Customersschema = new mongodb.Schema({
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
const Customer = mongodb.model('Customers', Customersschema)
const Imgupload = mongodb.model('Imgupload', Imguploadchema)

module.exports = {Customer,Imgupload}