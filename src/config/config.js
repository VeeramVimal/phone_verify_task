const Mongoose = require("mongoose");
const model = Mongoose.model;
const schema = Mongoose.Schema;
const ObjectId = Mongoose.Schema.Types.ObjectId;
const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: path.join(__dirname, '../../.env.local')})


module.exports = {
  PORT: process.env.APP_PORT,
  mongodburl: process.env.DATABASE_URL,
  Schema: schema,
  Modle: model,
  ObjectId,
  JWT: {
    secret: process.env.JWT_SECRET,
    accessExpirationMinutes: process.env.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: process.env.JWT_REFRESH_EXPIRATION_DAYS,
    // resetPasswordExpirationMinutes:
    //   envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    // verifyEmailExpirationMinutes: envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
  },
  EMAIL: {
    smtp: {
      service: "Gmail",
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    },
    from: process.env.EMAIL_FROM,
  },

};

// mongodb+srv://VimalRaj:*****@cluster0.1b2f5.mongodb.net/mongo_demo_1

// mongodb+srv://Demo_db:HrJ9fHIP5PtKtHIc@cluster0.wu8eb.mongodb.net/task_vr?retryWrites=true&w=majority