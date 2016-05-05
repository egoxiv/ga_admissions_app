var Cohort = require('../models/cohort');
var User = require('../models/user');
var cohorts = {};

cohorts.index = function(req, res){
  Cohort.find({}, function(err, classes){
    if(err) return res.json(err);
    res.render('cohorts/index', {sections: classes, user: req.user});
  });
};

cohorts.new = function(req, res){
  res.render('cohorts/new', {user: req.user});
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
      res.redirect('cohorts/' + cohort._id);
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
        res.render('cohorts/show', {user: req.user});
      });
    });
  });
};

cohorts.edit = function(req, res){
  Cohort.findById(req.params.id, function(err, cohort){
    if(err) return res.json(err);
    section = cohort;
    res.render('cohorts/edit', {user: req.user});
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
    User.searchNameAndRole(req.body.name, 'instructor', function(err, instructor){
      if(err) {
        return res.json({error: err});
      } else if(!instructor){
        return res.json({error: req.body.name + ' could not be found.'});
      } else if(!instructor.cohort){
        cohort.addInstructor(instructor);
        res.json(cohort);
      } else {
        res.json({error: 'That instructor has already been assigned to a cohort.'});
      }
    });
  });
};

cohorts.addStudent = function(req, res){
  Cohort.findById(req.params.id, function(err, cohort){
    if(err) return res.json(err);
    User.searchNameAndRole(req.body.name, 'student', function(err, student){
      if(err) {
        return res.json({error: err});
      } else if (!student){
        return res.json({error: req.body.name + ' could not be found.'});
      } else if(!student.cohort && student.application.status === 'accepted'){
        cohort.addStudent(student);
        res.json(cohort);
      } else {
        res.json({error: 'That student has already been assigned to a cohort.'});
      }
    });
  });
};

cohorts.api = function(req, res){
  Cohort.findById(req.params.id, function(err, cohort){
    if(err){
      return res.json({error: err});
    }
    cohort.populate('instructors', function(err){
      if(err){
        return res.json({error: err});
      }
      cohort.populate('students', function(err){
        if(err){
          return res.json({error: err});
        }
        res.json(cohort);
      });
    });
  });
};

cohorts.error = function(req, res){
  res.render('cohorts/error');
};

module.exports = cohorts;
