const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const keys = require('../config/keys');
const Referral = mongoose.model('referrals');
const Client = mongoose.model('clients');

module.exports = app => {
  app.post('/api/clients', requireLogin, async (req, res) => {
    const client = new Client({
      _user: req.user.id,
      firstName: req.body.fname,
      lastName: req.body.lname,
      phone: req.body.phone,
      email: req.body.email
    });

    try {
      await client.save();
      const clients = await Client.find({ _user: req.user.id }).sort({
        created: -1
      });
      res.send(clients);
    } catch (err) {
      res.status(422).send(err);
    }
  });

  app.get('/api/clients', requireLogin, async (req, res) => {
    const clients = await Client.find({ _user: req.user.id }).sort({
      created: -1
    });

    res.send(clients);
  });

  app.get('/api/client/:clientId', requireLogin, async (req, res) => {
    const client = await Client.find({ _id: req.params.clientId });

    res.send(client);
  });

  app.delete('/api/clients/:clientId', requireLogin, async (req, res) => {
    const client = await Client.deleteOne({ _id: req.params.clientId });
    const referrals = await Referral.deleteMany({
      _client: req.params.clientId
    });

    const clients = await Client.find({ _user: req.user.id }).sort({
      created: -1
    });

    res.send({ referrals: [], clients: clients, client: false });
  });
};
