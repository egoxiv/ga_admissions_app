var studentController = {};

studentController.index = function(req, res) {
  res.render('student/index');
};

module.exports = studentController;
