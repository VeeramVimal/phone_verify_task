const { Users } = require("../models");
const crypto = require("crypto");
const Message = require("../helpers/constants.message");

const getUserDetails = async (email) => {
  const checkEmail = await Users.findOne({ email: email });
  return checkEmail;
};

const userLoginServices = async (email, password) => {
  const user = await getUserDetails(email);
  const reqPass = crypto.createHash("md5").update(password).digest("hex");
  if (user) {
    if (user.password !== reqPass) throw new Error(Message.INCORRECT_PASSWORD);
  } else throw new Error(Message.INCORRECT_EMAIL);
  return user;
};


module.exports = {
  userLoginServices,
  getUserDetails
};
