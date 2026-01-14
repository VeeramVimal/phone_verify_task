const { Schema, ObjectId, Modle } = require("../config/config");

const userSchema = new Schema({
    userID: String,
    imageUrl: {
        type: String
    },
    createdBy: {
        type: String
    },
    updatedBy: {
        type: String
    }
}, {
    collation: "profiles",
    timestamps: true
});

module.exports = User = Modle("profiles", userSchema)