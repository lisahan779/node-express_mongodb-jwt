const mongoose = require('mongoose')
// 链接数据库
mongoose.connect('mongodb://localhost:27019/user', {
    useCreateIndex: true,
    useNewUrlParser: true
})
mongoose.connection.on("connected",function(){
    console.log("MongoDB connected successful")
})
mongoose.connection.on("error",function(){
    console.log("MongoDB connected fail")
})
mongoose.connection.on("disconnected",function(){
    console.log("MongoDB disconnected")
})
module.exports=mongoose