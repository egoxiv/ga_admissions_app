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
  cohort.start = new Date(req.body.start);
  cohort.end = new Date(req.body.end);
  var biggest = 0;
  Cohort.find({campus: req.body.campus, program: req.body.program}, function(err, sections){
    sections.forEach(function(section){
      if(section.number > biggest){
        biggest = section.number;
      }
    });
    cohort.number = biggest + 1;
    cohort.save(function(err){
      if(err) return res.json(err);
      res.redirect('/cohorts/' + cohort._id);
    });
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
    cohort.program = req.body.program;
    cohort.city = req.body.city;
    cohort.campus = req.body.campus;
    cohort.number = req.body.number;
    cohort.start = new Date(req.body.start);
    cohort.end = new Date(req.body.end);
    cohort.save(function(err){
      if(err) return res.json(err);
      res.redirect('/cohorts/' + cohort._id);
    });
  });
};

cohorts.removeInstructor = function(req, res){
  Cohort.findById(req.params.id, function(err, cohort){
    cohort.removeInstructor(req.query.instructorId);
    res.json({message: 'deleted'});
  });
};

cohorts.removeStudent = function(req, res){
  Cohort.findById(req.params.id, function(err, cohort){
    cohort.removeStudent(req.query.studentId);
    res.json({message: 'deleted'});
  });
};

cohorts.addInstructor = function(req, res){
  Cohort.findById(req.params.id, function(err, cohort){
    if(err) return res.json(err);
    User.findOne({name: req.body.name, role: 'instructor'}, function(err, instructor){
      if(err) return res.json(err);
      cohort.addInstructor(instructor);
      res.json(cohort);
    });
  });
};

cohorts.addStudent = function(req, res){
  Cohort.findById(req.params.id, function(err, cohort){
    if(err) return res.json(err);
    User.findOne({name: req.body.name, role: 'student'}, function(err, student){
      if(err) return res.json(err);
      cohort.addStudent(student);
      res.json(cohort);
    });
  });
};

cohorts.api = function(req, res){
  Cohort.findById(req.params.id, function(err, cohort){
    if(err){
      throw err;
    }
    cohort.populate('instructors', function(err){
      if(err){
        throw err;
      }
      cohort.populate('students', function(err){
        if(err){
          throw err;
        }
        res.json(cohort);
      });
    });
  });
};

module.exports = cohorts;
