var mongoose = require('mongoose');
var Cohort = require('./cohort');

var notesSchema = new mongoose.Schema({
  rating: Number,
  notes: String
});
var booleanNotesSchema = new mongoose.Schema({
  rating: Boolean,
  notes: String
});

var userSchema = new mongoose.Schema({
  name: String,
  email: String,
  ga_email: String,
  access_token: String,
  phone: String,
  city: String,
  github: String,
  avatar: String,
  staff_campus: String,
  instructor: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  admissions: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  role: {type: 'String', enum: [
    'student',
    'instructor',
    'frontlines',
    'admissions', //can change applicant to student
    'admin' //can add or remove anyone and change anyone's role
  ]},
  application: {
    status:{type: String, enum:['new applicant','pre evaluation', 'evaluated','enrolled','N/A'], default:'new applicant'},
    campus: String,
    program: {type: String, default:'WDI'},
    instructorEvaluation: {
      dateAndTime :Date,
      whyGA: String, //Why did they choose GA?
      onTime: booleanNotesSchema,
      professionalism: notesSchema,
      motivation: notesSchema,
      commitment: notesSchema,
      timeCommit: booleanNotesSchema,
      experience: notesSchema,
      attitude: notesSchema,
      wpm: notesSchema,
      skill: notesSchema,
      hasMac:booleanNotesSchema,
      overall: notesSchema,
      completed: {type: Boolean, default: false}
      //any addditional fields instructor fills out
    }
  },
  cohort: {type: mongoose.Schema.Types.ObjectId, ref: 'Cohort'}
});

//search users by role
userSchema.statics.findByRole = function(role, cb){
  return this.find({role: role}, cb);
};

userSchema.statics.searchNameAndRole = function(name, role, cb){
  this.find({role: role}, function(err, users){
    if(err) return err;
    var person;
    users.forEach(function(user){
      console.log(user.name);
      if(user.name.toLowerCase() === name.toLowerCase()){
        person = user;
      }
    });
    return cb(err, person);
  });
};

var User = mongoose.model('User', userSchema);

module.exports = User;
