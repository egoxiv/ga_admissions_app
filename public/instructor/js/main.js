$(document).ready(function(){
	$('#delete-button').on('click', function(event){
		console.log($('#student-id').val());
		var confirmation = window.confirm('Are you Sure?');
		if(confirmation){
			$.ajax({
				method: 'DELETE',
				url: '/admissions/delete/'+$('#student-id').val(),
			}).done(function(results){
				window.location = '/admissions';
			});
			
		}
	});

	$('#enroll-button').on('click', function(event){
		console.log($('#student-id').val());
		var confirmation = window.confirm('Are you Sure?');
		if(confirmation){
			$.ajax({
				method: 'PUT',
				url: '/admissions/accepted/'+$('#student-id').val(),
			}).done(function(results){
				window.location = '/admissions';
			});
			
		}
	});
});