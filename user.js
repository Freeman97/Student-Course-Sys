var connection = require('./DBconnect');

function User(user) {
  this.studentId = user.studentId;
  this.studentPw = user.studentPw;
  this.sname = user.sname;
  this.ssex = user.ssex;
  this.sschool = user.sschool;
  this.sclass = user.sclass;
  this.grade = user.grade;
};

module.exports = User;

User.prototype.save = function save(callback) {
  connection.query('INSERT INTO student(studentId, studentPw) VALUES(?, ?)', [this.studentId, this.studentPw], function(err, results, fields) {
    if (err) {
      return callback(err);
    }
  });
}

User.get = function get(studentId, callback) {
  connection.query('SELECT * FROM student WHERE studentId = ?', studentId, function(err, results, fields) {
    if (err) {
      return callback(err);
    } else {
      return callback(err, results);
    }
  });
}

User.prototype.queryCourse = function(callback) {
  connection.query('SELECT * FROM tcfull x WHERE grade = ? AND school = ? AND NOT EXISTS(SELECT * FROM stc WHERE studentId = ? AND x.courseId = stc.courseId AND x.teacherId = stc.teacherId)', [this.grade, this.sschool, this.studentId], function(err, results, fields) {
    if (err != null) {
      return callback(err);
    } else {
      return callback(err, results);
    }
  });
}

User.prototype.queryChosenCourse = function(callback) {
  connection.query('SELECT stc.studentId, stc.teacherId, teacher.tname, course.* FROM teacher, course, stc WHERE stc.courseId = course.courseId AND stc.teacherId = teacher.teacherId AND stc.studentId = ?', this.studentId, function(err, results, fields) {
    if (err != null) {
      return callback(err);
    } else {
      return callback(err, results);
    }
  });
}

User.prototype.chooseCourse = function(courseId, teacherId, callback) {
  connection.query('INSERT INTO stc(courseId, studentId, teacherId) VALUES(?, ?, ?)', [courseId, this.studentId, teacherId], function(err, results, fields) {
    if (err != null) {
      return callback(err);
    } else {
      return callback(err, results);
    }
  });
}

User.prototype.quitCourse = function(courseId, teacherId, callback) {
  connection.query('DELETE FROM stc WHERE studentId = ? AND courseId = ? AND teacherId = ?', [this.studentId, courseId, teacherId], function(err, results, fields) {
    if (err != null) {
      return callback(err);
    } else {
      return callback(err, results);
    }
  });
}

User.prototype.queryCourseScore = function(callback) {
  connection.query('SELECT stc.studentId, stc.teacherId, stc.score, teacher.tname, course.*, rank(stc.courseId, stc.studentId, stc.teacherId) as rank FROM teacher, course, stc WHERE stc.courseId = course.courseId AND stc.teacherId = teacher.teacherId AND stc.score IS NOT NULL AND stc.studentId = ?', this.studentId, function(err, results, fields) {
    if (err != null) {
      return callback(err);
    } else {
      return callback(err, results);
    }
  });
}