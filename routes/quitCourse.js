var express = require('express');
var User = require('../user.js');
var router = express.Router();

/* handle quit course request */
router.post('/', function(req, res, next) {
  if(req.session.user == undefined) {
    req.flash('flash_error', '未登录');
    return res.redirect('/login');
  }
  var user = new User(req.session.user);
  user.quitCourse(req.body.courseId, req.body.teacherId, function(err, results) {
    console.log(err);
    // console.log(results);
    if (err == null)
    {
      req.flash('flash_success', '退选成功');
      res.send('Success');
    } else {
      req.flash('flash_error', err);
      res.send('failed');
    }
  });
});

module.exports = router;