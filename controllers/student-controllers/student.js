var studentController = {};

studentController.index = function(req, res) {
  var user = req.user;
  res.render('student/index', { student: user });
};

studentController.logout = function(req,res){
	req.logout();
	res.redirect('/');
};

module.exports = studentController;
