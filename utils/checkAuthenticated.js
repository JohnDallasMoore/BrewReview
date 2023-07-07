const checkAuthenticated = (req, res, next) => {
  if (req.session.loggedIn) {
    return next();
  } else {
    res.redirect('/login');
  }
}

module.exports = checkAuthenticated;