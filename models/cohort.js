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

cohortSchema.methods.name = function(){
  var title = this.program + '-' + this.campus + '-' + this.number;
  return title;
};

var Cohort = mongoose.model('Cohort', cohortSchema);

module.exports = Cohort;
