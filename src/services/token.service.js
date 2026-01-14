
const JWT = require("jsonwebtoken");
const config = require("../config/config");
const { tokenTypes } = require("../config/token");
const moment = require("moment");
const { Tokens } = require("../models");


/**
 * @description Generate token
 * @param {ObjectId} userId
 * @param {string} type
 * @param {moment} expires
 * @param {string} [secret]
 * @returns {string}
 */
const generatetoken = async (userId, type, expires, secret = config.JWT.secret) => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
    type,
  }
  return JWT.sign(payload, secret);
};


/**
* @description Save a token
* @param {string} token
* @param {ObjectId} userId
* @param {moment} expires
* @param {string} type
* @param {boolean} [blacklisted]
* @returns {Promise<Tokens>}
*/
const saveToken = async (token, otp, userId, expires, type, blacklisted = false) => {
  const tokenDoc = await Tokens.create({
    token,
    otp,
    userId: userId,
    expires: expires.toDate(),
    tokenType: type,
    createdBy: userId,
    blacklisted,
  });
  return tokenDoc;
}

/**
* @description Verify token and return token doc (or throw an error if it is not valid)
* @param {string} token
* @param {string} type
* @returns {Promise<Tokens>}
*/
const verifyToken = async (token, type) => {
  const payload = JWT.verify(token, config.JWT.secret);
  const tokenDoc = await Tokens.findOne({ where: { token, userId: payload.sub, tokenType: type, blacklisted: false } });
  if (!tokenDoc) {
    throw new Error('Token not found. Request verification again');
  }
  return tokenDoc
}

const verifyOtp = async (otp, type) => {
  // const payload = JWT.verify(token, config.JWT.secret);
  const tokenDoc = await Tokens.findOne({ where: {otp, tokenType: type, blacklisted: false } });
  if (!tokenDoc) {
    throw new Error('OTP not found. Request verification again');
  }
  return tokenDoc
}

/**
 * @description Generate auth tokens
 * @param {User} user
 * @returns {Promise<Object>}
 */
const generateAuthToken = async (user) => {
  const { _id, email, firstName, lastName, roleName } = user;
  const userId = (user._id).toString();
  const accessTokenExpires = moment().add(config.JWT.accessExpirationMinutes, 'minutes');
  const accessToken = await generatetoken(userId, tokenTypes.ACCESS, accessTokenExpires);

  const refreshTokenExpires = moment().add(config.JWT.refreshExpirationDays, 'days');
  const refreshToken = await generatetoken(userId, tokenTypes.REFRESH, refreshTokenExpires);
  await saveToken(refreshToken, null, user._id, refreshTokenExpires, tokenTypes.REFRESH)

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate()
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate()
    },
  }
}

/**
 * @description Generate auth tokens
 * @param {User<Object>} user
 * @returns {Promise<Object>}
 */
const generateVerifyEmailToken = async (user) => {
  const userId = (user._id).toString();
  const expires = moment().add(config.JWT.resetPasswordExpirationMinutes, 'minutes');
  const verifyEmailToken = await generatetoken(userId, tokenTypes.VERIFY_EMAIL, expires);
  await saveToken(verifyEmailToken, null, user._id, expires, tokenTypes.VERIFY_EMAIL);
  return verifyEmailToken;
}

const generateSecureOTP = async (length = 6) => {
  let otp = '';
  for (let i = 0; i < length; i++) {
    otp += crypto.randomInt(0, 10).toString();
  }
  return otp;
}

const generateVerifyOtp = async (user) => {
  const userId = (user._id).toString();
  const expires = moment().add(config.OTP.expirationMinutes, 'minutes');
  const code = await generateSecureOTP();
  await saveToken('', code, userId, expires, tokenTypes.VERIFY_PHONE_OTP);
  return code;
}

module.exports = {
  verifyToken,
  verifyOtp,
  generatetoken,
  generateAuthToken,
  generateVerifyEmailToken,
  generateVerifyOtp,
}