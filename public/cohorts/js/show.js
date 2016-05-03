console.log('hello from show.js');

var id = $('#cohort-id').text();

$('body').on('click', '.remove-button', function(){
  var litag = $(this).parent();
  console.log(litag.text());
  var data = $(this).closest('li').data();
  console.log(data.id);
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

var addRemoveButton = function(element){
  var $button = $('<button>');
  $button.addClass('remove-button');
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
        addRemoveButton($litag);
        $('#instructors').append($litag);
      });
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
        $('#students').append($litag);
      });
    }
  });
};

populateInstructor();
populateStudent();

