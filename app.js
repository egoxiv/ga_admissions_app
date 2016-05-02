var express    = require('express');
var path       = require('path');
var logger     = require('morgan');
var bodyParser = require('body-parser');
var session    = require('express-session');
var app        = express();
var db         = require('./config/db');
var cookieParser = require('cookie-parser');

// auth
var passport = require('passport');
var GithubStrategy = require('passport-github').Strategy;

// Routes
var submitRoute = require('./routes/submit-routes/submit-routes');

app.set('view engine', 'ejs');
app.use( express.static(__dirname + '/public') );

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'unicorns', resave: false, saveUninitialized: false }));

// passport stuff - http://blog.revathskumar.com/2014/06/express-github-authentication-with-passport.html
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.use('/submit', submitRoute);

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Magic on:' + port);
});
