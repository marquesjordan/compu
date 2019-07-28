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

  app.post('/api/getCustomer',  (req, res) => {

    console.log('bodyyyy ', req.body);
    const {
        phone,
    } = req.body;

    console.log(phone);

    Customer.findOne({phone: phone})
        .then((current_customer) => {
            console.log("CurrentCustomer: " , current_customer)
            if (!current_customer) {
                customer = new Customer({ phone: phone }).save();
                console.log("customer", customer);
            } else {
                current_customer.count++;
                current_customer.save();
            }
        })
        .catch(err => {
            console.log("Problem getting customer by phone numebr.")
        });

    
    console.log('donnene');
  });
}