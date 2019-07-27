const keys = require('../config/keys');
const querystring = require('querystring');
const fetch = require('node-fetch');
const https = require('https');
const base64 = require('base-64');
const request = require('request');
const rp = require('request-promise');
const accountSid = keys.twilioSID;
const authToken = keys.twilioAuthToken;
const twilioNumber = '+14243961118';
const username = keys.tangoPlatformName;
const password = keys.tangoKey;
const accountId = keys.tangoAccountName;
const customerId = keys.tangoCustomerName;
const endpoint = 'https://api.tangocard.com/raas/v2';

class Tango {
  constructor({
    amount,
    refId,
    message,
    recipient,
    sender,
    phoneNumber,
    senderNumber
  }) {
    this.twApi = require('twilio')(accountSid, authToken);
    this.order = {};
    this.message = message;
    this.purchaseAmount = amount;
    this.refId = refId;
    this.recipient = recipient;
    this.sender = sender;
    this.phone = phoneNumber;
    this.senderNumber = senderNumber !== '' ? senderNumber : twilioNumber;
    this.type = 'U561593';
  }

  async getAccounts() {
    var options = {
      url: `${endpoint}/accounts`,
      auth: {
        user: username,
        password: password
      }
    };

    await rp(options).then(body => {
      let responseJSON = JSON.parse(body);
      this.customers = responseJSON;
      return responseJSON;
    });
  }

  async getCustomers() {
    var options = {
      url: `${endpoint}/customers`,
      auth: {
        user: username,
        password: password
      }
    };

    await rp(options).then(body => {
      let responseJSON = JSON.parse(body);
      this.customers = responseJSON;
      return responseJSON;
    });
  }

  async postOrder() {
       let requestData = {
      "accountIdentifier": accountId,
      "amount": Number(this.purchaseAmount),
      "campaign": 'TaddleText Client Rewards',
      "customerIdentifier": customerId,
      "emailSubject": 'Thank you',
      "etid": "E000000",
      "externalRefID": this.refId,
      "message": this.message,
      "notes": 'TaddleText.com',
      "recipient": {
        "email": "",
        "firstName": this.recipient.firstName,
        "lastName": this.recipient.lastName
      },
      "sendEmail": false,
      "sender": {
        "email": "",
        "firstName": this.sender.firstName,
        "lastName": this.sender.lastName
      },
      "utid": this.type
    };

    var options = {
      url: `${endpoint}/orders`,
      method: 'POST',
      auth: {
        user: username,
        password: password
      },
      json: requestData
    };

    await rp(options).then(body => {
      this.order = body;
    });

    return;
  }

  async sendGiftCard() {
    const sendGiftCard = await this.twApi.messages.create({
      body: `${this.message} ${this.order.reward.credentialList[0].value}`,
      from: this.senderNumber,
      to: `+1${this.phone}`
    });

    return sendGiftCard;
  }
}

module.exports = Tango;
