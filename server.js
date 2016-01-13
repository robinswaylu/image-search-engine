'use strict';

var express = require('express');
var routes = require('./app/routes/index.js');
var mongoose = require('mongoose');  
var bodyParser = require('body-parser');
var app = express();
 
require('dotenv').load(); 

//mongoose.connect(process.env.MONGO_URI);

// Connect to db
mongoose.connect(process.env.MONGO_URI, function (err, res) {
  if (err) console.log ('ERROR connecting to: ' + process.env.MONGO_URI + '. ' + err);
  else console.log ('Succeeded connected to: ' + process.env.MONGO_URI);
});
// Handle POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use('/public', express.static(process.cwd() + '/public'));
 
routes(app);

var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});