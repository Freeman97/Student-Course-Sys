var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.session.user);
  if(req.session.user == undefined && req.session.admin == undefined) {
    req.flash('flash_error', '未登录')
    return res.redirect('/login');
  } else if(req.session.admin != undefined) {
    return res.redirect('/admin');
  }
  res.render('index', { title: '首页' });
});

module.exports = router;
