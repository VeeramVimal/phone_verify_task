const Mongoose = require("mongoose");
const model = Mongoose.model;
const schema = Mongoose.Schema;
const ObjectId = Mongoose.Schema.Types.ObjectId;
const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: path.join(__dirname, '../../.env.local') })


module.exports = {
  PORT: process.env.APP_PORT,
  mongodburl: process.env.DATABASE_URL,
  uiURL: process.env.WEB_APP_URL,
  Schema: schema,
  Modle: model,
  ObjectId,
  JWT: {
    secret: process.env.JWT_SECRET,
    accessExpirationMinutes: process.env.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: process.env.JWT_REFRESH_EXPIRATION_DAYS,
    verifyEmailExpirationMinutes: process.env.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
  },
  OTP: {
    expirationMinutes: process.env.OTP_EXPIRATION_MINUTES,
  },
  EMAIL: {
    smtp: {
      service: "Gmail",
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    },
    from: process.env.EMAIL_FROM,
  },

};
