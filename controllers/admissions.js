var User       = require ('../models/user');
var Cohort     = require ('../models/cohort');
var db         = require('../config/db');
// var passport   = require('passport');
// require('../config/passport-google2')(passport);
// var mongoose = require('mongoose');

var controller = {};

controller.index = function(req,res){
// if(req.user === undefined) res.redirect('/');
// if(req.user !== undefined && req.user.role !=='admissions') res.redirect('/');
<<<<<<< HEAD
	console.log(req.user);
	var newApplicants;
	var currentInstructors;
	var theEvaluated;
	// User.find({role: 'student', 'application.status':'new applicant', admissions:req.user})
	User.find({role: 'student', 'application.status':'evaluated'})
	.then(function(students){
		theEvaluated = students;
		return User.find({role: 'student', 'application.status':'new applicant'});
	})
	.then(function(students){
		newApplicants = students;
		return User.find({role: 'instructor'});
	})
	.then(function(instructors){
		currentInstructors = instructors;
		return User.find({role: 'admissions'});
	})
	.then(function(admissions){
		res.render('admissions/admissions', {user:req.user, applicants:newApplicants, instructors:currentInstructors, admissions:admissions, evaluated:theEvaluated});
	})
	.catch(function(err) {
		throw err;
	});
=======
  console.log(req.user);
  var newApplicants;
  var currentInstructors;
  var theEvaluated;
  // User.find({role: 'student', 'application.status':'new applicant', admissions:req.user})
  User.find({role: 'student', 'application.status':'evaluated'})
  .then(function(students){
    theEvaluated = students;
    return User.find({role: 'student', 'application.status':'new applicant'});
  })
  .then(function(students){
    newApplicants = students;
    return User.find({role: 'instructor'});
  })
  .then(function(instructors){
    currentInstructors = instructors;
    return User.find({role: 'admissions'});
  })
  .then(function(admissions){
    res.render('admissions/admissions', {user:req.user, applicants:newApplicants, instructors:currentInstructors, admissions:admissions, evaluated:theEvaluated});
  })
  .catch(function(err) {
    throw err;
  });
>>>>>>> 51a614c79cfdbd5d3cccb64e5f3363d8d4d0dfad
};

controller.instructorIndex = function(req, res){
};

controller.update = function(req, res){
<<<<<<< HEAD
	console.log(req.body);
	var currentInstructor = req.body.instructor;
	var currentStudent = req.body.student;
	var dateAndTime = req.body.time;
	User.findById(currentStudent)
		.then(function(student){
			currentStudent = student;
			return User.findById(currentInstructor);
		})
		.then(function(instructor){
			currentInstructor = instructor;
			currentStudent.instructor = currentInstructor;
			currentStudent.dateAndTime = dateAndTime;
			currentStudent.admissions = req.user;
			currentStudent.application.status = 'pre evaluation';
			return currentStudent.save();
		})
		.then(function(student){
			var studentMessage ="Hi, " + student.name + "!  You have been scheduled for an interview with instructor "+currentInstructor.name+".  The time of the interview will be: " +dateAndTime+".  If you have an issue with the time then please let us know as soon as possible.";
			return require('../config/nodemailer')(student.email,"You have an interview!!!",studentMessage,"<p>" + studentMessage +".</p>");
		})
		.then(function(student){
			var instructorMessage ="Hi, " + currentInstructor.name + "!  You have been scheduled for an interview with a new prospective student name: "+currentStudent.name+".  The time of the interview will be: " +dateAndTime+".  If you have an issue with the time then please let us know as soon as possible.";	
			return require('../config/nodemailer')(currentInstructor.ga_email,"You have an interview!!!",instructorMessage,"<p>" + instructorMessage +".</p>");
		})
		.catch(function(err){
			res.status(500).send({error:err});
		})
		.then(function(status){
			res.status(200).send({data: currentStudent, status: status});
		});
	res.send(req.body);
=======
  console.log(req.body);
  var currentInstructor = req.body.instructor;
  var currentStudent = req.body.student;
  var dateAndTime = req.body.time;
  User.findById(currentStudent)
    .then(function(student){
      currentStudent = student;
      return User.findById(currentInstructor);
    })
    .then(function(instructor){
      currentInstructor = instructor;
      currentStudent.instructor = currentInstructor;
      currentStudent.dateAndTime = dateAndTime;
      currentStudent.admissions = req.user;
      currentStudent.application.status = 'pre evaluation';
      return currentStudent.save();
    })
    .then(function(student){
      var studentMessage ="Hi, " + student.name + "!  You have been scheduled for an interview with instructor "+currentInstructor.name+".  The time of the interview will be: " +dateAndTime+".  If you have an issue with the time then please let us know as soon as possible.";
      return require('../config/nodemailer')(student.email,"You have an interview!!!",studentMessage,"<p>" + studentMessage +".</p>");
    })
    .then(function(student){
      var instructorMessage ="Hi, " + currentInstructor.name + "!  You have been scheduled for an interview with a new prospective student name: "+currentStudent.name+".  The time of the interview will be: " +dateAndTime+".  If you have an issue with the time then please let us know as soon as possible.";
      return require('../config/nodemailer')(currentInstructor.ga_email,"You have an interview!!!",instructorMessage,"<p>" + instructorMessage +".</p>");
    })
    .catch(function(err){
      res.status(500).send({error:err});
    })
    .then(function(status){
      res.status(200).send({data: currentStudent, status: status});
    });
  res.send(req.body);
>>>>>>> 51a614c79cfdbd5d3cccb64e5f3363d8d4d0dfad
};

controller.show = function(req, res){
  User.findById(req.params.student)
  .then(function(user){
    res.send(user);
  });
};
controller.edit = function(req, res){
};

controller.logout = function(req,res){
  req.logout();
  res.redirect('/');
};

module.exports = controller;
