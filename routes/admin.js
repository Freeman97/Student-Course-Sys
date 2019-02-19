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
  Administrator.getCourses(function(err, results) {
    if (err != undefined) {
      console.log(err);
    }
    res.render('admin', { title: '管理课程信息', course: results });
  })
});

router.post('/deleteCourse', function(req, res, next) {
  if(req.session.admin == undefined) {
    req.flash('flash_error', '未登录');
    return res.redirect('/login');
  }
  Administrator.deleteCourses(req.body.courseId, function(err, results) {
    if (err != undefined) {
      console.log(err);
      req.flash('flash_error', err);
      return res.redirect('/admin');
    }
    req.flash('flash_success', '删除成功');
    return res.redirect('/admin');
  });
});

router.post('/addCourse', function(req, res, next) {
  if(req.session.admin == undefined) {
    req.flash('flash_error', '未登录');
    return res.redirect('/login');
  }
  Administrator.addCourse(req.body, function(err, results) {
    if(err != undefined) {
      console.log(err);
      if(err.code == 'ER_DUP_ENTRY') {
        req.flash('flash_error', '课程编号已被占用, 请使用新的课程编号');
        return res.redirect('/admin');
      }
    }
    req.flash('flash_success', '添加成功');
    return res.redirect('/admin');
  });
})

router.post('/updateCourse', function(req, res, next) {
  if(req.session.admin == undefined) {
    req.flash('flash_error', '未登录');
    return res.redirect('/login');
  }
  Administrator.updateCourse(req.body, function(err, results) {
    if(err != undefined) {
      console.log(err);
      if(err.code == 'ER_DUP_ENTRY') {
        req.flash('flash_error', '课程编号已被占用, 请使用新的课程编号');
        return res.redirect('/admin');
      }
    }
    req.flash('flash_success', '修改成功');
    return res.redirect('/admin');
  });
})

router.post('/addTc', function(req, res, next) {
  if(req.session.admin == undefined) {
    req.flash('flash_error', '未登录');
    return res.redirect('/login');
  }
  Administrator.addTc(req.body.courseId, req.body.teacherId, function(err, results) {
    if(err != undefined) {
      console.log(err);
      if(err.code == 'ER_DUP_ENTRY') {
        req.flash('flash_error', '该教师已参与此课程的教学');
        return res.redirect('/admin');
      }
    }
    req.flash('flash_success', '添加成功');
    return res.redirect('/admin');
  });
})

module.exports = router;