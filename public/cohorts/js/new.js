console.log('hello from new.js');

var create = function(){
  $.ajax({
    method: 'post',
    url: '/cohorts/',
    data: {
      program: $('#program').val(),
      city: $('#city').val(),
      campus: $('#campus').val(),
      start: $('#start').val(),
      end: $('#end').val(),
    }
  });
};

$('#new-cohort').click(function(){
  create();
});
