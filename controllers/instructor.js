var User       = require ('../models/user');
var Cohort     = require ('../models/cohort');
var passport   = require('passport');
var db         = require('../config/db');
require('../config/passport-github')(passport);

// var mongoose = require('mongoose');
var controller = {};

controller.github = passport.authenticate('github', {scope: 'email'});
controller.callback=passport.authenticate('github', {successRedirect: '/instructor', failureRedirect:'/instructor'});


controller.index = function(req,res){
if(req.user !== undefined && req.user.role !=='instructor') res.redirect('/student');
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
	User.findById(req.body.student_id)
		.then(function(student){
			console.log(student);
			student.application.status = 'evaluated';
			student.application.instructorEvaluation.whyGA = req.body.why_ga;
			student.application.instructorEvaluation.onTime = {rating: req.body.on_time, notes: req.body.on_time_notes};
			student.application.instructorEvaluation.professionalism = {rating: req.body.professionalism, notes: req.body.professionalism_notes};
			student.application.instructorEvaluation.motivation = {rating: req.body.motivated, notes: req.body.motivated_notes};
			student.application.instructorEvaluation.commitment = {rating: req.body.commitment, notes: req.body.commitment_notes};
			student.application.instructorEvaluation.timeCommit = {rating: req.body.can_commit, notes: req.body.can_commit_notes};
			student.application.instructorEvaluation.experience = {rating: req.body.experienced, notes: req.body.experienced_notes};
			student.application.instructorEvaluation.attitude = {rating: req.body.attitude, notes: req.body.attitude_notes};
			student.application.instructorEvaluation.skill = {rating: req.body.skill, notes: req.body.skill_notes};
			student.application.instructorEvaluation.wpm = {rating: req.body.wpm, notes: req.body.wpm_notes};
			student.application.instructorEvaluation.hasMac = {rating: req.body.have_mac, notes: req.body.mac_notes};
			student.application.instructorEvaluation.overall = {rating: req.body.overall, notes: req.body.overall_notes};
			student.application.instructorEvaluation.completed = true;
			return student.save();
		})
		.then(function(student){
			require('../config/nodemailer')(req.user.email,"Student Evaluated",student.name + " has been evaluated by "+req.user.name+"." ,"<p>" + student.name + " has been evaluated by "+req.user.name+".</p>");
			res.redirect('/instructor/students/'+req.body.student_id);
		})
		.catch(function(err){
			throw err;
		});

};
controller.show = function(req, res){
	if(req.user.role !== 'instructor') res.redirect('/student');
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
	if(req.user.role !== 'instructor') res.redirect('/student');
	var results;
	User.findById(req.params.id)
		.then(function(student){
			results = student;
			return Cohort.findOne({students: student});
		})
		.then(function(cohort){
			var cohortName = cohort.program+'-'+cohort.campus+'-'+cohort.number;
			res.render('instructor/evaluation',{student:results, cohort: cohortName});
		});

};

controller.logout = function(req,res){
	req.logout();
	res.redirect('/instructor');
};

module.exports = controller;
