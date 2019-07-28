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
const SendGrid = require('../services/SendGrid');

module.exports = app => {
  app.post('/api/getCustomer', async (req, res) => {
    const { phone } = req.body;

    Customer.findOne({ phone: phone })
      .then(current_customer => {
        if (!current_customer) {
          customer = new Customer({ phone: phone }).save().then(customer => {
            console.log('Customer*** ', customer);
            profile = new Profile({
              _customer: customer._id,
              phone: customer.phone
            }).save();
          });
        }
      })
      .catch(err => {
        console.log('Problem getting customer by phone numebr.');
      });

    const active_customer = await Customer.findOne({ phone: phone });
    const current_profile = await Profile.findOne({ phone: phone });

    const customerObj = {
      customer: active_customer,
      profile: current_profile
    };

    res.send(customerObj);
  });

  app.post('/api/addCredit', async (req, res) => {
    const { phone } = req.body;

    Customer.findOne({ phone: phone })
      .then(current_customer => {
        current_customer.count++;
        current_customer.save();
      })
      .catch(err => {
        console.log('Problem getting customer by phone numebr.');
      });

    const active_customer = await Customer.findOne({ phone: phone });
    const current_profile = await Profile.findOne({ phone: phone });

    const customerObj = {
      customer: active_customer,
      profile: current_profile
    };

    res.send(customerObj);
  });
};
