var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  city: String,
  pictureUrl: String,
  github: String,
  role: {type: 'String', enum: [
    'applicant',
    'student',
    'instructor',
    'admissions',
    'admin'
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
      //any addditional fields instructor fills out
    }
  },
  cohort: String,
});



var User = mongoose.model('User', userSchema);

module.exports = User;
