var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require('hbs');
var session = require('express-session');
var passport = require('passport');
var multipart = require('connect-multiparty');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

//var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');
var User = require('./models/user');
var app = express();

// view engine setup
app.set('view engine','hbs');
app.set('views',__dirname+'/views');
hbs.registerPartials(__dirname+'/views/partials');

passport.use(User.createStrategy());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(multipart({uploadDir:__dirname + 'public/uploads'}));
app.use(cookieParser());
app.use(session({secret: 'hello! TMY', resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('public'));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function (req, res, next) {
  res.locals.user = req.user;
  next();
});

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/account', require('./routes/account'));
app.use('/admin', require('./routes/admin/index'));
// app.use('/post', require('./routes/post'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
