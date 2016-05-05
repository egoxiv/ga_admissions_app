$(document).ready(function(){
  console.log('main.js up and running!');
  var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!

    var yyyy = today.getFullYear();
    if(dd<10){
        dd='0'+dd;
    }
    if(mm<10){
        mm='0'+mm;
    }
  var todayStr = yyyy+'-'+mm+'-'+dd;
  $('.date-picker').val(todayStr);

  $('body').on('click','button',function(){
    var student = $(this).prev().prev().prev().attr('id');
    var instructor = $(this).prev().prev().prev().val();
    var dateAndTime = $(this).prev().val()+' '+$(this).prev().prev().val();
    console.log(student,instructor,dateAndTime);
    if(instructor !=='add'){
      var ids ={};
      ids.instructor =instructor;
      ids.student = student;
      ids.time = dateAndTime;
      // console.log(ids);
      $.ajax({
        method: "POST",
        data: ids,
        url: "/admissions/",
        cache: false,
        success:function(data){console.log(data);},
        error: function(err){console.log(err);}
      });
      $(this).parent().hide();
    }
  });
});
