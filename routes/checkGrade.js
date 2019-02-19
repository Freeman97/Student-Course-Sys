var express = require('express');
var User = require('../user.js');
var router = express.Router();

/* GET checkgrade page. */
router.get('/', function(req, res, next) {
  console.log(req.session.user);
  if(req.session.user == undefined) {
    req.flash('flash_error', '未登录');
    return res.redirect('/login');
  }
  var user = new User(req.session.user);
  user.queryCourseScore(function(err, results) {
    console.log(err);
    res.render('checkGrade', { title: '成绩查询', results: results });
  });
});

module.exports = router;