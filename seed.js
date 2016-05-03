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
			{name:'Kate Wood', email:'katewood611@gmail.com',github:'https://github.com/KateWood', role:'instructor' },
			{name:'Matt Gutierrez', email:'matthew.gutierrez@generalassemb.ly',github:'https://github.com/fatchicken007', role:'instructor' },
			{name:'Matthew Parvinsmith', email:'mrparvinsmith@gmail.com',github:'https://github.com/mrparvinsmith', role:'student', avatar: 'https://s-media-cache-ak0.pinimg.com/736x/9b/d5/c9/9bd5c957b749031cc24291824276623b.jpg', 'application.status': 'enrolled'},
			{name:'Christina Regis', email:'christina.freeze@gmail.com',github:'https://github.com/christina-regis', role:'instructor' },
			{name:'Evan Washington', email:'enavy04@gmail.com',github:'https://github.com/Navyvet1125', role:'student', avatar: 'http://images.shibashake.com/wp-content/blogs.dir/7/files/2012/03/375757_10150889470687524_800937523_12981704_1473609087_n-520x346.jpg', 'application.status': 'enrolled' },
			{name:'Erik Gomez', email:'ego.xiv@gmail.com',github:'https://github.com/egoxiv', role:'student', avatar: 'http://www.pawderosa.com/images/puppies.jpg', 'application.status': 'enrolled' },

			]);
	})
	.then(function(users){
		var cohort = new Cohort();
		cohort.program ='WDI';
		cohort.campus='SM';
		cohort.number = 22;
		cohort.city='Santa Monica, CA';
    cohort.start = new Date('March 7, 2016');
    cohort.end = new Date('May 27, 2016');
		users.forEach(function(user){
			user.cohort = cohort.id;
			user.save();
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
