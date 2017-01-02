module.exports = function(app, passport) {

    // route for home page
    app.get('/', function(req, res) {
        res.render('index.jade'); // load the index.ejs file
    });

    app.get('/auth/google', passport.authenticate('google', { scope : ['profile'] }));

    // the callback after google has authenticated the user
    app.get('/auth/google/callback',
            passport.authenticate('google', {
                    successRedirect : '/home',
                    failureRedirect : '/'
            }));

};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}