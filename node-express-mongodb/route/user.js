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

// 注册
app.post('/api/register', async (req, res) => {
  const user = await User.create({
    username: req.body.username,
    password: req.body.password
  })
  res.send(user)
})
// 登录
app.post('/api/login', async (req, res) => {
  const user = await User.findOne({
    username: req.body.username
  })
  if (!user) {
    return res.send({
      message: "用户不存在"
    })
  }
  // 2.用户如果存在，则看密码是否正确
  const isPasswordValid = require('bcryptjs').compareSync(
    req.body.password,
    user.password
  )
  if (!isPasswordValid) {
    return res.send({
      message: "密码无效"
    })
  }
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
  const raw = String(req.headers.authorization).split(' ').pop();
  //获取用户id
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