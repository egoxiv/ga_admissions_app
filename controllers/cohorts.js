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

cohorts.new = function(req, res){
  res.render('cohorts/new');
};

cohorts.create = function(req, res){
  var cohort = new Cohort();
  cohort.program = req.body.program;
  cohort.city = req.body.city;
  cohort.campus = req.body.campus;
  //dates are shifting one day back
  cohort.start = new Date(req.body.start);
  cohort.end = new Date(req.body.end);
  var biggest = 0;
  Cohort.find({campus: req.body.campus, program: req.body.program}, function(err, sections){
    sections.forEach(function(section){
      if(section.number > biggest){
        biggest = section.number;
      }
    });
    console.log(biggest);
    cohort.number = biggest + 1;
    if(cohort.save()){
      Cohort.find({}, function(err, classes){
        if(err) return res.json(err);
        things = classes;
        // redirects not working in any configuration
        res.render('cohorts/index');
      });
    }
  });
};

cohorts.show = function(req, res){
  Cohort.findById(req.params.id, function(err, cohort){
    if(err) return res.json(err);
    cohort.populate('instructors', function(err){
      if(err){
        throw err;
      }
      cohort.populate('students', function(err){
        if(err) return res.json(err);
        section = cohort;
        res.render('cohorts/show');
      });
    });
  });
};

cohorts.edit = function(req, res){
  Cohort.findById(req.params.id, function(err, cohort){
    if(err) return res.json(err);
    section = cohort;
    res.render('cohorts/edit');
  });
};

cohorts.update = function(req, res){
  Cohort.findById(req.params.id, function(err, cohort){
    if(err) return res.json(err);
  });
};

module.exports = cohorts;
