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
	User.find({role: 'student', 'application.status':'new applicant'})
	.then(function(students){
		newApplicants = students;
		return User.find({role: 'instructor'});
	})
	.then(function(instructors){
		res.render('admissions/admissions', {user:req.user, students:newApplicants, instructors:instructors});
	})
	.catch(function(err) {
		throw err;
	});
};

controller.instructorIndex = function(req, res){
};

controller.update = function(req, res){
};
controller.show = function(req, res){

};
controller.edit = function(req, res){
};

controller.logout = function(req,res){
	req.logout();
	res.redirect('/');
};

module.exports = controller;
