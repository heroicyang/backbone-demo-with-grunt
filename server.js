var express = require('express');
var app = express();

app.configure(function () {
  app.use(express.logger('dev'));

  app.use(express.bodyParser());
  app.use(express.methodOverride());

  app.use(express.cookieParser());

  app.use(express.static(__dirname + '/build'));
  app.use('/test/', express.static(__dirname + '/test'));
});

app.get('/', function (req, res, next) {
  res.send('hello');
});

require('http')
  .createServer(app)
  .listen(3000);