var express = require('express');
var router = express.Router();
var passport   = require('passport');
require('../config/passport-github')(passport);
router.route('/')
	.get(passport.authenticate('github', {scope: 'email'}));

router.route('/callback')
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

module.exports = router;