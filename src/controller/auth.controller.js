const { Users } = require("../models");
const Message = require("../helpers/constants.message");
const { errorResponse, successResponse } = require("../helpers/response");
const { authServices, tokenServices, userServices } = require("../services/index");

const userRegister = async (req, res) => {
  try {
    const user = await userServices.userRegisterServices(req.body);
    if (user) return successResponse(req, res, Message.USER_SIGNUP_SUCCESSFULLY, user, 200);
  } catch (error) {
    return errorResponse(req, res, "", "", error);
  }
};

const userLogin = async (req, res) => {
  try {
    const user = await authServices.userLoginServices(req.body, res);
    const token = await tokenServices.generateAuthToken(user);
    if (!user) return successResponse(req, res, Message.USER_NOT_FOUND, "", 200);
    return successResponse(req, res, Message.USER_SIGNIN_SUCCESSFULLY, {user, token}, 200);
  } catch (error) {
    return errorResponse(req, res, "", "", error);
  }
};

module.exports = {
  userRegister,
  userLogin
}