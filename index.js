const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');

require('./models/User');
require('./models/Referral');
require('./models/Client');
require('./models/Customer');
require('./models/PromoCodes');
require('./models/Business');
require('./models/BusinessSettings');
require('./models/Profile');
require('./services/passports');

mongoose.connect(keys.mongoURI);

const app = express();

app.use(function(req, res, next) {
  if (req.headers['x-forwarded-proto'] == 'http') {
    res.redirect('https://comp-u.herokuapp.com' + req.url);
  } else {
    return next();
  }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/clientRoutes')(app);
require('./routes/customerRoute')(app);
require('./routes/promoRoutes')(app);
require('./routes/businessRoute')(app);
require('./routes/referralRoutes')(app);
require('./routes/profileRoutes')(app);
require('./routes/awsRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
