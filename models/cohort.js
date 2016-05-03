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

cohortSchema.methods.removeInstructor = function(id){
  var cohort = this;
  User.findById(id, function(err, instructor){
    if(err) throw err;
    var index = cohort.instructors.indexOf(id);
    cohort.instructors.splice(index, 1);
    instructor.cohort = null;
    instructor.save(function(err){
      if(err) throw err;
      return cohort.save();
    });
  });
};

cohortSchema.methods.removeStudent = function(id){
  var cohort = this;
  User.findById(id, function(err, student){
    if(err) throw err;
    var index = cohort.students.indexOf(id);
    cohort.students.splice(index, 1);
    student.cohort = null;
    student.save(function(err){
      if(err) throw err;
      return cohort.save();
    });
  });
};

var Cohort = mongoose.model('Cohort', cohortSchema);

module.exports = Cohort;
