



const {Goods} = require('../model/shopping')
const express = require('express');
const router = express.Router();
// const app = express();
// app.use(express.json())
//  // 跨域访问
//  const bodyParser = require('body-parser');
//  // SECRET定义的是一个秘钥
//  app.use(bodyParser.json({
//    limit: '1mb'
//  }));
//  app.use(bodyParser.urlencoded({
//    limit: '1mb',
//    extended: false
//  }));
//  app.all('*', function (req, res, next) {
//    res.header('Access-Control-Allow-Origin', '*');
//    res.header('Access-Control-Allow-Headers', '*');
//    res.header('Access-Control-Allow-Methods', '*');
//    res.header('Content-Type', 'application/json;charset=utf-8');
//    res.header("Access-Control-Expose-Headers", 'Authorization');
//    next();
//  });
 // 增加商品信息Z
 router.post('/cart/upload', async function(req, res){
    // 获取客户端请求的json数据
    const data = req.body
    // 插入数据到产品表集合中
    const imgupload = await Goods.create(data)
    res.send(imgupload)
  })
// 查询当前用户的购物车数据
// app.get('/cartList',function(req,res,next){
//     var userId = req.params.userId;
//     Goods.findOne({userId:userId},function(err,doc){
//         if(err){
//             res.json({
//                 status:'1',
//                 msg:err.message,
//                 result:''
//             });
//         }else{
//             if(doc){
//                 res.json({
//                     status:'0',
//                     msg:'',
//                     result:doc.cartList
//                 })
//             }
//         }
//     })
// })
router.get('/goodslist', async function(req, res){
    const data = await Goods.find().sort({ _id: -1 })
    res.send(data)
  })
// 修改商品
router.post("/cartEdit",function(req,res){
    // var userId = req.cookies.userId,
        productId = req.body.productId,
        productNum = req.body.productNum,
        checked = req.body.checked;
        Goods.updateMany({ // 查询条件
        // "userId":userId,
        "productId":productId
    },{ // 修改的数据
        "productNum":productNum,
        "checked":checked
    },function(err,doc){
        if(err){
          res.json({
            status:'1',
            msg:err.message,
            result:''
          });
        }else{
          res.json({
            status:'0',
            msg:'',
            result:'suc'
          });
        }
    });
})
// 删除
router.post('/cartDel',function(req,res,next){
    var userId = req.cookies.userId,productId = req.body.productId;
    Goods.update({
        // userId:userId
    },{
        $pull:{
            'cartList':{
                'productId':productId
            }
        }
    },function(err,doc){
        if(err){
            res.json({
                status:'1',
                msg:err.message,
                result:''
            });
        }else{
            res.json({
                status:'0',
                msg:'',
                result:'suc'
            });
        }
    })
});
module.exports = router;