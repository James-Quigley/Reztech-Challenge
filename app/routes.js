var configAuth = require('../config/auth');
var request = require('request');


module.exports = function (app, passport) {

    // route for home page
    app.get('/', function (req, res) {
        res.render('index');
    });

    app.get('/home', function (req, res) {
        if (req.user) {
            res.render('home', {
                user: req.user,
            });
        } else {
            res.redirect('/');
        }
    });

    // route for logging out
    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email'],
        prompt: 'consent'
    }));

    // the callback after google has authenticated the user
    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: '/home',
            failureRedirect: '/'
        }));

    app.get('/shorten/:longUrl', function (req, res) {
        request.post(
            "https://www.googleapis.com/urlshortener/v1/url?key=AIzaSyCE5wo8okWT45c9Gfw5dy6Bi0-TSxnls30", {
                json: {
                    longUrl: req.params.longUrl
                }
            },
            function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    console.log(body);
                    res.json(body);
                }
            }
        );
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}