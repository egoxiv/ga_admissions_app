var express    = require('express');
var path       = require('path');
var logger     = require('morgan');
var bodyParser = require('body-parser');
var session    = require('express-session');
var app        = express();
var db         = require('./config/db');

var passport = require('passport');
var instructorAuthRoutes = require('./routes/instructor-auth');
var instructorRoutes = require('./routes/instructors');
app.set('views', path.join(__dirname + '/views'));

// Routes
var signUpRoute = require('./routes/signup-routes/signup-routes.js');

app.set('view engine', 'ejs');
app.use( express.static(__dirname + '/public') );


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'unicorns', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());


app.use('/sign-up', signUpRoute);

// app.get('/instructor', function(req,res){

// 	res.render('instructor', {user:req.user});
// });
app.use('/instructor', instructorRoutes);
app.use('/auth/github', instructorAuthRoutes);
var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Magic on:' + port);
});
