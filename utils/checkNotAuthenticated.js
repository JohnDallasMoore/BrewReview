const checkNotAuthenticated = (req, res, next) => {
    if(req.session.loggedIn) {
        res.redirect('/');
    } else {
        return next();
    }
}


module.exports = checkNotAuthenticated;