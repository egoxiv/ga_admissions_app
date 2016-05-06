var db = require('./config/db');
var Cohort = require('./models/cohort');
var User = require('./models/user');

User.remove({})
	.then(function(){
    	return Cohort.remove();
	})
 	.then(function(){
  	return User.create([
      {name:'Phil Lamplugh', email:'philco@ga.co', ga_email:'philco@ga.co',github:'https://github.com/phlco', github_username:'phlco', role:'instructor' },
      {name:'Kate Wood', email:'kate.wood@ga.co', ga_email:'kate.wood@ga.co',github:'https://github.com/KateWood', github_username: 'KateWood', role:'instructor' },
      // {name:'Matt Gutierrez', email:'matthew.gutierrez@generalassemb.ly', ga_email:'matthew.gutierrez@generalassemb.ly',github:'https://github.com/fatchicken007', github_username:'fatchicken007', role:'instructor' },
      // {name:'Evan Washington', email:'inudoshi2016@gmail.com', ga_email:'inudoshi2016@gmail.com',github:'https://github.com/Navyvet1125', role:'instructor', github_username:'navyvet1125' },
      // {name:'Matt Parvinsmith', email:'mrparvinsmith@gmail.com', ga_email:'mrparvinsmith@gmail.com',github:'https://github.com/mrparvinsmith', role: 'student' },
      {name:'Erik Gomez', email:'p3223er@yahoo.com', ga_email:'p3223er@yahoo.com',github:'https://github.com/egoxiv', github_username: 'egoxiv', role:'instructor' },
      {name:'Erik Gomez', email:'ego.xiv@gmail.com', ga_email:'ego.xiv@gmail.com', role:'admissions' }
      // {name:'Christina Regis', email:'christina.freeze@gmail.com', ga_email:'christina.freeze@gmail.com', github:'https://github.com/christina-regis', github_username: 'christina-regis', role:'student', 'application.status': 'pre evaluation' },
      // {name:'Evan Washington', email:'enavy04@gmail.com', ga_email:'enavy04@gmail.com',github:'https://github.com/Navyvet1125', role:'admissions' },
      // {name:'Josh Fadem', email:'josh.fadem@generalassemb.ly', ga_email:'josh.fadem@generalassemb.ly', github:'https://github.com/jfadem82', role:'admissions' }
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
          if (user.role==='instructor' && cohort.instructors.length < 3) {
            user.cohort = cohort._id;
            user.save();
            cohort.instructors.push(user._id);
          } else if (user.role==='student') {
            user.cohort = cohort._id;
            user.save();
            cohort.students.push(user._id);
          }
      });
      return cohort.save();
  })
  .catch(function(err){
    console.log(err);
    return err;
  })
  .then(function(results){
    console.log(results);
    process.exit();
  });
