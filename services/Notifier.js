const keys = require('../config/keys');
const accountSid = keys.twilioSID;
const authToken = keys.twilioAuthToken;
const twilioNumber = '+14243961118';

class Notifier {
  constructor({ recipient, message }) {
    this.twApi = require('twilio')(accountSid, authToken);
    this.recipient = recipient;
    this.message = message;
  }

  async send() {
    this.sendSms(
      this.recipient.phone,
      this.message,
      (err, responseData) => {
        if (err) {
        } else {
        }
      }
    );
  }

  async sendSms(refNumber, message) {
    const sendResponse = await this.twApi.messages.create({
      body: message,
      from: twilioNumber,
      to: `+1${refNumber}`
    });

    return sendResponse;
  }
}

module.exports = Notifier;
