const checkNotAuthenticated = (req, res, next) => {
    if(req.session.isLoggedIn) {
        res.redirect('/');
    } else {
        return next();
    }
}


module.exports = checkNotAuthenticated;