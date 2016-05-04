var User = require('../models/user.js');
var GoogleStrategy = require('passport-google').Strategy;

module.exports = function(passport){
  passport.serializeUser(function(user, done){
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
      console.log('deserializing user:', user);
      done(err, user);
    })
  })

}
