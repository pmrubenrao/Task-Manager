const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
  sgMail
    .send({
      to: email,
      from: 'pmrubenrao@gmail.com',
      subject: 'Thanks for Joining in!',
      text: `Welcome to the Task Manager ${name}. Let me know how you get along with the app`,
    })
    .then(() => {
      console.log('Email sent');
    })
    .catch((error) => {
      console.error(error);
    });
};

const sendGoodbyeEmail = (email, name) => {
  sgMail
    .send({
      to: email,
      from: 'pmrubenrao@gmail.com',
      subject: 'Its hard to see you Go!',
      text: `Hi ${name}. Is there anything that can be done to improve our service`,
    })
    .then(() => {
      console.log('Good bye Email sent');
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = {
  sendWelcomeEmail,
  sendGoodbyeEmail,
};

// const msg = {
//   to: 'pmrubenrao@gmail.com', // Change to your recipient
//   from: 'pmrubenrao@gmail.com', // Change to your verified sender
//   subject: 'Sending with SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// };
// sgMail;
