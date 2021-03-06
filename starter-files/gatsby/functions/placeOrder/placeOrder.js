// js files must be in folder named the same thing

// to make its own package.json, go to file in terminal
// and type `npm init`

// postmark is good transactional email service
// we are using ethereal to create test account

const nodemailer = require('nodemailer');

function generateOrderEmail({ order, total }) {
  return `<div>
    <h2>Your recent order for ${total}</h2>
    <p>Please pick up yo shit</p>
    <ul>
      ${order
        .map(
          (item) => `<li>
        ${item.name} ${item.size} - ${item.price}
      </li>`
        )
        .join('')}
    </ul>
  </div>
  `;
}

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

function wait(ms = 0) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
}

// Send success or error message
exports.handler = async (event, context) => {
  // await wait(5000);
  const body = JSON.parse(event.body);

  // check if they have filled out honeypot
  if (body.mapleSyrup) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'BEEP BOOP ERROR 454' }),
    };
  }

  // validate data coming in
  const requiredFields = ['email', 'name', 'order'];
  for (const field of requiredFields) {
    console.log(`Checking that the ${field} is good`);
    if (!body[field]) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: `OOPS! You are missing the ${field} field`,
        }),
      };
    }
  }

  // make sure they havve items in the order
  if (!body.order.length) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: `OOPS! You are missing pizzas`,
      }),
    };
  }

  // test send an email
  const info = await transporter.sendMail({
    from: 'Slicks Slices <slick@example.com>',
    to: `${body.name} <${body.email}>, orders@example.com`,
    subject: 'New Order',
    html: generateOrderEmail({ order: body.order, total: body.total }),
  });
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Success' }),
  };
};
