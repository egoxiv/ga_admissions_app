var db = require('./config/db');
var Cohort = require('./models/cohort');
var User = require('./models/user');

User.find({role:'student'})
	.then(function(users){
    users.forEach(function(user){
      console.log(user.role, user.name, user.application.status, user.instructor, user.admissions);
    });
	})
  .catch(function(err){
    console.log(err);
    return err;
  })
  .then(function(results){
    console.log(results);
    process.exit();
  });
