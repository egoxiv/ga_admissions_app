var User = require('../models/user.js');
var GoogleStrategy = require('passport-google-oauth2').Strategy;

var passportGoogle = function(passport){
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
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/google/callback',
    passReqToCallback: true,
  }, function(request, accessToken, refreshToken, profile, done){
        User.find({'email': profile.email}, function(err, user){
          if (err) return done(err);
          if (user) {
            return done(null, user);
          }
          else {
            var newUser = new User();
            newUser.access_token = access_token;
            newUser.name = profile.displayName;
            newUser.save(function(err){
              if (err)
                throw err;
              return done(null, newUser);
            });
          }
        });
  }));

};

module.exports = passportGoogle;
