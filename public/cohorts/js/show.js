console.log('hello from show.js');

var id = $('#cohort-id').text();

$('body').on('click', 'button', function(){
  $('#error').hide();
});

$('body').on('click', '.remove-instructor-button', function(){
  var trtag = $(this).parent().parent();
  var data = $(this).closest('td').data();
  $.ajax({
    url: '/cohorts/' + id + '/remove-instructor',
    data: {
      instructorId: data.id,
    },
    success: function(){
      trtag.hide();
      $('#add-instructor').show();
    }
  });
});

$('body').on('click', '.remove-student-button', function(){
  var trtag = $(this).parent().parent();
  var data = $(this).closest('td').data();
  $.ajax({
    url: '/cohorts/' + id + '/remove-student',
    data: {
      studentId: data.id,
    },
    success: function(){
      trtag.hide();
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
        var $trtag = $('<tr>');
        var $tdtag1 = $('<td>');
        var $tdtag2 = $('<td>');
        $tdtag1.text(instructor.name);
        $tdtag2.data({id: instructor._id});
        addInstructorRemoveButton($tdtag2);
        $trtag.append($tdtag1);
        $trtag.append($tdtag2);
        $('#instructors').append($trtag);
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
        var $trtag = $('<tr>');
        var $tdtag1 = $('<td>');
        var $tdtag2 = $('<td>');
        $tdtag1.text(student.name);
        $tdtag2.data({id: student._id});
        addStudentRemoveButton($tdtag2);
        $trtag.append($tdtag1);
        $trtag.append($tdtag2);
        $('#students').append($trtag);
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
      if(data.error){
        $('#error').text(data.error);
        $('#error').show();
      } else {
        $('#new-instructor').val('');
        populateInstructor();
      }
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
      if(data.error){
        $('#error').text(data.error);
        $('#error').show();
      } else {
        $('#new-student').val('');
        populateStudent();
      }
    }
  });
});
















