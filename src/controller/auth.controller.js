const Message = require("../helpers/constants.message");
const { errorResponse, successResponse } = require("../helpers/response");
const {
  authServices,
  tokenServices,
  userServices,
  emailServices,
} = require("../services/index");
const catchAsync = require("../utils/catchAsync");
const userRegister = catchAsync(async (req, res) => {
  try {
    const user = await userServices.userRegisterServices(req.body);
    if (user)
      return successResponse(req, res, Message.USER_SIGNUP_SUCCESSFULLY, user, 200);
  } catch (error) {
    return errorResponse(req, res, "", "", error);
  }
});

const userLogin = catchAsync(async (req, res) => {
  try {
    const user = await authServices.userLoginServices(req.body);
    console.log("req.user====", user);

    const token = await tokenServices.generateAuthToken(user);
    console.log("req.token====", token);

    if (!user) return successResponse(req, res, Message.USER_NOT_FOUND, "", 200);
    return successResponse(req, res, Message.USER_SIGNIN_SUCCESSFULLY, { user, token }, 200);

  } catch (error) {
    return errorResponse(req, res, "", "", error);
  }
});

const userLogOut = catchAsync(async (req, res) => {
  try {
    await authServices.logoutServices(req.body.refreshToken);
    return successResponse(req, res, Message.USER_SIGNOUT_SUCCESSFULLY, null, 200);
  } catch (error) {
    return errorResponse(req, res, "", "", error);
  }
});

const sendEmailVerification = catchAsync(async (req, res) => {
  try {
    console.log("req.user=====", req.user);
    
    const verifyEmailToken = await tokenServices.generateVerifyEmailToken(
      req.user
    );
    await emailServices.sendVerificationEmail(verifyEmailToken, req.user);
    return successResponse(req, res, Message.SEND_EMAIL_VERIFICATION, null, 200);

  } catch (error) {
    return errorResponse(req, res, "", "", error);
  }
});

const verifyEmail = catchAsync(async (req, res) => {
  try {
    await authServices.verifyEmailServices(req.query.token);
    return successResponse(req, res, Message.EMAIL_VERIFIED_SUCCESSFULLY, null, 200);

  } catch (error) {
    return errorResponse(req, res, "", "", error);
  }
});

const verifyOtp = catchAsync(async (req, res) => {
  try {
    await authServices.verifyEmailServices(req.query.token);
    return successResponse(req, res, Message.EMAIL_VERIFIED_SUCCESSFULLY, null, 200);

  } catch (error) {
    return errorResponse(req, res, "", "", error);
  }
});
verifyOtp

module.exports = {
  userRegister,
  userLogin,
  userLogOut,
  verifyEmail,
  sendEmailVerification,
  verifyOtp,
};
