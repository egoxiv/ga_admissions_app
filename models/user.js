var mongoose = require('mongoose');
var Cohort = require('./cohort');

var userSchema = new mongoose.Schema({
  name: String,
  email: String,
  access_token: String,
  phone: String,
  city: String,
  pictureUrl: String,
  github: String,
  role: {type: 'String', enum: [
    'applicant',
    'student',
    'instructor',
    'admissions', //can change applicant to student
    'admin' //can add or remove anyone and change anyone's role
  ]},
  application: {
    status: String,
    city: String,
    campus: String,
    program: String,
    whyGA: String, //Why did they choose GA?
    fieldInterest: String, //Why do they want to enroll in that program?
    websiteRepoUrl: String, //link to github repo for application assignment
    instructorEvaluation: {
      rating: Number,
      commited: Boolean,
      attitude: String,
      professionalism: String,
      motivation: String,
      experience: String,
      //any addditional fields instructor fills out
    }
  },
  cohort: {type: mongoose.Schema.Types.ObjectId, ref: 'Cohort'}
});

//search users by role
userSchema.statics.findByRole = function(role, cb){
  return this.find({role: role}, cb);
};



var User = mongoose.model('User', userSchema);

module.exports = User;
