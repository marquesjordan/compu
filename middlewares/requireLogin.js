const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

module.exports = (req, res, next) => {
  if (req.get('authorization') !== undefined) {
    const authorization = req.get('authorization').replace('Bearer ', '');
    const decoded = jwt.verify(authorization, keys.jwtSecretKey);
    req['user'] = decoded;
  }

  if (!req.user) {
    // return res.status(401).send({ error: 'You must log in!' });
    res.redirect(401, '/');
  }

  next();
};
