// Student.find({})
var User       = require ('../../models/user');
var passport   = require('passport');
require('../../config/passport-github')(passport);

var submitController = {};

submitController.github = passport.authenticate('github', {scope: 'email'});
submitController.callback=passport.authenticate('github', {successRedirect: '/instructor', failureRedirect:'/instructor'});

submitController.index = function(req, res) {
  res.render('submit/submit');
};

submitController.create = function(req, res) {};

submitController.new = function(req, res) {};

submitController.update = function(req, res) {};

submitController.show = function(req, res) {};

submitController.edit = function(req, res) {};

submitController.destroy = function(req, res) {};

module.exports = submitController;
