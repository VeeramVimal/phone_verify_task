const Mongoose = require("mongoose");
const Config = require("./config");

Mongoose.connect(Config.mongodburl, {  useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("DB is connected successfully"))
.catch((err) => console.log("DB is not connected its err: ", err));


