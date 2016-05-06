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
      currentStudent.admissions = req.user;
      currentStudent.application.status = 'pre evaluation';
      return currentStudent.save();
    })
    .then(function(student){
      var studentMessage ="Hi, " + student.name + "!  You have been scheduled for an interview with instructor "+currentInstructor.name+".  The time of the interview will be: " +dateAndTime+".  If you have an issue with the time then please let us know as soon as possible";
      return require('../config/nodemailer')(student.email,"You have an interview!!!",studentMessage,"<p>" + studentMessage +".</p>");
    })
    .then(function(student){
      var instructorMessage ="Hi, " + currentInstructor.name + "!  You have been scheduled for an interview with a new prospective student name: "+currentStudent.name+".  The time of the interview will be: " +dateAndTime+".  If you have an issue with the time then please let us know as soon as possible";
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

controller.destroy = function(req, res){
  var currentStudent;
  User.findByIdAndRemove(req.params.id)
    .then(function(student){
      currentStudent = student;
      return User.findById(student.admissions);
    })
    .then(function(admissions){
      var studentMessage ="Dear, " + currentStudent.name + ".  I regret to inform you that you have not met the criteria to enter into our program.  Please feel free to contact us again in 6 months after you have spent some time familiarizing yourself with HTML and CSS.  If you have any questions please contact your Admissions representative.  Best wishes,"+admissions.name+'Admissions';
      var studentHTML ="<h1>Dear, " + currentStudent.name + ".</h1><p>I regret to inform you that you have not met the criteria to enter into our program.  Please feel free to contact us again in 6 months after you have spent some time familiarizing yourself with HTML and CSS.  If you have any questions please contact your Admissions representative.</p><p>Best wishes,<br/>"+admissions.name+'<br/>Admissions';
      return require('../config/nodemailer')(currentStudent.email,"Notice from GA!",studentMessage, studentHTML);
    })
    .then(function(results){
      res.status(200).send(results);
    })
    .catch(function(err){
      res.send(500).send(err);
    });
};

controller.accepted = function(req, res){
  var currentStudent;
  User.findById(req.params.id)
    .then(function(student){
      student.application.status='accepted';
      return student.save();
    })
    .then(function(student){
      currentStudent = student;
      return User.findById(student.admissions);
    })
    .then(function(admissions){
      var studentMessage ="Congratulations, " + currentStudent.name + "!  You have been accepted into the WDI program.  We will be contacting you shortly with information on the cohort you'll be assigned to.  If you have any questions please contact your Admissions representative.  Good luck;"+admissions.name+'Admissions';
      var studentHTML ="<h1>Congratulations, " + currentStudent.name + "!</h1><p>  You have been accepted into the WDI program.  We will be contacting you shortly with information on the cohort you'll be assigned to.  If you have any questions please contact your Admissions representative.</p><p>Good luck;<br/>"+admissions.name+'<br/>Admissions';
      return require('../config/nodemailer')(currentStudent.email,"Welcome to GA!",studentMessage, studentHTML);
    })
    .then(function(results){
      res.status(200).send(results);
    })
    .catch(function(err){
      res.send(500).send(err);
    });
};


module.exports = controller;