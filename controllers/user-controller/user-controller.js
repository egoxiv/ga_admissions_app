var User = require ('../../models/user');
var userController = {};

userController.index = function(req, res){
  User.find({}, function(err, users){
    if(err){
      throw err;
    }
    res.json(users);
  });
};

module.exports = userController;
