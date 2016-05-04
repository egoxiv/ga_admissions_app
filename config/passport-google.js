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
    });
  });

  passport.use('google', new GoogleStrategy({
    clientID: process.env.GMAIL_API_KEY,
    clientSecret: process.env.GMAIL_SECRET_KEY,
    callbackURL: 'http://localhost:3000/auth/facebook/callback',
    enableProof: true,
    profileFields: ['name', 'emails']
  }))

}
