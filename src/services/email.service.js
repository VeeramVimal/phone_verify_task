const nodemailer = require("nodemailer");
const config = require("../config/config");
// const logger = require('../config/logger');
const transport = nodemailer.createTransport(config.EMAIL.smtp);

if (config.env !== "test") {
  transport
    .verify()
    .then(() => console.info("Connected to email server"))
    .catch(() =>
      console.warn(
        "Unable to connect to email server. Make sure you have configured the SMTP options in .env"
      )
    );
}

const capitalizeFirstLetter = (name) => {
  return name.replace(/^./, name[0].toUpperCase());
};

/**
 * @description Send an email
 * @param {string} to
 * @param {string} subject
 * @param {string} text
 * @returns {Promise}
 */
const sendEmail = async (from, to, subject, text) => {
  const msg = { from: from, to, subject, text };
  await transport.sendMail(msg, function (err, info) {
    if (err) console.log(err);
    else {
      console.log("Email send: " + info.response);
    }
  });
};

/**
 * Send reset password email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendForgetPassword = async (token, userData) => {
  const { email, firstName, lastName } = userData;
  const subject = "Reset password link";
  const forgetPasswordUrl = `${config.client_url}/user/resetPasswort?token=${token}&email=${email}`;
  const changeName = `${firstName} ${lastName}`;
  const text = `<p>Dear ${changeName},
    We received a request for a password change on your Goaly.ly account. You can reset your password</p><a href="${forgetPasswordUrl}">here</a>. your new password.`;
  await sendEmail(config.EMAIL.from, email, subject, text);
};

/**
 * @description Send email verifications
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendVerificationEmail = async (token, userData) => {
  const { email, firstName, lastName } = userData;
  console.log("sendVerificationEmail==userData=====", userData);
  
  const subject = "Email Verifications";
  const verificationUrl = `${config.uiURL}/verify-email?token=${token}`;
  const changeName = await capitalizeFirstLetter(`${firstName} ${lastName}`);
  const text = `<p>
    Dear ${changeName},
    To verify your email, click on this link: </p><a href="${verificationUrl}">here</a>.
    If you did not create an account, then ignore this email.`;
    await sendEmail(config.EMAIL.from, email, subject, text);
};

module.exports = {
  sendEmail,
  sendForgetPassword,
  sendVerificationEmail,
};
