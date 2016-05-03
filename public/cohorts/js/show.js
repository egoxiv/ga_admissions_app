console.log('hello from show.js');

var id = $('#cohort-id').text();

$('body').on('click', '.remove-button', function(){
  console.log($(this).parent().text());
  var tooMuchText = $(this)
  $.ajax({
    url: '/cohorts/' + id + 'remove-person',
    data: {

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

