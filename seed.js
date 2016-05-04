var db = require('./config/db');
var Cohort = require('./models/cohort');
var User = require('./models/user');

User.remove({})
  .then(function(){
      return Cohort.remove();
  })
  .then(function(){
<<<<<<< HEAD
    return User.create([
        {name:'Phil Lamplugh', email:'philco@ga.com',github:'https://github.com/phlco', role:'instructor' },
        {name:'Kate Wood', email:'katewood611@gmail.com',github:'https://github.com/KateWood', role:'instructor' },
        {name:'Matt Gutierrez', email:'matthew.gutierrez@generalassemb.ly',github:'https://github.com/fatchicken007', role:'instructor' },
        {name:'Matt Parvinsmith', email:'mrparvinsmith@gmail.com',github:'https://github.com/mrparvinsmith', role: 'student' },
        {name:'Christina Regis', email:'christina.freeze@gmail.com',github:'https://github.com/christina-regis', role:'student' },
        {name:'Evan Washington', email:'enavy04@gmail.com',github:'https://github.com/Navyvet1125', role:'student' },
        {name:'Erik Gomez', email:'ego.xiv@gmail.com',github:'https://github.com/egoxiv', role:'student' },
        ]);
  })
  .then(function(users){
    var cohort = new Cohort();
    cohort.program = 'WDI';
    cohort.campus = 'SM';
    cohort.number = 22;
    cohort.city = 'Santa Monica, CA';
    cohort.start = new Date('March 7, 2016');
    cohort.end = new Date('May 27, 2016');
    users.forEach(function(user){
        user.cohort = cohort._id;
        user.save();
        if (user.role==='instructor') cohort.instructors.push(user._id);
        else if (user.role==='student') cohort.students.push(user._id);
    });
    return cohort.save();
=======
      return User.create([
          {name:'Phil Lamplugh', email:'philco@ga.com',github:'https://github.com/phlco', role:'instructor' },
          {name:'Kate Wood', email:'katewood611@gmail.com',github:'https://github.com/KateWood', role:'instructor' },
          {name:'Matt Gutierrez', email:'matthew.gutierrez@generalassemb.ly',github:'https://github.com/fatchicken007', role:'instructor' },
          {name:'Matt Parvinsmith', email:'mrparvinsmith@gmail.com',github:'https://github.com/mrparvinsmith', role: 'student' },
          {name:'Christina Regis', email:'christina.freeze@gmail.com',github:'https://github.com/christina-regis', role:'student' },
          {name:'Evan Washington', email:'enavy04@gmail.com',github:'https://github.com/Navyvet1125', role:'instructor' },
          {name:'Erik Gomez', email:'ego.xiv@gmail.com',github:'https://github.com/egoxiv', role:'student' },
        ]);
  })
  .then(function(users){
      var cohort = new Cohort();
      cohort.program = 'WDI';
      cohort.campus = 'SM';
      cohort.number = 22;
      cohort.city = 'Santa Monica, CA';
      cohort.start = new Date('March 7, 2016');
      cohort.end = new Date('May 27, 2016');
      users.forEach(function(user){
          user.cohort = cohort._id;
          user.save();
          if (user.role==='instructor') cohort.instructors.push(user._id);
          else if (user.role==='student') cohort.students.push(user._id);
      });
      return cohort.save();
>>>>>>> fa47418193bc7d9c5386d6c533d4c9c75105d1d3
  })
  .catch(function(err){
    console.log(err);
    return err;
  })
  .then(function(results){
    console.log(results);
    process.exit();
  });
