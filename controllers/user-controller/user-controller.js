var User = require ('../../models/user');
var userController = {};

userController.index = function(req, res){
  User.find({role: 'student', 'application.status': 'enrolled'})
    .then( function(student) {
      console.log(student);
      res.render('user/user', { users: users });
    })
    .catch( function(err) {
      console.log(err);
      res.json({ error: err });
    });
};

module.exports = userController;
