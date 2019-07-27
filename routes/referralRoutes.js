const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const keys = require('../config/keys');
const Referral = mongoose.model('referrals');
const Client = mongoose.model('clients');
const User = mongoose.model('users');
const Profile = mongoose.model('profile');

const Texter = require('../services/Texter');
const TwilioHelper = require('../services/TwilioHelper');
const Notifier = require('../services/Notifier');
const Tango = require('../services/Tango');
const SendGrid = require('../services/SendGrid');

module.exports = app => {
  app.get('/api/clients/:clientId/referral', requireLogin, async (req, res) => {
    const referrals = await Referral.find({ _client: req.params.clientId });
    const client = await Client.find({ _id: req.params.clientId });
    client[0].referrals = referrals.length;
    client[0].notification = false;
    client[0].save();

    res.send({ referrals: referrals, client: client[0] });
  });

  app.delete(
    '/api/clients/:clientId/referral/:refId',
    requireLogin,
    async (req, res) => {
      const referral = await Referral.deleteOne({ _id: req.params.refId });

      const referrals = await Referral.find({ _client: req.params.clientId });
      let client = await Client.find({ _id: req.params.clientId });
      client[0].referrals = client[0].referrals - 1;
      await client[0].save();
      client = await Client.find({ _id: req.params.clientId });
      const clients = await Client.find({ _user: req.user.id });

      res.send({ referrals: referrals, clients: clients, client: client[0] });
    }
  );

  app.get('/api/referral/:refId', requireLogin, async (req, res) => {
    const referral = await Referral.findOne({ _id: req.params.refId });

    res.send(referral);
  });

  app.post('/api/referral', requireLogin, async (req, res) => {
    const {
      name,
      phone,
      email,
      relationship,
      married,
      ageRange,
      children,
      responded,
      _client
    } = req.body;

    const referral = new Referral({
      name,
      phone,
      email,
      relationship,
      married,
      ageRange,
      children,
      _client,
      created: Date.now()
    });

    try {
      const refer = await referral.save();

      const referrals = await Referral.find({ _client: _client });
      let client = await Client.find({ _id: _client });
      client[0].referrals = client[0].referrals + 1;
      await client[0].save();
      client = await Client.find({ _id: _client });
      const clients = await Client.find({ _user: req.user.id });

      res.send({ referrals: referrals, clients: clients, client: client[0] });
    } catch (err) {
      res.status(422).send(err);
    }
  });

  app.post('/api/referral/:clientId', async (req, res) => {
    const { name, phone, email, relationship, responded } = req.body;

    const referral = new Referral({
      name,
      phone,
      email,
      relationship,
      _client: req.params.clientId,
      created: Date.now()
    });

    try {
      const refer = await referral.save();

      const referrals = await Referral.find({ _client: req.params.clientId });
      let client = await Client.find({ _id: req.params.clientId });
      client[0].referrals = client[0].referrals + 1;
      await client[0].save();

      res.status(200).send('Successful Submission');
    } catch (err) {
      res.status(422).send(err);
    }
  });

  app.put('/api/referral', requireLogin, async (req, res) => {
    const {
      _id,
      name,
      phone,
      email,
      relationship,
      married,
      ageRange,
      children,
      responded,
      _client
    } = req.body;

    const refUpdate = await Referral.update(
      { _id: _id },
      {
        name,
        phone,
        email,
        relationship,
        married,
        ageRange,
        children,
        _client
      },
      { upsert: false }
    );

    const referrals = await Referral.find({ _client: _client });

    try {
      res.send(referrals);
    } catch (err) {
      res.status(422).send(err);
    }
  });

  app.post('/api/sendRequestedNotification', async (req, res) => {
    const client = await Client.findById({ _id: req.body.clientId });
    if (!!client._user) {
      const profile = await Profile.find({ _user: client._user });

      if (!!profile[0] && !!profile[0].phone) {
        const message = `Taddle Text Notice: Your client ${client.firstName}, has sent you some new referrals.`;

        const sendObj = {
          recipient: profile[0],
          message: message
        };

        const notifier = new Notifier(sendObj);

        await notifier.send();

        res.status(200).send('Notice Sent');
      }
    }

    res.status(422).send(err);
  });

  app.post('/api/sendViewNotification', async (req, res) => {
    const referral = await Referral.findById({ _id: req.body.viewerId });

    if (!!referral._client) {
      const client = await Client.findById({ _id: referral._client });
      if (!!client._user) {
        const profile = await Profile.find({ _user: client._user });

        if (!!profile[0] && !!profile[0].phone) {
          if (referral.viewed.length > 1) {
            res.send(profile[0]);
          } else {
            const message = `Taddle Text Notice: Your client ${client.firstName}'s referral, ${referral.name} ${referral.phone} has viewed your profile.`;

            const sendObj = {
              recipient: profile[0],
              message: message
            };

            const notifier = new Notifier(sendObj);

            await notifier.send();
            const user = await referral.save();
            res.send(profile[0]);
          }
        }
      }
    }

    res.status(422).send(err);
  });

  app.post('/api/setNumbers', requireLogin, async (req, res) => {
    const current_user = await User.findOne({ _id: req.user.id });
    const twilioNumber = new TwilioHelper(req.body.formData);
    const { formData } = req.body;
    if (formData.plan === 'elite' || formData.plan === 'enterprise') {
      const twilVal = await twilioNumber.purchaseNumber(req.body.formData);
      current_user.twilioNumber = await twilioNumber.returnNumber();
      await current_user.save();
    }

    if (current_user.twilioNumber) {
      res.status(200).send({ success: 'Number Was Created and Saved' });
    } else {
      res.status(422).send({ error: 'Number was not created' });
    }
  });

  app.post('/api/sendSMS', requireLogin, async (req, res) => {
    const texter = new Texter(req.body);
    const current_user = await User.findById(req.body.client._user);

    try {
      await texter.send();
      res.send({ sent: 'Success' });
    } catch (err) {
      res.status(422).send(err);
    }
  });

  app.post('/api/sendEmail', async (req, res) => {
    const sendGrid = await new SendGrid(req.body);
    try {
      await sendGrid.sendMail();
      res.send({ sent: 'Success' });
    } catch (err) {
      res.status(422).send(err);
    }
  });

  app.post('/api/tango', requireLogin, async (req, res) => {
    const payer = await User.findOne({ _id: req.user.id });
    const tango = await new Tango(req.body);

    if (payer.credits < req.body.amount) {
      res.status(500).send({ error: 'Not Enough Credits' });
    }

    await tango.postOrder().catch(function(err) {
      res.send({ error: 'Order Error - Check With Site Administrator' });
    });
    await tango
      .sendGiftCard()
      .then(async () => {
        const current_user = await User.findById(req.user.id);
        current_user.credits -= Number(req.body.amount);
        await current_user.save();

        res.send({
          message: 'Reward Sent Successfully',
          credits: current_user.credits
        });
      })
      .catch(async err => {
        const current_user = await User.findById(req.user.id);
        res.send({
          error: 'Send Error - Check With Site Administrator',
          credits: current_user.credits
        });
      });
  });

  app.post('/api/setContacted', requireLogin, async (req, res) => {
    const list = req.body.recipients;
    var current_recipient;
    for (var x = 0; x < list.length; x++) {
      current_recipient = await Referral.findById(list[x]._id);
      current_recipient.contacted = true;
      await current_recipient.save();
    }
    const referrals = await Referral.find({ _client: list[0]._client });
    const client = await Client.find({ _id: list[0]._client });

    res.send({ referrals: referrals, client: client[0] });
  });
};
