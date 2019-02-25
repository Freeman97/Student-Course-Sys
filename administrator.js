var connection = require('./DBconnect');
var crypto = require('crypto');

function Administrator(ad) {
  this.adminId = ad.adminId;
  this.adminPw = ad.adminPw;
}

module.exports = Administrator;

Administrator.get = function get(adminId, callback) {
  connection.query('SELECT * FROM admin WHERE adminId = ?', adminId, function(err, results, fields) {
    if (err) {
      return callback(err);
    } else {
      return callback(err, results);
    }
  });
}

Administrator.getCourses = function getCourses(callback) {
  connection.query('SELECT * FROM course', function(err, results, fields) {
    if (err) {
      return callback(err);
    } else {
      return callback(err, results);
    }
  });
}

Administrator.searchCourses = function searchCourses(searchBy, keyword, callback) {
  // 模糊参数化查询
  var query = 'SELECT * FROM course WHERE ' + connection.escapeId(searchBy) + ' LIKE ' + connection.escape('%' + keyword + '%');
  console.log(query);
  connection.query(query, function(err, results, fields) {
    if (err) {
      return callback(err);
    } else {
      return callback(err, results);
    }
  });
}

Administrator.deleteCourses = function deleteCourses(courseId, callback) {
  connection.query('DELETE FROM course WHERE courseId = ?', courseId, function(err, results, fields) {
    if (err) {
      return callback(err, results);
    } else {
      return callback(err, results);
    }
  });
}

Administrator.addCourse = function addCourse(course, callback) {
  console.log(course);
  if(course.size == '') {
    course.size = null;
  }
  connection.query('INSERT INTO course VALUES(?, ?, ?, ?, ?, ?)', [course.courseId, course.courseName, course.credit, course.size, course.grade, course.school], function(err, results, fields) {
    if (err) {
      return callback(err, results);
    } else {
      return callback(err, results);
    }
  });
}

Administrator.updateCourse = function updateCourse(course, callback) {
  var size = course.size;
  if(course.size == '') {
    size = null;
  }
  connection.query('UPDATE course set courseId = ?, courseName = ?, credit = ?, size = ?, grade = ?, school = ? WHERE courseId = ?', [course.courseId, course.courseName, course.credit, size, course.grade, course.school, course.courseId], function(err, results, fields) {
    if (err) {
      return callback(err, results);
    } else {
      return callback(err, results);
    }
  });
}

Administrator.getAssignedTeacher = function getAssignedTeacher(courseId, callback) {
  console.log(courseId);
  connection.query('SELECT teacher.* FROM teacher, tc WHERE teacher.teacherId = tc.teacherId AND tc.courseId = ?', courseId, function(err, results, fields) {
    if (err) {
      return callback(err, results);
    } else {
      console.log(results);
      return callback(err, results);
    }
  });
}

Administrator.addTc = function addTc(courseId, teacherId, callback) {
  connection.query('INSERT INTO tc VALUES(?, ?)', [courseId, teacherId], function(err, results, fields) {
    if (err) {
      return callback(err, results);
    } else {
      return callback(err, results);
    }
  });
}

Administrator.deleteAssignedTeacher = function deleteAssignedTeacher(courseId, teacherId, callback) {
  connection.query('DELETE FROM tc WHERE tc.teacherId = ? AND tc.courseId = ?', [teacherId, courseId], function(err, results, fields) {
    if (err) {
      return callback(err, results);
    } else {
      return callback(err, results);
    }
  });
}

Administrator.searchTeachers = function searchTeachers(searchBy, keyword, callback) {
  // 模糊参数化查询
  var query = 'SELECT * FROM teacher WHERE ' + connection.escapeId(searchBy) + ' LIKE ' + connection.escape('%' + keyword + '%');
  console.log(query);
  connection.query(query, function(err, results, fields) {
    if (err) {
      return callback(err);
    } else {
      return callback(err, results);
    }
  });
}

Administrator.getTeacher = function getTeacher(callback) {
  connection.query('SELECT * FROM teacher', function(err, results, fields) {
    if (err) {
      return callback(err, results);
    } else {
      return callback(err, results);
    }
  });
}

Administrator.addTeacher = function addTeacher(teacher, callback) {
  connection.query('INSERT INTO teacher VALUES(?, ?, ?)', [teacher.teacherId, teacher.tname, teacher.tschool], function(err, results, fields) {
    if (err) {
      return callback(err, results);
    } else {
      return callback(err, results);
    }
  });
}

Administrator.deleteTeacher = function deleteTeacher(teacherId, callback) {
  connection.query('DELETE FROM teacher WHERE teacherId = ?', teacherId, function(err, results, fields) {
    if (err) {
      return callback(err, results);
    } else {
      return callback(err, results);
    }
  });
}

Administrator.updateTeacher = function updateTeacher(teacher, callback) {
  var tschool = teacher.tschool;
  if (teacher.tschool == '') {
    tschool = null;
  }
  connection.query('UPDATE teacher SET teacherId = ?, tname = ?, tschool = ? WHERE teacherId = ?', [teacher.teacherId, teacher.tname, tschool, teacher.teacherId], function(err, results, fields) {
    if (err) {
      return callback(err, results);
    } else {
      return callback(err, results);
    }
  });
}

Administrator.getSTC = function getSTC(callback) {
  connection.query('SELECT stc.studentId, stc.teacherId, stc.score, teacher.tname, course.*, student.sname FROM teacher, course, stc, student WHERE stc.studentId = student.studentId AND stc.courseId = course.courseId AND stc.teacherId = teacher.teacherId', function(err, results, fields) {
    if (err) {
      return callback(err, results);
    } else {
      return callback(err, results);
    }
  });
}

Administrator.searchSTC = function searchStudents(searchBy, keyword, callback) {
  // 模糊参数化查询
  var query = 'SELECT stc.studentId, stc.teacherId, stc.score, teacher.tname, course.*, student.sname FROM teacher, course, stc, student WHERE stc.studentId = student.studentId AND stc.courseId = course.courseId AND stc.teacherId = teacher.teacherId AND stc.' + connection.escapeId(searchBy) + ' LIKE ' + connection.escape('%' + keyword + '%');
  console.log(query);
  connection.query(query, function(err, results, fields) {
    if (err) {
      return callback(err);
    } else {
      return callback(err, results);
    }
  });
}

Administrator.deleteSTC = function deleteSTC(courseId, studentId, teacherId, callback) {
  connection.query('DELETE FROM stc WHERE courseId = ? AND studentId = ? AND teacherId = ?', [courseId, studentId, teacherId], function(err, results, fields) {
    if (err) {
      return callback(err, results);
    } else {
      return callback(err, results);
    }    
  })
}

Administrator.updateSTC = function updateSTC(courseId, studentId, teacherId, score, callback) {
  connection.query('UPDATE stc SET score = ? WHERE courseId = ? AND studentId = ? AND teacherId = ?', [score, courseId, studentId, teacherId], function(err, results, fields) {
    if (err) {
      return callback(err, results);
    } else {
      return callback(err, results);
    }
  })
}

Administrator.getStudent = function getStudent(callback) {
  connection.query('SELECT * FROM student', function(err, results, fields) {
    if (err) {
      return callback(err, results);
    } else {
      return callback(err, results);
    }
  });
}

Administrator.searchStudents = function searchStudents(searchBy, keyword, callback) {
  // 模糊参数化查询
  var query = 'SELECT * FROM student WHERE ' + connection.escapeId(searchBy) + ' LIKE ' + connection.escape('%' + keyword + '%');
  console.log(query);
  connection.query(query, function(err, results, fields) {
    if (err) {
      return callback(err);
    } else {
      return callback(err, results);
    }
  });
}

Administrator.addStudent = function addStudent(student, callback) {
  var sname = null;
  var ssex = null;
  var sschool = null;
  var sclass = null;
  var grade = null;
  if(student.sname != '') {
    sname = student.sname;
  }
  if(student.ssex == '男' || student.ssex == '女') {
    ssex = student.ssex;
  }
  if(student.sschool != '') {
    sschool = student.sschool;
  }
  if(student.sclass != '') {
    sclass = student.sclass;
  }
  if(student.grade != '') {
    grade = student.grade;
  }
  var md5 = crypto.createHash('md5');
  var password = md5.update(student.studentPw).digest('base64');
  connection.query('INSERT INTO student VALUES(?, ?, ?, ?, ?, ?, ?)', [student.studentId, password, sname, ssex, sschool, sclass, grade], function(err, results, fields) {
    if (err) {
      return callback(err, results);
    } else {
      return callback(err, results);
    }
  });
}

Administrator.deleteStudent = function deleteStudent(studentId, callback) {
  connection.query('DELETE FROM student WHERE studentId = ?', studentId, function(err, results, fields) {
    if (err) {
      return callback(err, results);
    } else {
      return callback(err, results);
    }
  });
}

Administrator.updateStudent = function updateStudent(student, callback) {
  var sname = null;
  var ssex = null;
  var sschool = null;
  var sclass = null;
  var grade = null;
  if(student.sname != '') {
    sname = student.sname;
  }
  if(student.ssex == '男' || student.ssex == '女') {
    ssex = student.ssex;
  }
  if(student.sschool != '') {
    sschool = student.sschool;
  }
  if(student.sclass != '') {
    sclass = student.sclass;
  }
  if(student.grade != '') {
    grade = student.grade;
  }
  connection.query('UPDATE student SET studentId = ?, sname = ?, ssex = ?, sschool = ?, sclass = ?, grade = ? WHERE studentId = ?', [student.studentId, sname, ssex, sschool, sclass, grade, student.studentId], function(err, results, fields) {
    if (err) {
      return callback(err, results);
    } else {
      if (student.studentPw != '') {
        var md5 = crypto.createHash('md5');
        var password = md5.update(student.studentPw).digest('base64');
        connection.query('UPDATE student SET studentPw = ? WHERE studentId = ?', [password, student.studentId], function(err, results, fields) {
          if (err) {
            return callback(err,results);
          } else {
            return callback(err, results);
          }
        });
      }
      return callback(err, results);
    }
  });
}