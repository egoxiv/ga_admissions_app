var passport   = require('passport');
require('../config/passport-github')(passport);

// var mongoose = require('mongoose');
var controller = {};


controller.github = passport.authenticate('github', {scope: 'email'});

controller.callback = passport.authenticate('github', {successRedirect: '/instructor', failureRedirect:'/instructor'});

module.exports = controller;