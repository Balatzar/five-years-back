const Mailgun = require('mailgun-js');
const domain = process.env.MAILGUN_DOMAIN;
const apiKey = process.env.MAILGUN_API_KEY;

const mailgun = new Mailgun({ apiKey, domain });

module.exports = (from, to, subject, html, callback) => {
  const data = { from, to, subject, html };

  mailgun.messages().send(data, (err, body) => {
    if (err) {
      callback(err);
    } else {
      callback(null, body);
    }
  });
};
