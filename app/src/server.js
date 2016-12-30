// app.js
'use strict';

// our imports
var authUser = require('./middleware/auth-user');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var express = require('express');
var moment = require('moment');
var mysql = require('mysql');

// instantiate express app
var app = express();
// configure the express app
app.set('view engine', 'ejs'); // templating
app.set('views', './views');   // templating
app.use(express.static('public')); //middleware
app.use(bodyParser.urlencoded({ extended: true })); // middleware
app.use(cookieParser()); // middleware

// hmmm this depends on stuff defined in
// docker compose files
// how can we make this dynamic?
var connection = mysql.createConnection({
    host: 'twitclone-db',
    user: 'root',
    password: 'secret',
    database: 'twitclonedb'
});

// start the db connection
// if success start web server
// crude waiting strategy
var conn_db = function() {
    connection.connect(function(err) {
        if (err) {
            console.log(err);
            return;
        }
        console.log('Database connected.');
        app.listen(8080, function() {
            console.log('Web server listening on port 8080.');
        });
    });
};

setTimeout(conn_db, 80000); // 80 seconds


// apps have routes
// get method has a request and response 
// exeuctes anonymous callback function
app.get('/', function(req, res) {
    // code goes here
    var query = 'SELECT * FROM Tweets ORDER BY created_at DESC';
    var tweetsCreated = req.cookies.tweets_created || [];

    connection.query(query, function(err, results) {
        if (err) {
            console.log(err);
        }

        for (var i = 0; i < results.length; i++) {
            var tweet = results[i];
            tweet.time_from_now = moment(tweet.created_at).fromNow();
            tweet.isEditable = tweetsCreated.includes(tweet.id);
        }

        res.render('tweets', {tweets: results});
    });
});

app.post('/tweets/create', function(req, res) {
    var query = 'INSERT INTO Tweets(handle, body) VALUES(?, ?)';
    var body = req.body.body;
    var handle = req.body.handle;
    var tweetsCreated = req.cookies.tweets_created || [];

    connection.query(query, [handle, body], function(err, results) {
        if (err) {
            console.log(err);
        }
        tweetsCreated.push(results.insertId);
        res.cookie('tweets_created', tweetsCreated, { httpOnly: true });
        res.redirect('/');
    });
});

app.get('/tweets/:id([0-9]+)/edit', authUser, function(req, res) {
    var query = 'SELECT * FROM Tweets WHERE id = ?';
    var id = req.params.id;

    connection.query(query, [id], function(err, results) {
        if (err || results.length === 0) {
            console.log(err || "No tweet found.");
            res.redirect('/');
            return;
        }
        res.render('edit-tweet', {tweet: results[0]});
    });
});

app.post('/tweets/:id([0-9]+)/update', authUser, function(req, res) {
    var updateQuery = 'UPDATE Tweets SET body = ?, handle = ? WHERE id = ?';
    var deleteQuery = 'DELETE FROM Tweets WHERE id = ?';
    var id = req.params.id;
    var handle = req.body.handle;
    var body = req.body.body;
    var isDelete = req.body.delete_button !== undefined;
    var queryCallback = function(err) {
        if (err) {
            console.log(err);
        }

        res.redirect('/');
    };

    if (isDelete) {
        connection.query(deleteQuery, [id], queryCallback);
    } else {
        connection.query(updateQuery, [body, handle, id], queryCallback);
    }
});
