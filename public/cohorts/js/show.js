console.log('hello from show.js');

var id = $('.hidden').text();

var removePerson = function(){
  console.log('clicked');
  $(this).closest('.li').remove();
};

var addRemoveButton = function(element){
  var $button = $('<button>');
  $button.attr('id', 'remove-button');
  $button.text('Remove from cohort');
  element.append($button);
  $button.on('click', function(){
    removePerson();
  });
};

var populateInstructor = function(){
  $.ajax({
    url: '/cohorts/api/' + id,
    success: function(data){
      $('#instructors').html('');
      data.instructors.forEach(function(instructor){
        var $litag = $('<li>');
        $litag.addClass('li');
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
