module.exports = function(app, passport) {

    // route for home page
    app.get('/', function(req, res) {
        res.render('index');
    });
    
    app.get('/home', function(req, res) {
        res.render('home', {
            user : req.user
        });
    });

    // route for logging out
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
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