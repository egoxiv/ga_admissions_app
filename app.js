var express    = require('express');
var path       = require('path');
var logger     = require('morgan');
var bodyParser = require('body-parser');
var session    = require('express-session');
var app        = express();
var db         = require('./config/db');

// Routes
var signUpRoute = require('./routes/signup-routes/signup-routes.js');

app.set('view engine', 'ejs');
app.use( express.static(__dirname + '/public') );


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'unicorns', resave: false, saveUninitialized: false }));

app.use('/sign-up', signUpRoute);

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Magic on:' + port);
});
