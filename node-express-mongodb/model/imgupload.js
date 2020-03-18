/*
 * @Author: your name
 * @图片数据表
 * @FilePath: /all/node-express-mongodb/model/imgupload.js
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
const Imguploadchema= new mongoose.Schema({
        filename: {type:String},
        filesize: {type:Number},
        base64: {type:String}
    })

const Imgupload=mongoose.model('Imgupload', Imguploadchema)

module.exports ={Imgupload} 

