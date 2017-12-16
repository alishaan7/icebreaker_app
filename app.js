var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// Routes
// console.log("Call Question Route");
var question = require('./routes/question');
// console.log("Call IceBreaker Route");
var icebreaker = require('./routes/icebreaker');
// console.log("Call Response Route");
var response = require('./routes/response');

// Load Controllers
// console.log("Call Questions Controler");
const QuestionsController = require("./controller/QuestionsController");
// console.log("Call IceBreakers Controler");
const IceBreakersController = require("./controller/IceBreakersController");
// console.log("Call Response Controler");
const ResponsesController = require("./controller/ResponsesController");

// Load Models
const Question = require("./models/Question")
const Icebreaker = require("./models/IceBreaker")
const Response = require("./models/Response")

// Run Migrations

async function Migrate() {
  // console.log("Creating Questions Table");
  await Question.CreateTable();
  // console.log("Creating IceBreakers Table");
  await Icebreaker.CreateTable();
  // console.log("Creating Response Table");
  await Response.CreateTable();
  // console.log("Success");
}
Migrate();
var app = express();

// view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', question);
app.use('/icebreakers', icebreaker);
app.use('/responses', response);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
