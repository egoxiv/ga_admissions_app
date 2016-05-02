var mongoose = require('mongoose');
var User = require('./user');

var cohortSchema = new mongoose.Schema({
  program: String,
  number: Number,
  city: String,
  campus: String,
  start: Date,
  end: Date,
  instructors: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  students: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
});

cohortSchema.methods.name = function(){
  var title = this.program + '-' + this.campus + '-' + this.number;
  return title;
};

cohortSchema.methods.startDate = function(){
  var day = this.start.toDateString();
  return day.substring(4);
};

cohortSchema.methods.endDate = function(){
  var day = this.end.toDateString();
  return day.substring(4);
};

var Cohort = mongoose.model('Cohort', cohortSchema);

module.exports = Cohort;
