const router = require('express').Router();
const { Comment, Post, User } = require('../models');

router.get('/', async (req, res) => {
  try {
        res.render('homepage', { loggedIn: req.session.loggedIn });
  } catch (err) {
      res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
    // If the user is already logged in, redirect to the homepage
  if (req.session.loggedIn) {
      res.redirect('/api/users/profile');
      return;
  }
    // Otherwise, render the 'login' template
    res.render('login');

  });
  
  router.get('/signup', (req, res) => {
    // If the user is already logged in, redirect to the homepage
  if (req.session.loggedIn) {
      res.redirect('/api/users/profile');
      return;
  }
    // Otherwise, render the 'signup' template
    res.render('signup');
  });

module.exports = router;