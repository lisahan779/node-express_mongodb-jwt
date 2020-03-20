/*
 * @Author: your name
 * @图片数据表
 * @FilePath: /all/node-express-mongodb/model/imgupload.js
 */

const mongoose=require("./almodel")
const Imguploadchema= new mongoose.Schema({
        filename: {type:String},
        filesize: {type:Number},
        base64: {type:String}
    })
const Imgupload=mongoose.model('Imgupload', Imguploadchema)

module.exports =Imgupload

