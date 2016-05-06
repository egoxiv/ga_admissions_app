var User = require('../../models/user');
var studentController = {};

studentController.index = function(req, res) {
  var user = req.user;
  console.log(user);
  res.render('student/index', { student: user });
};

studentController.logout = function(req,res){
	req.logout();
	res.redirect('/');
};

studentController.api = function(req, res){
  User.find({}, function(err, students){
    if(err) throw err;
    res.json(students);
  });
};

module.exports = studentController;
