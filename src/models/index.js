const Mongoose = require('mongoose');
Mongoose.Promise = global.Promise;
const db = {};
db.Mongoose = Mongoose;

db.Users = require("./user.model");
db.Images = require("./image.model");


module.exports = db