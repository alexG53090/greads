var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var books = require('./routes/books');
var authors = require('./routes/authors');
var getbooks = require('./routes/getbooks');
var app = express();
var cors = require('cors');
var knex = require('knex')({
  client: 'pg',
  connection: 'postgres://wptugffjhbpqta:V8lvqBLY6Ry12tRP0GW7mQ87Zj@ec2-54-83-40-119.compute-1.amazonaws.com:5432/d6b88ef20b57to?ssl=true'
});
// use modules
app.set('view engine', 'html');
app.use(express.static('./views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(logger('dev'));
app.use(cookieParser());
app.use('/', routes);
app.use('/books', books);
app.use('/authors', authors);
app.use('/getbooks', getbooks);

// radnom
app.get('/edit', function(req,res,next){
  res.redirect('/updatebook.html')
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
module.exports = app;
