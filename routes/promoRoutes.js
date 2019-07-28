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
const User = mongoose.model('users');
const Customer = mongoose.model('customer');
const Profile = mongoose.model('profile');
const Promo = mongoose.model('promoCodes');
const SendGrid = require('../services/SendGrid');

module.exports = app => {
  app.get('/api/getPromos', requireLogin, async (req, res) => {
    const { phone } = req.body;

    const promos = await Promo.find({ _user: req.user._id }).catch(err => {
      console.log('Problem getting promos.');
    });
    console.log(promos);

    res.send(promos);
  });

  app.post('/api/addPromo', requireLogin, async (req, res) => {
    const { name, description, redemption } = req.body;
    const promo = new Promo({
      _user: req.user._id,
      name: name,
      description: description,
      redemption: redemption
    });
    await promo.save();

    const promos = await Promo.find({ _user: req.user._id }).catch(err => {
      console.log('Problem getting promos.');
    });

    res.send(promos);
  });
};
