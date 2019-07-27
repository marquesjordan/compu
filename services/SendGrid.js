const keys = require('../config/keys');
const querystring = require('querystring');
const fetch = require('node-fetch');
const https = require('https');
const base64 = require('base-64');
const request = require('request');
const sgMail = require('@sendgrid/mail');
const rp = require('request-promise');
const sendGridKey = keys.sendGridKey;

class SendGrid {
  constructor({toEmail, subject, text, link, title, name, message, templateId}) {
    this.to_email = toEmail;
    this.subject = subject;
    this.text = text;
    this.link = link ? link : '';
    this.title = title;
    this.name = name
    this.message = message;
    this.templateId = templateId
  }

  sendMail() {
    sgMail.setApiKey(sendGridKey);
    const msg = {
      to: this.to_email,
      from: 'no-reply@taddletext.com',
      subject: this.subject,
      text: this.text,
      template_id: this.templateId,
      dynamic_template_data: {
        message_title: this.title,
        user_name: this.name,
        message: this.message,
        link: this.link
      }
    };
    sgMail.send(msg);
  }

}

module.exports = SendGrid;
