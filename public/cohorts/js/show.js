console.log('hello from show.js');

var id = $('#cohort-id').text();

$('body').on('click', '.remove-instructor-button', function(){
  var litag = $(this).parent();
  var data = $(this).closest('li').data();
  $.ajax({
    url: '/cohorts/' + id + '/remove-instructor',
    data: {
      instructorId: data.id,
    },
    success: function(){
      litag.hide();
      $('#add-instructor').show();
    }
  });
});

$('body').on('click', '.remove-student-button', function(){
  var litag = $(this).parent();
  var data = $(this).closest('li').data();
  $.ajax({
    url: '/cohorts/' + id + '/remove-student',
    data: {
      studentId: data.id,
    },
    success: function(){
      litag.hide();
      $('#add-student').show();
    }
  });
});

var addInstructorRemoveButton = function(element){
  var $button = $('<button>');
  $button.addClass('remove-instructor-button');
  $button.text('Remove from cohort');
  element.append($button);
};

var addStudentRemoveButton = function(element){
  var $button = $('<button>');
  $button.addClass('remove-student-button');
  $button.text('Remove from cohort');
  element.append($button);
};

var populateInstructor = function(){
  $.ajax({
    url: '/cohorts/api/' + id,
    success: function(data){
      $('#instructors').html('');
      data.instructors.forEach(function(instructor){
        var $litag = $('<li>');
        $litag.text(instructor.name);
        $litag.data({id: instructor._id});
        addInstructorRemoveButton($litag);
        $('#instructors').append($litag);
      });
      if(data.instructors.length >= 3){
        $('#add-instructor').hide();
      }
    }
  });
};

var populateStudent = function(){
  $.ajax({
    url: '/cohorts/api/' + id,
    success: function(data){
      $('#students').html('');
      data.students.forEach(function(student){
        var $litag = $('<li>');
        $litag.text(student.name);
        $litag.data({id: student._id});
        addStudentRemoveButton($litag);
        $('#students').append($litag);
      });
      if(data.students.length >= 20){
        $('#add-student').hide();
      }
    }
  });
};

populateInstructor();
populateStudent();

$('#add-instructor-button').on('click', function(event){
  $.ajax({
    method: 'put',
    url: '/cohorts/' + id + '/add-instructor',
    data: {
      name: $('#new-instructor').val()
    },
    success: function(data){
      $('#new-instructor').val('');
      populateInstructor();
    }
  });
});

$('#add-student-button').on('click', function(event){
  $.ajax({
    method: 'put',
    url: '/cohorts/' + id + '/add-student',
    data: {
      name: $('#new-student').val()
    },
    success: function(data){
      $('#new-student').val('');
      populateStudent();
    }
  });
});
















