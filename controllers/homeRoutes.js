const router = require('express').Router();
const { Comment, Post, User } = require('../models');

router.get('/', async (req, res) => {
  try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name'],
                }
            ]
        });

        const posts = postData.map((post) => post.get({ plain: true }));
        res.render('homepage', posts);
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
    // Otherwise, render the 'login' template
    res.render('signup');
  });

module.exports = router;