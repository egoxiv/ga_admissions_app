var express    = require('express');
var path       = require('path');
var logger     = require('morgan');
var bodyParser = require('body-parser');
var session    = require('express-session');
var app        = express();
var db         = require('./config/db');
var passport   = require('passport');
var methodOverride = require('method-override');

//override post methods on forms
app.use(methodOverride('_method'));

// Routes


var userRoutes = require('./routes/user-routes/user-routes');
var cohortsRoute = require('./routes/cohorts');
var passport = require('passport');
var authRoutes = require('./routes/auth_route');
var submitRoute          = require('./routes/submit-routes/submit-routes');
var studentRoutes        = require('./routes/student-routes/student');
var instructorRoutes = require('./routes/instructors');

app.set('views', path.join(__dirname + '/views'));
app.set('view engine', 'ejs');
app.use( express.static(path.join(__dirname + '/public')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'unicorns', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());


app.get('/', function(req, res) {
  res.render('welcome/welcome');
});

app.use('/submits', submitRoute);

app.use('/student', studentRoutes);

app.use('/instructor', instructorRoutes);

app.use('/user', userRoutes);

app.use('/auth/github', authRoutes);

app.use('/cohorts', cohortsRoute);

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Magic on:' + port);
});
