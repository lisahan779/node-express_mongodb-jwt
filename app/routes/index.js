var express = require('express');
var router = express.Router();
const {
  Goods
} = require('../model/index')
/* GET home page. */
router.get('/', function (req, res, next) {
      Goods.find({}, function (err, doc) {
        if (err) {
          res.json({
            status: "1",
            msg: err.message
          })
        } else {
          res.json({
            status: "1",
            msg: '',
            result: {
              count: doc.length,
              list:doc
            }
          })
        }
      })
    })
      module.exports = router;