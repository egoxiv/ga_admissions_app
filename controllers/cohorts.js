var Cohort = require('../models/cohort');
var User = require('../models/user');
var cohorts = {};

cohorts.index = function(req, res){
  Cohort.find({}, function(err, classes){
    if(err) return res.json(err);
    things = classes;
    res.render('cohorts/index');
  });
};

module.exports = cohorts;
