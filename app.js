var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var flash = require('connect-flash');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var chooseCourseRouter = require('./routes/chooseCourse');
var checkGradeRouter = require('./routes/checkGrade');
var loginRouter = require('./routes/login');
var quitCourseRouter = require('./routes/quitCourse');
var logoutRouter = require('./routes/logout');
var adminRouter = require('./routes/admin');
var adminLoginRouter = require('./routes/adminLogin');
var tmanageRouter = require('./routes/tmanage');
var gmanageRouter = require('./routes/gmanage');
var smanageRouter = require('./routes/smanage');

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// express-mysql-session setup
var mysql = require('mysql');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var options = require('./DBconfig');
var sessionStore = new MySQLStore(options);
app.use(session({
  name: 'session_cookie_name',
  secret: 'session_cookie_secret',
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 3600000
  }
}))


// connect-flash setup
app.use(flash());
app.use(function (req, res, next) {
  res.locals.flash_success = req.flash('flash_success'); 
  res.locals.flash_error = req.flash('flash_error');        
  next();
});

// routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/chooseCourse', chooseCourseRouter);
app.use('/checkGrade', checkGradeRouter);
app.use('/login', loginRouter);
app.use('/quitCourse', quitCourseRouter);
// app.use('/doLogin', doLoginRouter);
app.use('/logout', logoutRouter);
app.use('/admin', adminRouter);
app.use('/adminLogin', adminLoginRouter);
app.use('/tmanage', tmanageRouter);
app.use('/gmanage', gmanageRouter);
app.use('/smanage', smanageRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
