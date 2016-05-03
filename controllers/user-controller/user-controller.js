var User = require ('../../models/user');
var userController = {};

userController.index = function(req, res){
    User.find({role: 'student'}, function(err, users){
      if(err){
       throw err;
     }
      res.render('user/user', {users: users});
    });
};

module.exports = userController;
