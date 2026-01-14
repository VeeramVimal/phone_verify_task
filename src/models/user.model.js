const { Schema, ObjectId, Modle } = require("../config/config");
const { roles } = require("../config/roles");

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true      
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        validate: {
            validator: function (value) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
            },
            message: '{VALUE} is not a valid email!'
        },
        required: [true, "Email required"],

    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8
    },
    phoneNumber: {
        type: String,
        validate: {
            validator: function (value) {
                return /^[0-9]{10}/.test(value);
            },
            message: '{VALUE} is not a valid 10 digit number!'
        },
        required: true
    },
    roleName: {
        type: String,
        values: roles,
        default: 'user',
        required: true
    },
    userStatus: {
        type: Number,
        required: true
    },
    accessTerms: {
        type: Boolean,
        default: 0,
        required: true
    },
    createdBy: {
        type: String
    },
    updatedBy: {
        type: String
    }
}, {
    collation: "users",
    timestamps: true
});

module.exports = User = Modle("users", userSchema)