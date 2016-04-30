var express    = require('express');
var path       = require('path');
var logger     = require('morgan');
var bodyParser = require('body-parser');
var session    = require('express-session');
var app        = express();
var db         = require('./config/db');
var instructorRoutes = require('./routes/instructor');
app.set('views', path.join(__dirname + 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'unicorns',
  resave: false,
  saveUninitialized: false
}));

app.use('/instructors', instructorRoutes);
var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Magic on:' + port);
});
