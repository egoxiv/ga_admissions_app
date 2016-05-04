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
      if(data.instructors.length < 3){
        //make an add-instructor button
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
      if(data.students.length < 20){
        // make an add-student button
      }
    }
  });
};

populateInstructor();
populateStudent();

