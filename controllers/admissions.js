var User       = require ('../models/user');
var Cohort     = require ('../models/cohort');
// var passport   = require('passport');
var db         = require('../config/db');
// require('../config/passport-google2')(passport);

// var mongoose = require('mongoose');
var controller = {};



controller.index = function(req,res){
if(req.user === undefined) res.redirect('/');
if(req.user !== undefined && req.user.role !=='admissions') res.redirect('/');
	console.log(req.user);
	var newApplicants;
	var currentInstructors;
	// User.find({role: 'student', 'application.status':'new applicant', admissions:req.user})
	User.find({role: 'student', 'application.status':'new applicant'})
	.then(function(students){
		newApplicants = students;
		return User.find({role: 'instructor'});
	})
	.then(function(instructors){
		currentInstructors = instructors;
		return User.find({role: 'admissions'});
	})
	.then(function(admissions){
		res.render('admissions/admissions', {user:req.user, students:newApplicants, instructors:currentInstructors, admissions:admissions});
	})
	.catch(function(err) {
		throw err;
	});
};

controller.instructorIndex = function(req, res){
};

controller.update = function(req, res){
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
			// currentStudent.admissions = req.user;
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
