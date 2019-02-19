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
  Administrator.getStudent(function(err, results) {
    if(err != undefined) {
      console.log(err);
      req.flash('flash_err', err);
    }
    res.render('smanage', { title: '管理学生信息', student: results });
  });
});

router.post('/addStudent', function(req, res, next) {
  if(req.session.admin == undefined) {
    req.flash('flash_error', '未登录');
    return res.redirect('/login');
  }
  console.log(req.body);
  Administrator.addStudent(req.body, function(err, results) {
    if (err != undefined) {
      console.log(err);
      req.flash('flash_error', err);
      return res.redirect('/smanage');
    }
    req.flash('flash_success', '增加成功');
    return res.redirect('/smanage');
  });
})

router.post('/deleteStudent', function(req, res, next) {
  if(req.session.admin == undefined) {
    req.flash('flash_error', '未登录');
    return res.redirect('/login');
  }
  Administrator.deleteStudent(req.body.studentId, function(err, results) {
    if (err != undefined) {
      console.log(err);
      req.flash('flash_error', err);
      return res.send('failed');
    }
    req.flash('flash_success', '删除成功');
    return res.send('success');
  });
})

router.post('/updateStudent', function(req, res, next) {
  if(req.session.admin == undefined) {
    req.flash('flash_error', '未登录');
    return res.redirect('/login');
  }
  Administrator.updateStudent(req.body, function(err, results) {
    if (err != undefined) {
      console.log(err);
      req.flash('flash_error', err);
      return res.redirect('/smanage');
    }
    req.flash('flash_success', '修改成功');
    return res.redirect('/smanage');
  })
})

module.exports = router;