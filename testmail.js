const Mailgun = require('mailgun-js');
const domain = process.env.MAILGUN_DOMAIN;
const apiKey = process.env.MAILGUN_API_KEY;
const from = 'your@email.com';

const mailgun = new Mailgun({ apiKey, domain });

const data = {
  from,
  to: 'bataprod@gmail.com',
  subject: 'Hello from Mailgun',
  html: 'Coucou ! Tu as été invité sur Five Years, un site superbe !<a href="https://balatzar.github.io/five-years-front">Five Years</a>',
};

mailgun.messages().send(data, (err, body) => {
  if (err) {
    console.warn(err);
  } else {
    console.log(body);
  }
});
