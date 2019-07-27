const mongoose = require('mongoose');
const passport = require('passport');
const crypto = require('crypto');
const validateRegisterInput = require('../services/register');
const validateLoginInput = require('../services/login');
const validateForgotInput = require('../services/forgot');
const validateResetInput = require('../services/reset');
const requireLogin = require('../middlewares/requireLogin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const User = mongoose.model('users');
const Profile = mongoose.model('profile');
const SendGrid = require('../services/SendGrid');

module.exports = app => {
  app.get('/auth/linkedin', passport.authenticate('linkedin'));

  app.get(
    '/auth/linkedin/callback',
    passport.authenticate('linkedin', { failureRedirect: '/login' }),
    function(req, res) {
      // Successful authentication, redirect home.
      res.redirect('/');
    }
  );

  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/dashboard');
    }
  );

  app.get('/api/logout', (req, res) => {
    // req.logout();
    res.redirect('/');
  });

  app.get('/api/current_user', requireLogin, async (req, res) => {
    const current_user = await User.findById(req.user.id);

    if (current_user.stripeCustomerId) {
      const customer = await stripe.customers.retrieve(
        current_user.stripeCustomerId
      );
      if (
        customer.subscriptions &&
        customer.subscriptions.data &&
        customer.subscriptions.data[0]
      ) {
        current_user.status = customer.subscriptions.data[0].status;
        current_user.subscription = customer.subscriptions.data[0].plan.id;
      }

      await current_user.save();
    }

    res.send(current_user);
  });

  app.post('/api/register', (req, res) => {
    // Form validation
    const { errors, isValid } = validateRegisterInput(req.body);
    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        return res.status(400).json({ email: 'Email already exists' });
      }

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });

      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => {
              new Profile({
                _user: user.id,
                fullname: req.body.name,
                email: user.email,
                phone: req.body.phone
              }).save();
              res.json(user);
            })
            .catch(err => console.log(err));
        });
      });
    });
  });

  app.post('/api/login', (req, res) => {
    // Form validation
    const { errors, isValid } = validateLoginInput(req.body);
    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;
    // Find user by email
    User.findOne({ email }).then(user => {
      // Check if user exists
      if (!user) {
        return res.status(404).json({ email: 'Email not found' });
      }
      // Check password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // User matched
          // Create JWT Payload
          const payload = {
            id: user.id,
            name: user.name
          };
          // Sign token
          jwt.sign(
            payload,
            keys.jwtSecretKey,
            {
              expiresIn: 31556926 // 1 year in seconds
            },
            (err, token) => {
              res.json({
                success: true,
                token: 'Bearer ' + token,
                id: payload.id
              });
            }
          );
        } else {
          return res.status(400).json({ password: 'Password incorrect' });
        }
      });
    });
  });

  app.post('/api/forgot', async (req, res) => {
    // Form validation
    const { errors, isValid } = validateForgotInput(req.body);
    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const email = req.body.email;
    const current_user = {};
    // Find user by email
    const foundUser = await User.findOne({ email });

    if (!foundUser) {
      return res.status(404).json({ email: 'Email not found' });
    }

    const token = crypto.randomBytes(20);
    foundUser.resetPasswordToken = token.toString('hex');
    foundUser.resetPasswordExpires = Date.now() + 3600000;

    const emailObj = {
      name: foundUser.name,
      toEmail: email,
      subject: 'Taddle Text Password Reset',
      title: 'Password Reset',
      text:
        'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
        'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
        'https://' +
        req.headers.host +
        '/resetpassword/' +
        foundUser.resetPasswordToken +
        '\n\n' +
        '. If you did not request this, please ignore this email and your password will remain unchanged.\n',
      message:
        'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
        'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
        'https://' +
        req.headers.host +
        '/reset/' +
        foundUser.resetPasswordToken +
        '\n\n' +
        '. If you did not request this, please ignore this email and your password will remain unchanged.\n',
      templateId: 'd-34dcae05c9d84a08a054cfe1b3b5cefc'
    };

    const sendGrid = await new SendGrid(emailObj);
    try {
      await sendGrid.sendMail();
      res.send({ sent: 'Success' });
    } catch (err) {
      res.status(422).send(err);
    }

    await foundUser.save();
  });

  app.post('/api/reset/:token', async (req, res) => {
    // Form validation
    const { errors, isValid } = validateResetInput(req.body);
    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    // Find user by email
    const foundUser = await User.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!foundUser) {
      return res.status(404).json({ email: 'Token is invalid or has expired' });
    }

    foundUser.password = req.body.password;
    foundUser.resetPasswordToken = undefined;
    foundUser.resetPasswordExpires = undefined;

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(foundUser.password, salt, (err, hash) => {
        if (err) throw err;
        foundUser.password = hash;
        foundUser
          .save()
          .then(async user => {
            const emailObj = {
              name: user.name,
              toEmail: user.email,
              subject: 'Taddle Text Password Reset',
              title: 'Password Reset',
              text:
                'This is confirmation that your email has successfully been changed.',
              message:
                'This is confirmation that your email has successfully been changed.',
              templateId: 'd-34dcae05c9d84a08a054cfe1b3b5cefc'
            };

            const sendGrid = await new SendGrid(emailObj);
            try {
              await sendGrid.sendMail();
              res.send({ sent: 'Success' });
            } catch (err) {
              res.status(422).send(err);
            }
          })
          .catch(err => res.status(422).send(err));
      });
    });
  });
};
