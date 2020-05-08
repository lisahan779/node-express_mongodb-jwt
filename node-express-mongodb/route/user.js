const {User} = require('../model/user')
const express = require('express');
// 安装 jsonwebtoken依赖包 并引入
const jwt = require('jsonwebtoken')
// SECRET定义的是一个秘钥
const SECRET = 'ewgfvwergvwsgw5454gsrgvsvsd'
const app = express();
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    res.header("Access-Control-Expose-Headers", 'Authorization');
    next();
  });
  app.use(express.json())
app.get('/api/test', async (req, res) => {
  res.json({
    result: 'ok'
  })
})

app.get('/api/user', async (req, res) => {
  //查询所有用户
  const users = await User.find()
  res.send(users)
})

app.post('/api/register', async (req, res) => {
    const data = {
      username: req.body.username,
      password: req.body.password,
      userId: req.body.userId,
    }
    const users = await User.findOne({
      username: req.body.username
    })
    if (users) {
      return res.status(400).send({
        message: "用户已存在"
      })
    } 
      const user = await User.create(data)
      res.json({
        status:'200',
        msg:"注册成功",
        result:user
      })
  })
  // 登录
  app.post('/api/login', async (req, res) => {
    const user = await User.findOne({
      username: req.body.username
    })
    if (!user) {
      return res.status(422).send({
        message: "用户不存在"
      })
    }
    // 2.用户如果存在，则看密码是否正确
    // compareSync 同步比较
    const isPasswordValid = require('bcryptjs').compareSync(
      req.body.password,
      user.password
    )
    if (!isPasswordValid) {
      return res.send({
        message: "密码无效"
      })
    }
    // 验证token，使用对象进行操作user._id是对象形式，转换成string
    const token = jwt.sign({
      id: String(user._id)
    }, SECRET)
  
    // 生成token
    res.send({
      user,
      token
    })
  })
  // 校验中间件 验证token
  const auth = async (req, res) => {
    // 把请求头通过空格进行分割然后推出来得到token
    const raw = String(req.headers.authorization).split(' ').pop();
    //获取用户id 解构赋值
    const {
      id
    } = jwt.verify(raw, SECRET)
    req.user = await User.findById(id)
  }
  // 请求用户列表，需要传token验证是否存在。auth就是验证这个token是否存在。
  app.get('/api/profile', auth, async (req, res) => {
    res.send(req.user)
  })
// 监听端口
app.listen(3001, () => {
    console.log('http://localhost:3001')
  })