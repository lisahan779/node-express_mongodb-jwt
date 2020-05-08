const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema=new Schema({
    phone:{
        type:Number,
        require:[true,"字段不能为空"] //判断是否传入字段了
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
const User=mongoose.model("User",userSchema);
module.exports={
    User
}