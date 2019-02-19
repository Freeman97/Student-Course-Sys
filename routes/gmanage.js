var express = require('express');
var Administrator = require('../Administrator.js');
var router = express.Router();

/* GET checkgrade page. */
router.get('/', function(req, res, next) {
  console.log(req.session.admin);
  if(req.session.admin == undefined) {
    req.flash('flash_error', '未登录');
    return res.redirect('/login');
  }
  Administrator.getSTC(function(err, results) {
    if(err != undefined) {
      console.log(err);
      req.flash('flash_err', err);
    }
    res.render('gmanage', { title: '成绩登记', grade: results });
  });
});

router.post('/deleteScore', function(req, res, next) {
  if(req.session.admin == undefined) {
    req.flash('flash_error', '未登录');
    return res.redirect('/login');
  }
  Administrator.deleteSTC(req.body.courseId, req.body.studentId, req.body.teacherId, function(err, results) {
    if (err != undefined) {
      console.log(err);
      req.flash('flash_error', err);
      return res.send('failed');
    }
    req.flash('flash_success', '删除成功');
    return res.send('success');
  });
})

router.post('/updateScore', function(req, res, next) {
  if(req.session.admin == undefined) {
    req.flash('flash_error', '未登录');
    return res.redirect('/login');
  }
  Administrator.updateSTC(req.body.mcourseId, req.body.mstudentId, req.body.mteacherId, req.body.score, function(err, results) {
    if (err != undefined) {
      console.log(err);
      req.flash('flash_error', err);
      return res.redirect('/gmanage');
    }
    req.flash('flash_success', '修改成功');
    return res.redirect('/gmanage');
  })
})


module.exports = router;