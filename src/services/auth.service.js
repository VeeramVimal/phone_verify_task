const { Users, Tokens } = require("../models");
const crypto = require("crypto");
const Message = require("../helpers/constants.message");
// const { userServices } = require("./user.service");
const { tokenTypes } = require("../config/token");
const { userServices, emailServices, tokenServices } = require("./index");

const getUserDetails = async (email) => {
  const checkEmail = await Users.findOne({ email: email });
  return checkEmail;
};


const userLoginServices = async ({email, password}) => {
  const user = await getUserDetails(email);
        console.log("req.userLoginServices====", user);

  const reqPass = crypto.createHash("md5").update(password).digest("hex");  
  if (user) {
    if (user.password !== reqPass) throw new Error(Message.INCORRECT_PASSWORD);
  } else throw new Error(Message.INCORRECT_EMAIL);
  return user;
};

const logoutServices = async (refreshToken) => {
  const refrestokenDoc = await Tokens.findOne({
    where: {
      token: refreshToken,
      tokenType: tokenTypes.REFRESH,
      blacklisted: false
    }
  })
  if (!refrestokenDoc) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
  }
  return refrestokenDoc.destroy()
}


const verifyEmailServices = async (verifyEmailToken) => {
  try {
    const verifyEmailTokenDoc = await tokenServices.verifyToken(verifyEmailToken, tokenTypes.VERIFY_EMAIL);
    const user = await userServices.getUserById(verifyEmailTokenDoc.userId);
    if(!user){
      throw new Error();
    }
    await Tokens.destroy({ where: { userId: user._id, tokenType: tokenTypes.VERIFY_EMAIL }});
    await userServices.updateUserById(user.id, { isEmailVerified: 1 })
  } catch (error) {
    if(error && error.name && error.name === "TokenExpiredError"){
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Token expired');
    }
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Email verification failed');
  }
}


const verifyOtpServices = async (verifyOtp) => {
  try {
    const verifyOtpDoc = await tokenServices.verifyOtp(verifyOtp, tokenTypes.VERIFY_PHONE_OTP);
    const user = await userServices.getUserById(verifyOtpDoc.userId);
    if(!user){
      throw new Error();
    }
    await Tokens.destroy({ where: { userId: user._id, tokenType: tokenTypes.VERIFY_PHONE_OTP }});
    await userServices.updateUserById(user.id, { isPhoneVerified: 1 })
  } catch (error) {
    if(error && error.name && error.name === "TokenExpiredError"){
      throw new ApiError(httpStatus.UNAUTHORIZED, 'OTP expired');
    }
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Phone OTP verification failed');
  }
}

module.exports = {
  userLoginServices,
  getUserDetails,
  verifyEmailServices,
  logoutServices,
  verifyOtpServices
};
