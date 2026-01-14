const path = require("path");
const multer = require("multer");
const express = require("express");
var app = express();

const fileDescription = (req, file, callback) => {
    return callback(null, './public/images')
}

const fileNameFunctions = (req, file, callback) => {
    req.body(file.fileName) = `${file.fileName}_${Date.now()}`
    return callback(null, `${file.fileName}_${Date.now()}`)
}

const Storage = multer.diskStorage({
    destination: fileDescription,
    filename: fileNameFunctions
});

const upload = multer({
    storage: Storage,
});

module.exports = upload;