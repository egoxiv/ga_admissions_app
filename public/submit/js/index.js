$(function(){

  $('#submit').on('click', function() {

    $.ajax({
      url: 'http://localhost:3000/sign-up',
      method: 'POST',
      success: function(data) {
        console.log('SUCCESS');
        console.log(data);
      },
      error: function(error) {
        console.log('FAIL');
        console.log(error);
      }
    });

  });

});
