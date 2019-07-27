const _ = require('lodash');
const mongoose = require('mongoose');
const keys = require('../config/keys');
const requireLogin = require('../middlewares/requireLogin');
const stripe = require('stripe')(keys.stripeSecretKey);
const Profile = mongoose.model('profile');
const Referral = mongoose.model('referrals');
const Client = mongoose.model('clients');
const User = mongoose.model('users');

module.exports = app => {
  app.get('/api/profile', requireLogin, async (req, res) => {
    const profile = await Profile.find({ _user: req.user.id });
    const current_user = await User.find({ _id: req.user.id });

    if (profile.length < 1) {
      profile = await new Profile({ _user: req.user.id }).save();
    }

    if (!current_user[0]._profile) {
      current_user[0]._profile = profile.id;
      await current_user[0].save();
    }

    res.send(profile);
  });

  app.get('/api/profile/:id', async (req, res) => {
    const referral = await Referral.findOne({ _id: req.params.id });
    if (!_.isEmpty(referral)) {
      referral.responded = true;
      referral.viewed.concat([Date.now()]);
      await referral.save();
      const client = await Client.findOne({ _id: referral._client });
      if (!_.isEmpty(client)) {
        if ([].concat(client.responded).indexOf(req.params.id) === -1) {
          client.responded.push(req.params.id);
          client.notification = true;
          await client.save();
        }
        var profile = await Profile.findOne({ _user: client._user });
        profile.views = profile.views + 1;
        await profile.save();
        profile = await Profile.find({ _user: client._user });

        res.send(profile);
      }
    }

    res.send(undefined);
  });

  app.put('/api/profile', requireLogin, async (req, res) => {
    _.each(req.body, function(key, value) {
      if (value === '' || value === null) {
        delete req.body[key];
      }
    });

    const update = await Profile.update({ _user: req.user.id }, req.body, {
      upsert: false
    });

    const profile = await Profile.find({ _user: req.user.id });

    res.send(profile);
  });

  app.put('/api/profileAddLicense', requireLogin, async (req, res) => {
    const profile = await Profile.findOne({ _user: req.user.id });

    if (profile && profile.licenses) {
      profile.licenses.push(req.body);
    } else {
      profile['licenses'] = [].concat(req.body);
    }

    const obj = {
      licenses: profile.licenses
    };

    const update = await Profile.update({ _user: req.user.id }, obj, {
      upsert: false
    });

    res.send([].concat(profile));
  });

  app.put('/api/profileRemoveLicense', requireLogin, async (req, res) => {
    const profile = await Profile.findOne({ _user: req.user.id });

    if (profile && profile.licenses) {
      _.pullAllWith(
        profile.licenses,
        [{ name: req.body.name, number: req.body.number }],
        _.isEqual
      );
    }

    const obj = {
      licenses: profile.licenses
    };

    const update = await Profile.update({ _user: req.user.id }, obj, {
      upsert: false
    });

    res.send([].concat(profile));
  });
};
