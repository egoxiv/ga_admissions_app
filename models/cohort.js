var mongoose = require('mongoose');

var cohortSchema = new mongoose.Schema({
  program: String,
  number: Number,
  city: String,
  campus: String,
  instructors: Array
});



var Cohort = mongoose.model('Cohort', cohortSchema);

module.exports = Cohort;
