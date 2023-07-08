const router = require('express').Router();
const { Comment, Post, User } = require('../models');
const checkNotAuthenticated = require('../utils/checkNotAuthenticated');
const checkAuthenticated = require('../utils/checkAuthenticated');

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
      res.redirect('/profile');
      return;
  }
    // Otherwise, render the 'login' template
    res.render('login');

  });
  
  router.get('/signup', (req, res) => {
    // If the user is already logged in, redirect to the homepage
  if (req.session.loggedIn) {
      res.redirect('/profile');
      return;
  }
    // Otherwise, render the 'signup' template
    res.render('signup');
  });

  router.get('/profile', checkAuthenticated, async (req, res) => {
    try {
       const userData = await User.findByPk(req.session.userId, {include: [
            {
                model: Post,
                include: [
                  { model: Comment }
                ]
                
            }
        ]}
        );
        if(!userData) {
            res.status(404).json({message: 'No user with this id!'});
            return;
        }
        const user = userData.get({ plain: true });
        res.render('profile', { user, loggedIn: req.session.loggedIn });
      } catch (err) {
          res.status(500).json(err);
      };     
    }
);

router.get('/dashboard', checkAuthenticated, async (req, res) => {
  try{
    const postData = await Post.findAll({include: [
      {
        model: Comment,
      },
      {
        model: User,
      }
    ]}).catch((err) => { 
      res.json(err);
    });

    const posts = postData.map((post) => post.get({ plain: true }));
    console.log(posts);
    res.render("posts", { posts, loggedIn: req.session.loggedIn });
  } catch {
    console.log(err);
    res.status(500).json(err);
  }
  });

module.exports = router;