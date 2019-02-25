var express = require('express');
var router = express.Router();
var User = require('../user.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.user == undefined && req.session.admin == undefined) {
    req.flash('flash_error', '未登录')
    return res.redirect('/login');
  } else if(req.session.admin != undefined) {
    return res.redirect('/admin');
  }
  User.get(req.session.user.studentId, function(err, results) {
    if(err != null)
    {
      req.flash('flash_error', err.Code);
      return res.redirect('/');
    }
    console.log(results);
    return res.render('index', { title: '首页', user: results[0]});
  });
});

router.post('/updatePersonal', function(req, res, next) {
  if(req.session.user == undefined && req.session.admin == undefined) {
    req.flash('flash_error', '未登录')
    return res.redirect('/login');
  }
  var currentUser = new User(req.session.user);
  currentUser.updatePersonal(req.body, function(err, results) {
    if(err != null)
    {
      req.flash('flash_error', err.Code);
      return res.redirect('/');
    }
    if(req.body.studentPw == '')
    {
      req.flash('flash_success', '修改个人信息成功');
      return res.redirect('/');
    }
    else
    {
      req.flash('flash_success', '修改个人信息成功, 由于您修改了密码, 请重新登录');
      req.session.user = null;
      return res.redirect('/login');
    }
  });
})

module.exports = router;
