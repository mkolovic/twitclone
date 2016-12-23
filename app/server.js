// app.js
'use strict';

// our imports
var bodyParser = require('body-parser');
var express = require('express');
var mysql = require('mysql');

// instantiate express app
var app = express();

// hmmm this depends on stuff defined in
// docker compose files
// how can we make this dynamic?
// also this will run before the db
// is ready, probably
var connection = mysql.createConnection({
    host: 'twitclone-dev-db',
    user: 'root',
    password: 'secret',
    database: 'twitclonedb'
});

// start the db connection
// if success start web server

setTimeout(function() { connection.connect(function(err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log('Database connected.');
    app.listen(8080, function() {
        console.log('Web server listening on port 8080.');
    });
});}, 4000);

// configure the express app
app.set('view engine', 'ejs'); // templating
app.set('views', './views');   // templating
app.use(express.static('public')); //middleware
app.use(bodyParser.urlencoded({ extended: true })); // middleware

// apps have routes
// get method has a request and response 
// exeuctes anonymous callback function
app.get('/', function(req, res) {
    // code goes here
    res.render('tweets');
});

app.post('/tweets/create', function(req, res) {
    var query = 'INSERT INTO Tweets(handle, body) VALUES(?, ?)';
    var body = req.body.body;
    var handle = req.body.handle;

    connection.query(query, [handle, body], function(err) {
        if (err) {
            console.log(err);
        }
        res.redirect('/');
    });
});
