/* jshint esversion: 8 */ 
// 引入数据库模型
const {User,Customer,Imgupload,Goods} = require('./models')
const express = require('express');
// 安装 jsonwebtoken依赖包 并引入
const jwt = require('jsonwebtoken')
const app = express();

// 跨域访问
const bodyParser = require('body-parser');
// SECRET定义的是一个秘钥
const SECRET = 'ewgfvwergvwsgw5454gsrgvsvsd'
app.use(bodyParser.json({
  limit: '1mb'
}));
app.use(bodyParser.urlencoded({
  limit: '1mb',
  extended: false
}));

// 跨域访问
// const cors = require ("cors");
// app.use(cors());

app.all('*', function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', '*');
        res.header('Access-Control-Allow-Methods', '*');
        res.header('Content-Type', 'application/json;charset=utf-8');
        res.header("Access-Control-Expose-Headers", 'Authorization');
        next();
      });
// 测试接口是否通
app.use(express.json())
app.get('/api/test',async(req,res) =>{
    res.json({
      result:'ok'
    })
})
app.get('/api/user',async(req,res) =>{
    //查询所有用户
    const users = await User.find()
    res.send(users)
})
// 注册
app.post('/api/register',async(req,res) =>{
    const user = await User.create({
        username:req.body.username,
        password:req.body.password
    })
    res.send(user)
})
// 登录
app.post('/api/login',async(req,res) =>{
    const user = await User.findOne({
        username:req.body.username
    })
    if(!user) {
        return res.send({
            message:"用户不存在"
        })
    }
    // 2.用户如果存在，则看密码是否正确
    const isPasswordValid = require('bcryptjs').compareSync(
        req.body.password,
        user.password
    )
    if(!isPasswordValid){
        return res.send({
            message:"密码无效"
        })
    }
    const token = jwt.sign({
        id:String(user._id)
    },SECRET)

    // 生成token
    res.send({
        user,
        token
    })
})


// 校验中间件 验证token
const auth = async(req,res) =>{
    const raw = String(req.headers.authorization).split(' ').pop();
    //获取用户id
    const {id} = jwt.verify(raw,SECRET)
    req.user = await User.findById(id)
}
// 请求用户列表，需要传token验证是否存在。auth就是验证这个token是否存在。
app.get('/api/profile',auth,async(req,res) =>{
    res.send(req.user)
})



// 新增用户
app.post('/api/users', async function(req, res){
    // 获取客户端请求的json数据
    const data = req.body;
    // 插入数据到产品表集合中
    const customer = await Customer.create(data)
    res.send(customer)
  })
// 查询所有用户信息
  app.get('/users', async function(req, res){
    const data = await Customer.find().sort({ _id: -1 })
    res.send(data)
  })
 // 根据id名称查询指定的用户信息
app.get('/getusers/:id', async function(req,res){
    const data= await Customer.findById(req.params.id)
    res.send(data)
  })
  /*
  根据id修改信息
  patch表示部分修改，put表示覆盖
  app.patch();
  */
  app.put('/getusers/update/:id', async function(req,res){
    const product = await Customer.findById(req.params.id);
    // 将客户端传过来的title赋值给用户(赋值不需要异步，因为它只是javascript中的一个内存操作，而查询、保存数据都需要和MongoDB连接需要异步)
    product.name = req.body.name;
    product.phone = req.body.phone;
    product.email = req.body.email;
    product.education = req.body.education;
    product.graduationschool = req.body.graduationschool;
    product.job = req.body.job;
    product.profile = req.body.profile;
    // 保存产品
    await product.save();
    res.send(product);
  })
  // 根据客户端传递的id号删除某个用户
  app.delete('/deleteusers/:id', async function(req, res){
    // 根据客户端传递过来的id从MongoDB数据库中查询对应的产品
    const customer = await Customer.findById(req.params.id);
    // 删除查询到的产品
      await customer.remove();
    // 向客户端发送删除成功的信息
    res.send({
      success: true,
    })
  })


  // 上传图片
  app.post("/uploads/transfer",async function(req, res){
    console.log(111, req.body)
    
    const data={
      "filename" : req.body.filename,
      "filesize" :req.body.filesize,
      "base64" : req.body.base64
    }
    console.log(data)
    const imgupload = await Imgupload.create(data)
    res.send(imgupload)
  }),


  app.post('/cart/upload', async function(req, res){
    // 获取客户端请求的json数据
    const data = req.body
    // 插入数据到产品表集合中
    const imgupload = await Goods.create(data)
    res.send(imgupload)
  })
  // 删除商品
  app.delete('/cartDel/:id', async function(req, res){
    // 根据客户端传递过来的id从MongoDB数据库中查询对应的产品
    const data = await Goods.findById(req.params.id);
    // 删除查询到的产品
      await data.remove();
    // 向客户端发送删除成功的信息
    res.send({
      success: true,
    })
  })

  // 查看商品
  app.get('/goodslist', async function(req, res){
    const data = await Goods.find().sort({ _id: -1 })
    res.send(data)
  })
// 修改商品
app.post("/cartEdit",function(req,res){
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

// 监听端口
app.listen(3001,() =>{
    console.log('http://localhost:3001')
})