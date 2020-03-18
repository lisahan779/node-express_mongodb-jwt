/* jshint esversion: 8 */
// 引入数据库模型
const {
    Imgupload
  } = require('../model/imgupload')
  const express = require('express');
  // 安装 jsonwebtoken依赖包 并引入
  // const jwt = require('jsonwebtoken')
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
  app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    res.header("Access-Control-Expose-Headers", 'Authorization');
    next();
  });
 
  // 加入图片
  app.post("/uploads/transfer", async function (req, res) {
      console.log(111, req.body)
      const data = {
        "filename": req.body.filename,
        "filesize": req.body.filesize,
        "base64": req.body.base64
      }
      console.log(data)
      const imgupload = await Imgupload.create(data)
      res.send(imgupload)
    }),

  // 监听端口
  app.listen(3001, () => {
    console.log('http://localhost:3001')
  })