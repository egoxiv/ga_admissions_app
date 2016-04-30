var db = require('./config/db');
var Cohort = require('./models/cohort');
var User = require('./models/user');


User.remove({})
	.then(function(results){
		console.log(results);
		var instructor = new User();
		instructor.firstName ='Phil';
		instructor.firstName ='Lamplugh';
		instructor.email = 'philco@ga.com';
		instructor.github ='https://github.com/phlco';
		instructor.role ='instructor';
		return instructor.save();
	})
	.then(function(user){
		console.log(user);
	})
	.catch(function(err){
		console.log(err);
	})
	.then(function(){
		process.exit();
	});