var express = require('express');
var router = express.Router();

const {User} = require('../model/user')

const jwt = require('jsonwebtoken')

const SECRET = "lisa"
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
// 测试接口是否正确
router.get('/api', (req, res) => res.send('Hello World!'))
// 获取所有注册人员信息
router.get('/users', async(req, res) => {
  const users = await User.find()
  res.send(users)
})
// 注册
router.post('/register', async (req, res) => {
  const user = await User.create({
    phone: req.body.phone,
    password: req.body.password,
  })
  res.send(user)
})
// 登陆后生成token
router.post('/login', async (req, res) => {
  // res.send('login')
  // 1.看用户是否存在
  const user = await User.findOne({
    phone: req.body.phone
  })
  if (!user) {
    return res.status(422).send({
      message: '用户名不存在'
    })
  }
  // 2.用户如果存在，则看密码是否正确
  const isPasswordValid = require('bcryptjs').compareSync(
    req.body.password,
    user.password
    )
    if(!isPasswordValid) {
      // 密码无效
      return res.status(422).send({
        message: '密码无效'
      })
    }
  // 生成token
  const token = 'Bearer '+ jwt.sign({
    id: String(user._id),
    admin:"login"
  }, SECRET,{
    expiresIn: 300 // 过期时间  3600 * 24 * 3。expiresIn: "10 days"
  })
  res.send({
    user,
    token
  })
})

// 中间件：验证授权
const auth = async (req, res, next) => {
   // 获取客户端请求头的token
   const rawToken = String(req.headers.authorization).split(' ').pop()
   if(!rawToken){
     res.send({
       status:400,
       msg:"错误"
     })
   }
   const tokenData = jwt.verify(rawToken, SECRET)

  //  console.log(tokenData)
   // 获取用户id
   const id = tokenData.id;
  //  const user = await User.findById(id)
  req.user = await User.findById(id)
  next()
}

router.get('/api/profile', auth, async (req, res) => {
  res.send(req.user)
})

module.exports = router;
