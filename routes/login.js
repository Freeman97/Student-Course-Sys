var express = require('express');
var router = express.Router();
var User = require('../user.js');
var Administrator = require('../administrator.js');
var crypto = require('crypto');
/* GET login page. */
router.get('/', function(req, res, next) {
  console.log(req.session.user);
  if (req.session.user != undefined) {
    req.flash('flash_error', '已登录');
    return res.redirect('/');
  } else if (req.session.admin != undefined) {
    req.flash('flash_error', '已登录');
    return res.redirect('/admin');
  }
  res.render('login');
});

router.post('/', function(req, res, next) {
  // if is login
  var md5 = crypto.createHash('md5');
  if(req.body.studentId != undefined) {
    // normal user login
    var password = md5.update(req.body.studentPw).digest('base64');
    User.get(req.body.studentId, function(err, results) {
      if (results.length == 0) {
        console.log('no user');
        req.flash('flash_error', '无此用户');
        return res.redirect('/login');
      }
      if (results[0].studentPw != password) {
        console.log('wrong password');
        req.flash('flash_error', '密码错误');
        return res.redirect('/login');
      }
      // console.log(req);
      console.log(req.session);
      req.session.user = new User(results[0]);
      console.log(req.session.user);
      req.flash('flash_success', '登陆成功')
      res.redirect('/');
    });
  } 
});

module.exports = router;