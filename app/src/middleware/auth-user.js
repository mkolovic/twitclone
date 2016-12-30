'use strict'

module.exports = function(req, res, next) {
    var id = parseInt(req.params.id, 10);
    var tweetsCreated = req.cookies.tweets_created || [];

    if (!tweetsCreated.includes(id)) {
        // redirect to homepage if user didnt create tweet
        res.redirect('/');
        return;
    }

    next();
};
