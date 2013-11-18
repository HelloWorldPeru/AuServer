var mongoUri = process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/mydb';

/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var mongo = require('mongodb');
var io = require('socket.io');
var app = express();

// all environments
app.set('port', process.env.PORT || 5050);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

mongo.Db.connect(mongoUri, function (err, db) {
  if(err) throw err;

  console.log('Conexion con mongo');
  require('./routes/index')(app, db);
});


//io = io.listen(server);
//
//io.configure(function(){
//	io.disable('log');
//});
//
//require('./controllers/controller')(io);