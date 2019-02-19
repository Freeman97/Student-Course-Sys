var express = require('express');
var User = require('../user.js');
var router = express.Router();

/* handle quit course request */
router.get('/', function(req, res, next) {
  req.session.user = null;
  req.session.admin = null;
  req.flash('flash_success', '登出成功');
  return res.redirect('/login');
});

module.exports = router;