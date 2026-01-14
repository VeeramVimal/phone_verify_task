const express = require("express");
const {authController} = require("../../controller");
// const apiAuth = require("../middlewares/apiAuth");

const router = express.Router();

router.route("/demo/login").get((req, res) => {
    console.log("asdfasdfas");
    res.send({ msg: "hi dude"})
});

router.route("/register").post(authController.userRegister);
router.route("/login").post(authController.userLogin);


module.exports = router;