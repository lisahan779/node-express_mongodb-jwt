const mongoose = require('mongoose');
const Schema = mongoose.Schema;
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
const Goods=mongoose.model("Goods",produtSchema);
module.exports={
    Goods
}