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
var Cohort = mongoose.model('Cohort', cohortSchema);

module.exports = Cohort;
