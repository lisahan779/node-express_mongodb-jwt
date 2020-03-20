/* jshint esversion: 8 */
// 引入数据库模型
const {
    Imgupload
  } = require('../model/imgupload')
  const express = require('express');
  const router=express.Router()
  // 加入图片
  router.post("/uploads/transfer", async function (req, res) {
      const data = {
        filename: req.body.filename,
        filesize: req.body.filesize,
        base64: req.body.base64
      }
      console.log(data)
      const imgupload = await Imgupload.create(data)
      res.send(imgupload)
    })
    module.exports=router;