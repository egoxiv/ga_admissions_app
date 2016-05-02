var db = require('./config/db');
var Cohort = require('./models/cohort');
var User = require('./models/user');
User.remove({})
    .then(function(){
        return Cohort.remove();
    })
    .then(function(){
        return User.create([
            {name:'Phil Lamplugh', email:'philco@ga.com',github:'https://github.com/phlco', role:'instructor' },
            {firstName:'Kate', lastName:'Wood', email:'katewood611@gmail.com',github:'https://github.com/KateWood', role:'instructor' },
            {name:'Matt Gutierrez', email:'matthew.gutierrez@generalassemb.ly',github:'https://github.com/fatchicken007', role:'instructor' },
            {name:'Matt Parvinsmith', email:'mrparvinsmith@gmail.com',github:'https://github.com/mrparvinsmith', role:'student' },
            {name:'Christina Regis', email:'christina.freeze@gmail.com',github:'https://github.com/christina-regis', role:'student' },
            {name:'Evan Washington', email:'enavy04@gmail.com',github:'https://github.com/Navyvet1125', role:'student' },
            {name:'Erik Gomez', email:'ego.xiv@gmail.com',github:'https://github.com/egoxiv', role:'student' },
            ]);
    })
    .then(function(users){
        var cohort = new Cohort();
        cohort.program ='WDI';
        cohort.campus='SM';
        cohort.number = 22;
        cohort.city='Santa Monica, CA';
        users.forEach(function(user){
            if (user.role==='instructor') cohort.instructors.push(user);
            else if (user.role==='student') cohort.students.push(user);
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
