$(document).ready(function(){
	// If the delete button is clicked make an AJAX call to delete the User
	// and then redirect away from the page
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

	// If the enroll button is clicked make an AJAX call to upgrade the user's status
	// and then redirect away from the page

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