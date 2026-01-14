const crypto = require("crypto");
const { Users } = require("../models");
const { default: mongoose } = require("mongoose");

const isEmailTaken = async (email) => {
  const checkEmail = await Users.findOne({ email: email });
  return !!checkEmail;
};

const isPasswordValidate = async (password) => {
  if (!password.match(/^.{8,}/))
    throw new Error("Password must contain at least minimum eight in length");
  if (!password.match(/^(?=.*?[A-Z])/))
    throw new Error("Password must contain at least one upper case");
  if (!password.match(/^(?=.*\W)/))
    throw new Error(" Password must contain at least one special character");
};


const userRegisterServices = async (userBody) => {
  if (await isEmailTaken(userBody.email)) {
    throw new Error("users already exists with same email");
  }
  if (await isPasswordValidate(userBody.password)) {
    throw new Error("Password not support");
  }
  userBody.status = 1;
  userBody.password = await crypto.createHash("md5").update(userBody.password).digest("hex");
  return Users.create(userBody).then((user) => (user)).catch(err => err)
};


const getUserByEmail = async (email) => {
  const checkEmail = await Users.findOne({ email: email });
  return checkEmail
}

const getUserById = (userId) => {
    return Users.findOne({ _id: userId });
}

const updateUserById = async (userId, updateBody) => {
    const user = await getUserById(userId);
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    if(updateBody.email && (await getUserByEmail(updateBody.email))){
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');  
    }
    Object.assign(user, updateBody);
    await user.save();
    return user
}
module.exports = {
  userRegisterServices,
  getUserByEmail,
  getUserById,
  updateUserById
};
