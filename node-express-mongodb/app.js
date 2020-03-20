const express = require('express');
const app = express();
const customes = require("./route/customers")
const shopping = require("./route/shopping")

// 跨域访问
const bodyParser = require('body-parser');
app.use(bodyParser.json({
  limit: '1mb'
}));
app.use(bodyParser.urlencoded({
  limit: '1mb',
  extended: false
}));
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
app.use("api",customes);
app.use(shopping);
// 监听端口
app.listen(3001, () => {
  console.log('http://localhost:3001')
})