var express = require('express');
var config = require('./config.js');
var favicon = require('serve-favicon');
var sql = require('mssql');

var app = express();

// Set 'public' directory to serve static content
app.use(express.static('public'));
app.use(favicon('./public/content/favicon.ico'));
// Use the ejs View Engine
app.set('views', './src/views');
app.set('view engine', 'ejs');

// Set up routes
var homeRouter = require('./src/routes/homeRoute')(null);
var apiRouter = require('./src/routes/apiRoute')(config.dbConfig);
app.use('/', homeRouter);
app.use('/api', apiRouter);

// Start listening for HTTP requests
app.listen(config.port, function(err){
    console.log('Running server on port ' + config.port);
});