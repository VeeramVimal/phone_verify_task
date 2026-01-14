const express = require("express");
const {authController} = require("../../controller");
const auth = require("../../middlewares/apiAuth");
const authValidation = require("../../validations/auth.validation");
const validate = require("../../middlewares/validate");

const router = express.Router();

router.route("/demo/login").get((req, res) => {
    console.log("asdfasdfas");
    res.send({ msg: "hi dude"})
});

router.route("/register").post(validate(authValidation.register),authController.userRegister);
router.route("/login").post(validate(authValidation.login), authController.userLogin);
router.route('/logout').post(validate(authValidation.logOut), authController.userLogOut)
router.route('/send-verification-email').post(auth, authController.sendEmailVerification);
router.route('/verify-email').post(validate(authValidation.verifyEmail), authController.verifyEmail);

router.route('/verify-otp').post(validate(authValidation.verifyOtp), authController.verifyOtp);

module.exports = router;