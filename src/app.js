const express = require("express");
const cors = require("cors");
const v1_router = require("./routes/v1");
const Db_connection = require("./config/db");
const passport = require("passport");
const { jwtStrategy } = require("./config/passport");

const app = express();

Db_connection;

app.use(cors());
app.options("*", cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// jwt authentication
app.use(passport.initialize());
passport.use("jwt", jwtStrategy);

app.use("/api/v1", v1_router); //mongo_db connection

app.use((req, res, next) => {
    next(new Error("Not found"));
});

module.exports = app;