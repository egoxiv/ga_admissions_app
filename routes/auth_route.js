var express = require('express');
var router = express.Router();
var passport   = require('passport');
require('../config/passport')(passport);
// require('../config/passport-google')(passport);
router.route('/github')
	.get(passport.authenticate('github', {scope: 'email', failureRedirect: '/auth/error/github'}));

router.route('/github/callback')
	.get(passport.authenticate('github', {failureRedirect: '/auth/error/github'}),function(req,res){
		console.log('The User is a ' + req.user.role);
		switch(req.user.role){
			case 'instructor':res.redirect('/instructor');
  			break;
			case 'student':res.redirect('/student');
  			break;
			default: res.redirect('/');
		}
	});
router.route('/google')
	.get(passport.authenticate('google', {scope: 'email', failureRedirect: '/auth/error/google'}));

router.route('/google/callback')
	.get(passport.authenticate('google', {failureRedirect: '/auth/error/google'}),function(req,res){
		console.log('This user is a ' + req.user.role);
		switch(req.user.role){
			case 'admissions':res.redirect('/admissions');
  			break;
			default: res.redirect('/auth/error/google');
		}
	});

router.route('/error/github')
  .get(function(req, res){
    res.render('error', {role: 'INSTRUCTOR', siteName: 'GitHub', siteUrl: 'https://github.com'});
  });

router.route('/error/google')
  .get(function(req, res){
    res.render('error', {role: 'ADMISSIONS PRODUCER', siteName: 'Google', siteUrl: 'http://google.com'});
  });

module.exports = router;
