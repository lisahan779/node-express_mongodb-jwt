const {Customer,Imgupload} = require('../model/customers')
const express = require('express');
const router = express.Router();
// // / 跨域访问
// const bodyParser = require('body-parser');
// app.use(bodyParser.json({
//   limit: '1mb'
// }));
// app.use(bodyParser.urlencoded({
//   limit: '1mb',
//   extended: false
// }));
// app.all('*', function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', '*');
//   res.header('Access-Control-Allow-Methods', '*');
//   res.header('Content-Type', 'application/json;charset=utf-8');
//   res.header("Access-Control-Expose-Headers", 'Authorization');
//   next();
// });
// 新增用户信息
router.post('/api/users', async function (req, res) {
  // 获取客户端请求的json数据
  const data = req.body;
  // 插入数据到产品表集合中
  const customer = await Customer.create(data)
  res.send(customer)
})
// 查询所有产品信息
router.get('/users', async function (req, res) {
  const data = await Customer.find().sort({
    _id: -1
  })
  res.send(data)
})

// 根据id名称查询指定的产品信息
router.get('/getusers/:id', async function (req, res) {
  const data = await Customer.findById(req.params.id)
  res.send(data)
})
/*
根据id修改信息
patch表示部分修改，put表示覆盖
app.patch();
*/
router.put('/getusers/update/:id', async function (req, res) {
  const product = await Customer.findById(req.params.id);
  // 将客户端传过来的title赋值给产品(赋值不需要异步，因为它只是javascript中的一个内存操作，而查询、保存数据都需要和MongoDB连接需要异步)
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
// 根据客户端传递的id号删除某个产品
router.delete('/deleteusers/:id', async function (req, res) {
  // 根据客户端传递过来的id从MongoDB数据库中查询对应的产品
  const customer = await Customer.findById(req.params.id);
  // 删除查询到的产品
  await customer.remove();
  // 向客户端发送删除成功的信息
  res.send({
    success: true,
  })
})
// 图片
router.post("/uploads/transfer", async function (req, res) {
  const data = {
    "filename": req.body.filename,
    "filesize": req.body.filesize,
    "base64": req.body.base64
  }
  console.log(data)
  const imgupload = await Imgupload.create(data)
  res.send(imgupload)
})
module.exports = router;