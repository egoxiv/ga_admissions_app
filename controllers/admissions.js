var User       = require ('../models/user');
var Cohort     = require ('../models/cohort');
var db         = require('../config/db');
// var passport   = require('passport');
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

controller.status = function(req, res) {
  //  Status: In /admissions user can click on 'View status' and then be routed to /admissions/status which will run controller.status and render a list of all students with 'application.status': 'evaluated', if any errors are caught in catch and rendered as JSON.
  User.find({role: 'student', 'application.status':'evaluated'})
    .then(function(student) {
      res.render('admissions/status', {student: student});
    }).catch(function(error) {
      res.json({ error: error });
    });
};

module.exports = controller;
