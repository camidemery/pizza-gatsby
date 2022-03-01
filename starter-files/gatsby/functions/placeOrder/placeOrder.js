// js files must be in folder named the same thing

// to make its own package.json, go to file in terminal
// and type `npm init`

// postmark is good transactional email service
// we are using ethereal to create test account

const nodemailer = require('nodemailer');

// create a transport for nodemailer
// don't save these in git
const transporter = nodemailer.createTransport({
  // auth vars
  host: process.env.MAIL_HOST,
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

exports.handler = async (event, context) => {
  // test send an email
  const info = await transporter.sendMail({
    from: 'Slicks Slices <slick@example.com>',
    to: 'order@example.com',
    subject: 'New Order',
    html: `<p> Your New Pizza Order is Here </p>`,
  });
  return {
    statusCode: 200,
    body: JSON.stringify(info),
  };
};
