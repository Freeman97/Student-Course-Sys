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
  Administrator.getTeacher(function(err, results) {
    if (err != undefined) {
      console.log(err);
    }
    res.render('tmanage', { title: '管理教师信息', teacher: results });
  })
});

router.get('/search', function(req, res, next) {
  if(req.session.admin == undefined) {
    req.flash('flash_error', '未登录');
    return res.redirect('/login');
  }
  Administrator.searchTeachers(req.query.searchBy, req.query.keyword, function(err, results) {
    if (err != undefined) {
      console.log(err);
      req.flash('flash_error', err.code);
      return res.redirect('/admin');
    }
    return res.render('tmanage', { title: '管理教师信息', teacher: results});
  })
})

router.post('/addTeacher', function(req, res, next) {
  if(req.session.admin == undefined) {
    req.flash('flash_error', '未登录');
    return res.redirect('/login');
  }
  console.log(req.body);
  Administrator.addTeacher(req.body, function(err, results) {
    if (err != undefined) {
      console.log(err);
      req.flash('flash_error', err);
      return res.redirect('/tmanage');
    }
    req.flash('flash_success', '增加成功');
    return res.redirect('/tmanage');
  });
})

router.post('/deleteTeacher', function(req, res, next) {
  if(req.session.admin == undefined) {
    req.flash('flash_error', '未登录');
    return res.redirect('/login');
  }
  Administrator.deleteTeacher(req.body.teacherId, function(err, results) {
    if (err != undefined) {
      console.log(err);
      req.flash('flash_error', err);
      return res.redirect('/tmanage');
    }
    req.flash('flash_success', '删除成功');
    return res.redirect('/tmanage');
  });
})

router.post('/updateTeacher', function(req, res, next) {
  if(req.session.admin == undefined) {
    req.flash('flash_error', '未登录');
    return res.redirect('/login');
  }
  Administrator.updateTeacher(req.body, function(err, results) {
    if (err != undefined) {
      console.log(err);
      req.flash('flash_error', err);
      return res.redirect('/tmanage');
    }
    req.flash('flash_success', '修改成功');
    return res.redirect('/tmanage');
  })
})

module.exports = router;