var User       = require ('../models/user');
var Cohort     = require ('../models/cohort');
var passport   = require('passport');
var db         = require('../config/db');
require('../config/passport')(passport);

var controller = {};
controller.evaluated ={};

controller.index = function(req,res){
if(req.user !== undefined && req.user.role !=='instructor') res.redirect('/student');
	User.find({role:'student','application.status':'pre evaluation'})
	.then(function(students){
		res.render('instructor/instructor', {user:req.user, students:students});
	})
	.catch(function(err) {
		throw err;
	});
};

// Instructor notes from the interview are added into the applicant file.
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
			console.log(currentStudent.admissions);
			return User.findById(currentStudent.admissions);
		})
		.then(function(admissions){
			var admissionsEmail = admissions.ga_email;
			require('../config/nodemailer')(admissionsEmail,"Student Evaluated",currentStudent.name + " has been evaluated by "+req.user.name+"." ,"<p>" + currentStudent.name + " has been evaluated by "+req.user.name+".</p>");
			res.redirect('/instructor/');
		})
		.catch(function(err){
			throw err;
		});
};

controller.show = function(req, res){
	if(req.user.role !== 'instructor' && req.user.role !== 'admissions') res.redirect('/student');
	var results;
	User.findById(req.params.id)
		.then(function(student){
			results = student;
			res.render('instructor/student',{ student: results, user: req.user });
	});
};

controller.edit = function(req, res){
	switch(req.user.role){
		case 'student': res.redirect('/student');
		break;
		case 'admissions': res.redirect('/admissions');
		break;
		default: break;
	}

	var results;
	User.findById(req.params.id)
		.then(function(student){
			results = student;
			res.render('instructor/evaluation',{ student:results });
		});
};

controller.logout = function(req,res){
	req.logout();
	res.redirect('/');
};

// Shows all evaluated students
controller.evaluated.show= function(req,res){

  User.find({role: 'student', 'application.status':'evaluated'})
    .then(function(student) {
      res.render('admissions/status', {student: student});
    }).catch(function(error) {
      res.json({ error: error });
    });
};

module.exports = controller;
