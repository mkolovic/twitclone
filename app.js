// app.js
'use strict';

// express is a common web server library
var express = require('express');
var app = express();

// apps have routes
// get method has a request and response 
// exeuctes anonymous callback function
app.get('/', function(req, res) {
    // code goes here
    res.send('Now we are talking.');
});

app.listen(8080, function() {
    console.log('Web server listening on port 8080!');
});
