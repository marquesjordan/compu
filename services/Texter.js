const keys = require('../config/keys');
const accountSid = keys.twilioSID;
const authToken = keys.twilioAuthToken;
const twilioNumber = '+14243961118';

class Texter {
  constructor({ client, recipients, message, sendNumber }) {
    this.twApi = require('twilio')(accountSid, authToken);
    this.client = client;
    this.recipients = recipients;
    this.message = message;
    this.sendNumber = sendNumber ? sendNumber : twilioNumber;
  }

  async send() {
    for (var x = 0; x < this.recipients.length; x++) {
      this.sendSms(
        this.recipients[x].phone,
        this.recipients[x].message,
        (err, responseData) => {
          if (err) {
          } else {
          }
        }
      );
    }
  }

  async sendSms(refNumber, message) {
    const sendResponse = await this.twApi.messages.create({
      body: message,
      from: this.sendNumber,
      to: `+1${refNumber}`
    });

    return sendResponse;
  }
}

module.exports = Texter;
