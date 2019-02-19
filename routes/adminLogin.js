var express = require('express');
var router = express.Router();
var Administrator = require('../administrator.js');
var crypto = require('crypto');

router.post('/', function(req, res, next) {
  // if is login
  var md5 = crypto.createHash('md5');
  if(req.body.studentId != undefined) {
    // administrator login
    var password = md5.update(req.body.studentPw).digest('base64');
    Administrator.get(req.body.studentId, function(err, results) {
      if (results.length == 0) {
        console.log('no administrator');
        req.flash('flash_error', '无此用户');
        return res.redirect('/login');
      }
      if (results[0].adminPw != password) {
        console.log('wrong administrator password');
        req.flash('flash_error', '密码错误');
        return res.redirect('/login');
      }
      req.session.admin = new Administrator(results[0]);
      console.log(req.session.admin);
      req.flash('flash_success', '管理员账号: ' + req.body.studentId + ' 登录成功');
      return res.redirect('/admin');
    })
  }
});

module.exports = router;