var studentController = {};

studentController.index = function(req, res) {
  console.log(req.user);
  console.log(res);

  var user = req.user;
  res.render('student/index', { student: user });
};

module.exports = studentController;
