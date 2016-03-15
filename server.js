/**
 * A simple Restaurants server using Express
 */

// load required packages
var http = require('http'),
  path = require('path'),
  express = require('express'),
  app = express(),
  server = http.createServer(app);

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set('view options', { layout: false });
app.use(express.bodyParser());
// Add headers
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type');
  
  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res.send(200);
  } else {
    next();
  }
  // res.setHeader('Access-Control-Allow-Credentials', true);
});
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);
/*app.use(function(req, res, next) {
  res.render('404', { status: 404, url: req.url });
  next();
});*/

require('./routes')(app);

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Restaurants server listening at", addr.address + ":" + addr.port);
});
