const jwt = require("jsonwebtoken");
const config = require("../config/config");
const { errorResponse } = require("../helpers/response");
const { userServices } = require("../services");
const passport = require("passport");
const ApiError = require("../utils/ApiError");

const verifyCallback = (req, resolve, reject, requiredRights) => async (err, user, info) => {
    if (err || info || !user) {
        return reject(errorResponse(req, res, 'User is not found in system. Please authenticate', 401));
    }
    req.user = user;
    //   if (requiredRights.length) {
    //     const userRights = roleRights.get(user.roleName);
    //     const hasRequiredRights = requiredRights.every((requiredRight) => userRights.includes(requiredRight));
    //     if (!hasRequiredRights && req.params.userId !== user.id) {
    //       return reject(errorResponse(req, res, 'Incorrect token is provided, try re-login', 401));
    //     }
    //   }
    resolve();
};


const apiAuthendicate = async (req, res, next) => {
    return new Promise((resolve, reject) => {
        passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject, res))(req, res, next);

        // passport.authenticate('jwt', { session: false }, function verifyCallback() {
        //     if (!(req.headers && req.headers['authorization'])) {
        //         return errorResponse(req, res, 'Token is not provided', 401);
        //     }
        //     const token = req.headers['authorization']
        //     try {
        //         const bearer = token.split(' ');
        //         const bearerToken = bearer[1];
        //         const decoded = jwt.verify(bearerToken, config.JWT.secret);
        //         req.user = decoded.users;
        //         const user = userServices.getUserByEmail(req.user.email);
        //         if (!user) return reject( errorResponse(req, res, 'User is not found in system.Please authenticate', 401))
        //         //    const reqUser = user
        //         req.user = user;
        //         return resolve()
        //     } catch (error) {
        //         return reject(errorResponse(req, res, 'Incorrect token is provided, try re-login', 401));
        //     }
        // })(req, res, next)

    })
        .then(() => next())
        .catch((err) => next(err))
}

module.exports = apiAuthendicate