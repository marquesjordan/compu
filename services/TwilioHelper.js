const keys = require('../config/keys');
const accountSid = keys.twilioSID;
const authToken = keys.twilioAuthToken;

class TwilioHelper {
  constructor(formData) {
    this.twApi = require('twilio')(accountSid, authToken);
    this.formData = formData;
  }

  async purchaseNumber(formData) {
    this.areacode = this.formData.areacode;
    const numbers = await this.twApi.availablePhoneNumbers('US').local.list({
      areaCode: this.areacode
    });


    if ([].concat(numbers)[0]) {
      this.phoneNumber = [].concat(numbers)[0].phoneNumber;
      this.twApi.incomingPhoneNumbers.create({
        friendlyName: [].concat(numbers)[0].friendlyName,
        phoneNumber: [].concat(numbers)[0].phoneNumber,
        smsUrl: 'https://www.taddletext.com/api/incoming',
        smsMethod: "POST"
      })
      .catch( err => {
        console.log('ERROR ', err);
        return err
      });
    }

    return;
  }

  returnNumber() {
    return this.phoneNumber;
  }
}

module.exports = TwilioHelper;
