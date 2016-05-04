var User       = require ('../models/user');
var Cohort     = require ('../models/cohort');
// var passport   = require('passport');
var db         = require('../config/db');
// require('../config/passport-google2')(passport);

// var mongoose = require('mongoose');
var controller = {};



controller.index = function(req,res){
if(req.user !== undefined && req.user.role !=='admissions') res.redirect('/');
	var newApplicants;
	var currentInstructors;
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
