// app.js
'use strict';

// express is a common web server library
var express = require('express');
var app = express();

// configure the express app
app.set('view engine', 'ejs');
app.set('views', './views');

// apps have routes
// get method has a request and response 
// exeuctes anonymous callback function
app.get('/', function(req, res) {
    // code goes here
    res.render('tweets');
});

app.listen(8080, function() {
    console.log('Web server listening on port 8080!');
});
