var User       = require ('../../models/user');
var passport   = require('passport');
// require('../../config/passport-github')(passport);

var submitController = {};

submitController.github = passport.authenticate('github', {scope: 'email'});
submitController.callback=passport.authenticate('github', {successRedirect: '/student', failureRedirect:'/'});

submitController.index = function(req, res) {
  res.render('submit/submit');
};

submitController.logout = function(req,res){
  req.logout();
  res.redirect('/');
};

module.exports = submitController;
