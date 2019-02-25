function chooseHandler(courseId, teacherId) {
  var postdata = {
    courseId: courseId,
    teacherId: teacherId
  };
  $.ajax({
    url: '/chooseCourse',
    method: 'POST',
    data: postdata,
    async: false,
    complete: function(jqXHR, textStatus) {
      console.log(jqXHR);
      console.log(textStatus);
      location.reload();
    }
  }) 
}

function quitHandler(courseId, teacherId) {
  var postdata = {
    courseId: courseId,
    teacherId: teacherId
  };
  $.ajax({
    url: '/quitCourse',
    method: 'POST',
    data: postdata,
    async: false,
    complete: function(jqXHR, textStatus) {
      console.log(jqXHR);
      console.log(textStatus);
      location.reload();
    }
  })
}

function adminDeleteCourseHandler(courseId) {
  var postdata = {
    courseId: courseId
  };
  $.ajax({
    url: '/admin/deleteCourse',
    method: 'POST',
    data: postdata,
    async: false,
    complete: function(jqXHR, textStatus) {
      console.log(jqXHR);
      console.log(textStatus);
      location.reload();
    }
  });
}

function adminDeleteCourseModalHandler(courseId) {
  $("#delete-span").text(courseId);
  $("#delete").click(function() {
    adminDeleteCourseHandler(courseId);
  });
  $("#delete-modal").modal("show");
}

function adminAddCourseModalHandler() {
  $("#add-modal").modal("show");
}

function adminUpdateCourseModalHandler(courseId, courseName, credit, grade, school, size) {
  $("#mcourseId").val(courseId);
  $("#mcourseName").val(courseName);
  $("#mcredit").val(credit);
  $("#mgrade").val(grade);
  $("#mschool").val(school);
  $("#msize").val(size);
  $("#update-modal").modal("show");
}

function adminAssignModalHandler(courseId) {
  $("#addtc-modal").modal("show");
  $("#tccourseId").val(courseId);
  $(".assignedTeacher").remove();
  var data = {
    courseId: courseId
  };
  $.ajax({
    url: '/admin/getAssignedTeacher',
    method: 'GET',
    data: data,
    success: function(res, jqXHR, textStatus) {
      console.log(res);
      var trStart = "<tr class='assignedTeacher'>";
      var trEnd = "</tr>";
      var tdStart = "<td>";
      var tdEnd = "</td>";
      for(var i = 0; i < res.length; i++)
      {
        var el = trStart + tdStart + res[i].teacherId + tdEnd;
        el += tdStart + res[i].tname + tdEnd;
        el += tdStart + res[i].tschool + tdEnd;
        var button = "<button class='btn btn-danger' onclick='adminDeleteAssignHandler(" + res[i].teacherId + ", " + courseId + ")'>删除此安排</button>";
        el += tdStart + button + tdEnd + trEnd;
        console.log(el);
        $("#assignTable").append(el);
      }
    }
  });
}

function adminDeleteAssignHandler(teacherId, courseId) {
  var data = {
    teacherId: teacherId,
    courseId: courseId
  }
  $.ajax({
    url: '/admin/deleteAssignedTeacher',
    method: 'GET',
    data: data,
    async: false,
    complete: function(jqXHR, textStatus) {
      console.log(jqXHR);
      console.log(textStatus);
      location.reload();
    }
  });
}

function adminAddTeacherModalHandler() {
  $("#add-modal").modal("show");
}

function adminDeleteTeacherHandler(teacherId) {
  var postdata = {
    teacherId: teacherId
  };
  $.ajax({
    url: '/tmanage/deleteTeacher',
    method: 'POST',
    data: postdata,
    async: false,
    complete: function(jqXHR, textStatus) {
      console.log(jqXHR);
      console.log(textStatus);
      location.reload();
    }
  });
}

function adminDeleteTeacherModalHandler(teacherId) {
  $("#delete-span").text(teacherId);
  $("#delete").click(function() {
    adminDeleteTeacherHandler(teacherId);
  });
  $("#delete-modal").modal("show");
}

function adminUpdateTeacherModalHandler(teacherId, tname, tschool) {
  $("#update-modal").modal("show");
  $("#mteacherId").val(teacherId);
  $("#mtname").val(tname);
  $("#mtschool").val(tschool);
}

function adminUpdateScoreModalHandler(courseId, studentId, teacherId, score) {
  $("#update-modal").modal("show");
  $("#mscore").val(score);
  $("#mstudentId").val(studentId);
  $("#mteacherId").val(teacherId);
  $("#mcourseId").val(courseId);
}

function adminDeleteScoreModalHandler(courseId, studentId, teacherId) {
  $("#delete-span").text("课程编号" + courseId + " 学号" + studentId + " 教师编号" + teacherId + " ");
  $("#delete").click(function() {
    adminDeleteScoreHandler(courseId, studentId, teacherId);
  });
  $("#delete-modal").modal("show");
}

function adminDeleteScoreHandler(courseId, studentId, teacherId) {
  var postdata = {
    courseId: courseId,
    studentId: studentId,
    teacherId: teacherId
  };
  $.ajax({
    url: '/gmanage/deleteScore',
    method: 'POST',
    data: postdata,
    async: false,
    complete: function(jqXHR, textStatus) {
      console.log(jqXHR);
      console.log(textStatus);
      location.reload();
    }
  });
}

function adminAddStudentModalHandler() {
  $("#add-modal").modal("show");
}

function adminDeleteStudentHandler(studentId) {
  var postdata = {
    studentId: studentId
  };
  $.ajax({
    url: '/smanage/deleteStudent',
    method: 'POST',
    data: postdata,
    async: false,
    complete: function(jqXHR, textStatus) {
      console.log(jqXHR);
      console.log(textStatus);
      location.reload();
    }
  });
}

function adminDeleteStudentModalHandler(studentId) {
  $("#delete-span").text(studentId);
  $("#delete").click(function() {
    adminDeleteStudentHandler(studentId);
  });
  $("#delete-modal").modal("show");
}

function adminUpdateStudentModalHandler(studentId, sname, ssex, sschool, sclass, grade) {
  $("#update-modal").modal("show");
  $("#mstudentId").val(studentId);
  $("#msname").val(sname);
  $("#mssex").val(ssex);
  $("#msschool").val(sschool);
  $("#msclass").val(sclass);
  $("#mgrade").val(grade);
}