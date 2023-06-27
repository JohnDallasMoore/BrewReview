const passport = require('passport')
,   LocalStrategy = require('passport-local').Strategy;
const { Comment, Post, User } = require('../../models');

passport.use(new LocalStrategy (
    function(email, password, done) {
        User.findOne({ email: email}, function(err, user) {
            if (err) { return done(err)};
            if (!user) {
                return done(null, false, { message: 'We could not find this email address.'});
            }
            var validPassword = user.checkPassword(password);
            if(!validPassword) {
                return done(null, false, { message: 'Invalid password.'});
            }
            return done(null, user);
        })
    }
))