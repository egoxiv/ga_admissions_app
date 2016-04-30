var mongoose = require('mongoose');
var User = require('./user');

var cohortSchema = new mongoose.Schema({
  program: String,
  number: Number,
  city: String,
  campus: String,
  instructors: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  students: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
});

cohortSchema.methods.addInstructor  = function (user){
	this.instructors.push(user._id);
	this.save();
};

cohortSchema.methods.addStudent  = function (user){
	this.students.push(user._id);
	this.save();
};


var Cohort = mongoose.model('Cohort', cohortSchema);

module.exports = Cohort;
