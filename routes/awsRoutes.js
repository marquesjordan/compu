const _ = require('lodash');
const mongoose = require('mongoose');
const keys = require('../config/keys');
const requireLogin = require('../middlewares/requireLogin');
const fs = require('fs');
const fileType = require('file-type');
const multiparty = require('multiparty');
const User = mongoose.model('users');
const Profile = mongoose.model('profile');
const Client = mongoose.model('clients');
const Referral = mongoose.model('referrals');
const Uploader = require('../services/uploader');
const Notifier = require('../services/Notifier');

module.exports = app => {
  app.post('/api/upload/:title', requireLogin, async (req, res) => {
    const uploader = new Uploader();
    const form = new multiparty.Form();

    form.parse(req, async (error, fields, files) => {
      if (error) throw new Error(error);

      try {
        const path = files.file[0].path;
        const buffer = fs.readFileSync(path);
        const type = fileType(buffer);
        const timestamp = Date.now().toString();
        const fileName = `tt-photos/${timestamp}`;
        const data = await uploader.uploadFile(buffer, fileName, type);
        data['title'] = req.params.title;

        return res.status(200).send(data);
      } catch (error) {
        return res.status(400).send(error);
      }
    });
  });

  app.post('/api/incoming', async (req, res) => {
    const body = req.body.Body;
    const sender = req.body.From.slice(2);
    const recipient = req.body.To.slice(2);

    const foundUser = await User.findOne({ twilioNumber: req.body.To });

    if (_.isEmpty(foundUser)) {
      return res
        .status(200)
        .send({ success: 'User Cannot Receive Incoming SMS' });
    }

    const fromClient = await Client.findOne({
      phone: sender,
      _user: foundUser._id
    });

    if (!_.isEmpty(fromClient)) {
      if (
        foundUser.subscription !== 'pro' &&
        foundUser.status === 'active' &&
        foundUser.twilioNumber !== ''
      ) {
        const profile = await Profile.findOne({ _user: foundUser._id });

        const message = `TaddleText Notice: Your client ${fromClient.firstName} ${fromClient.lastName}  at phone# ${sender}, has sent you the following reply: ${body}`;

        const sendObj = {
          recipient: {
            phone: profile.phone
          },
          message: message
        };

        const notifier = new Notifier(sendObj);

        await notifier.send();

        return res.status(200).send({ success: 'Reply sent to user' });
      }
    } else {
      const referralList = await Referral.find({ phone: sender });

      if (_.isEmpty(referralList)) {
        return res.status(400).send({ error: 'Referral was not found!' });
      }

      const clientIdList = _.map(referralList, referral => {
        return referral._client;
      });

      if (_.isEmpty(clientIdList)) {
        return res.status(400).send({ error: 'Client not found!' });
      }

      const foundClient = await Client.find({
        $and: [{ _id: { $in: clientIdList } }, { _user: foundUser._id }]
      });

      if (_.isEmpty(foundClient)) {
        return res.status(400).send({ error: 'Client was not found!' });
      }

      const referral = await Referral.findOne({
        phone: sender,
        _client: foundClient[0]._id
      });

      if (_.isEmpty(referral)) {
        return res.status(400).send({ error: 'Referral was not found!' });
      }

      if (
        foundUser.subscription !== 'pro' &&
        foundUser.status === 'active' &&
        foundUser.twilioNumber !== ''
      ) {
        const profile = await Profile.findOne({ _user: foundUser._id });

        const message = `TaddleText Notice: Your referral ${referral.name} at phone# ${sender}, has sent you the following reply: ${body}`;

        const sendObj = {
          recipient: {
            phone: profile.phone
          },
          message: message
        };

        const notifier = new Notifier(sendObj);

        await notifier.send();

        return res.status(200).send({ success: 'Reply sent to user' });
      }
    }
  });

  app.delete('/api/deleteFile', requireLogin, async (req, res) => {
    const uploader = new Uploader();

    const data = await uploader.deleteFile(req.body);
  });
};
