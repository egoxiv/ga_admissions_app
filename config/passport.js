var User = require('../models/user');
var GithubStrategy = require('passport-github').Strategy;
var GoogleStrategy = require('passport-google-oauth2').Strategy;

// Wrap it in a function to make it callable
var passportFunction = function(passport){
	passport.serializeUser( function(user,done){
		done(null, user.id);
	});
	passport.deserializeUser(function(id,done){
		var newId;
		// Code to handle the diffences between github oauth1 and google oauth2
		//oath1 id is a string id but oauth2 id is an object
		//mongoose needs a string for findById to work
		if(typeof id!=='string'){
			newId = id[0]._id;
		} else {
			newId = id;
		}
		User.findById(newId, function(err,user){
			console.log('deserializing user...');
			done(err, user);
		});
	});

	// Login for Admissions.
	// WARNING, ONLY USERS SEEDED IN THE DB CAN LOGIN THROUGH GOOGLE
  passport.use('google', new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    passReqToCallback: true,
  }, function(request, accessToken, refreshToken, profile, done){
      User.findOne({'ga_email': profile.emails[0].value}, function(err, user){
        if (err) {
          return done(err);
        } else {
          if (user) {
            return done(null, user);
          } else {
            return done(null, null);
          }
        }
      });
  }));

  // Login for students and instructors.
  // Only instructors already in the system will be logged in as instructors
  // All others will be made new students.
	passport.use('github', new GithubStrategy({
		clientID: process.env.GITHUB_API_KEY,
		clientSecret: process.env.GITHUB_API_SECRET,
		callbackURL: process.env.GITHUB_CALLBACK_URL,
		enableProof: true,
		profileFields: ['name', 'email']
	}, function(access_token, refresh_token, profile, done){
		process.nextTick(function(){
			User.findOne({'github_username': profile._json.login})
				.then(function(user){
					if(user){
						return user;
					} else{
						// Creates a new student based on info from Github
						var newUser = new User();
						newUser.access_token =access_token;
						newUser.name =profile._json.name;
						newUser.github_username =profile._json.login;
						newUser.email =profile._json.email;
            newUser.github_username =profile._json.login;
						newUser.github = profile._json.html_url;
						newUser.city = profile._json.location;
						newUser.avatar =profile._json.avatar_url;
						newUser.role='student';
						newUser.application.status= 'new applicant';
						return newUser.save();
					}
				})
				.then(function(user){
					return done(null,user);
				})
				.catch(function(err){
					throw err;
				});
		});
	}));
};

module.exports = passportFunction;
