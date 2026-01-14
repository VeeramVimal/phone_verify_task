
const JWT = require("jsonwebtoken");
const config = require("../config/config");
const { tokenTypes } = require("../config/token");

/**
 * @description Generate token
 * @param {ObjectId} userId
 * @param {string} type
 * @param {Moment} expires
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
    return JWT.sign(payload, secret); // Sign Token with the payload
};

/**
 * @description Generate auth tokens
 * @param {User} user
 * @returns {Promise<Object>}
 */
const generateAuthToken = async (user) => {
  const { _id, email, firstName, lastName, roleName} = user
  const accessTokenExpires = moment().add(config.JWT.accessExpirationMinutes, 'minutes');
  const accessToken = await generatetoken(_id, email, firstName, lastName, roleName, tokenTypes.ACCESS, accessTokenExpires);
  // const refreshTokenExpires = moment().add(config.jwt.refreshExpirationDays, 'days');
  // const refreshToken = await generatetoken(_id, email, tokenTypes.REFERSH, refreshTokenExpires);
  return {
      access: {
          token: accessToken,
          expires: accessTokenExpires.toDate()
      },
  }
}

module.exports = {
  generatetoken,
  generateAuthToken
}