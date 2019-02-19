var express = require('express');
var User = require('../user.js');
var router = express.Router();
/* GET choosecourse page. */
router.get('/', function(req, res, next) {
  // console.log(req.session.user);
  if(req.session.user == undefined) {
    req.flash('flash_error', '未登录');
    return res.redirect('/login');
  }
  var user = new User(req.session.user);
  user.queryCourse(function(err, results) {    
    console.log(err);
    user.queryChosenCourse(function(err, results2) {
      // console.log(err);
      res.render('chooseCourse', { title: '课程选择', course: results, chosenCourse: results2 });
    });
  });
});



/* handle choose course request */
router.post('/', function(req, res, next) {
  if(req.session.user == undefined) {
    req.flash('flash_error', '未登录');
    return res.redirect('/login');
  }
  var user = new User(req.session.user);
  user.chooseCourse(req.body.courseId, req.body.teacherId, function(err, results) {
    console.log(err);
    // console.log(results);
    if (err == null)
    {
      req.flash('flash_success', '选课成功');
      res.send('Success');
    } else {
      req.flash('flash_error', err);
      res.send('failed');
    }
  });
});

module.exports = router;