var User = require ('../models/user');
var Cohort = require ('../models/cohort');
var passport = require('passport');
var db         = require('../config/db');
require('../config/passport-github')(passport);

// var mongoose = require('mongoose');
var controller = {};

controller.github = passport.authenticate('github', {scope: 'email'});
controller.callback=passport.authenticate('github', {successRedirect: '/instructor', failureRedirect:'/instructor'});


controller.index = function(req,res){
	var cohortList={};
	Cohort.find({instructors: req.user})
	.then(function(cohorts){
		cohorts.forEach(function(cohort){
			cohortList[cohort.id] = {name:cohort.program+'-'+cohort.campus+'-'+cohort.number, students:[] };
		});
		return User.find({cohort: {$in: cohorts}, role:'student'});
	})
	.then(function(students){
		students.forEach(function(student){
			cohortList[student.cohort].students.push(student);
		});
		console.log(cohortList);
		res.render('instructor/instructor', {user:req.user, cohorts:cohortList});
	})
	.catch(function(err) {
		throw err;
	});
};

controller.update = function(req, res){
};
controller.show = function(req, res){
	var results;
	User.findById(req.params.id)
		.then(function(student){
			results = student;
			return Cohort.findOne({students: student});
		})
		.then(function(cohort){
			var cohortName = cohort.program+'-'+cohort.campus+'-'+cohort.number;
			res.render('instructor/student',{student:results, cohort: cohortName});
		});
};
controller.edit = function(req, res){

};

controller.logout = function(req,res){
	req.logout();
	res.redirect('/instructor');
};

module.exports = controller;