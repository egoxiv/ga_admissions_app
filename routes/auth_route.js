var express = require('express');
var router = express.Router();
var passport   = require('passport');
require('../config/passport-github')(passport);
require('../config/passport-google')(passport);
router.route('/github')
	.get(passport.authenticate('github', {scope: 'email'}));

router.route('/github/callback')
	.get(passport.authenticate('github'),function(req,res){
		console.log('The user is a ' + req.user.role);
		switch(req.user.role){
			case 'instructor':res.redirect('/instructor');
  			break;
			case 'student':res.redirect('/student');
  			break;
			default: res.redirect('/');
		}
	});
router.route('/google')
	.get(passport.authenticate('google', {scope: 'email'}));

router.route('/google/callback')
	.get(passport.authenticate('google'),function(req,res){
		console.log('The user is a ' + req.user.role);
		switch(req.user.role){
			case 'admissions':res.redirect('/admissions');
  			break;
			default: res.redirect('/');
		}
	});

module.exports = router;
