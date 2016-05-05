var User       = require ('../models/user');
var Cohort     = require ('../models/cohort');
var passport   = require('passport');
var db         = require('../config/db');
require('../config/passport')(passport);

// var mongoose = require('mongoose');
var controller = {};
controller.evaluated ={};

controller.index = function(req,res){
if(req.user !== undefined && req.user.role !=='instructor') res.redirect('/student');
	User.find({instructor: req.user, role:'student','application.status':'pre evaluation'})
	.then(function(students){
		res.render('instructor/instructor', {user:req.user, students:students});
	})
	.catch(function(err) {
		throw err;
	});
};

controller.update = function(req, res){
	var currentStudent;
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
			currentStudent = student;
			return User.findById(student.admissions);
		})
		.then(function(admissions){
			var admissionsEmail =req.user.email; //When ready, set to admissions.ga_email;
			require('../config/nodemailer')(admissionsEmail,"Student Evaluated",currentStudent.name + " has been evaluated by "+req.user.name+"." ,"<p>" + currentStudent.name + " has been evaluated by "+req.user.name+".</p>");
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
	res.redirect('/');
};

controller.evaluated.index= function(req,res){};

controller.evaluated.show= function(req,res){  //  Status: In /admissions user can click on 'View status' and then be routed to /admissions/status which will run controller.status and render a list of all students with 'application.status': 'evaluated', if any errors are caught in catch and rendered as JSON.
  User.find({role: 'student', 'application.status':'evaluated'})
    .then(function(student) {
      res.render('admissions/status', {student: student});
    }).catch(function(error) {
      res.json({ error: error });
    });
};

controller.evaluated.update= function(req,res){};
controller.evaluated.delete= function(req,res){};

module.exports = controller;