const router = require('express').Router();
const passport = require('passport');
const { Comment, Post, User } = require('../../models');
const checkNotAuthenticated = require('../../utils/checkNotAuthenticated');
const checkAuthenticated = require('../../utils/checkAuthenticated');



const initializePassport = require('../../config/passport.js');
initializePassport(passport, 
  email => User.findAll(user => user.email === email),
  id => User.findAll(user => user.id === id)); 

// router.get('/profile', checkAuthenticated, async (req, res) => {
//     try {
//        const userData = await User.findByPk(req.session.userId, {include: [
//             {
//                 model: Post,
//             }
//         ]}
//         );
//         if(!userData) {
//             res.status(404).json({message: 'No user with this id!'});
//             return;
//         }
//         const user = userData.get({ plain: true });
//         res.render('profile', { user, loggedIn: req.session.loggedIn });
//       } catch (err) {
//           res.status(500).json(err);
//       };     
//     }
// );

router.post('/', async (req, res) => {
  try {
    const userData = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    const user = userData.get({ plain: true });

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.name = user.name;
      req.session.userId = user.id;

      res.redirect('/profile');
    });
    
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/login', checkNotAuthenticated, async (req, res) => {
try {
    const userData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    const user = userData.get({ plain: true });
    console.log(user);

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.name = user.name;
      req.session.userId = user.id;

      res.redirect('/profile');
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/logout', checkAuthenticated, (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});



module.exports = router;
  