const { Schema, Modle, ObjectId } = require("../config/config");
const { tokenTypes } = require("../config/token");

const tokenSchema = new Schema(
    {
        token: {
            type: String,
            required: true,
            index: true,
        },
        otp: {
            type: Number,
            default: null
        },
        userId: {
            type: ObjectId,
            ref: "users",
            required: true,
        },
        tokenType: {
            type: String,
            required: true,
            enum: [
                tokenTypes.REFRESH,
                tokenTypes.RESET_PASSWORD,
                tokenTypes.VERIFY_EMAIL,
                tokenTypes.VERIFY_PHONE_OTP
            ],
        },
        expires: {
            type: Date,
            required: true,
        },
        blacklisted: {
            type: Boolean,
            default: false,
        },
        createdBy: {
            type: String,
            required: true,
            default: "system",
        },
        updatedBy: {
            type: String,
        }
    },
    {
        collection: "tokens",
        timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
    }
);

tokenSchema.pre("save", function (next) {
    if (this.isNew && !this.createdBy) {
        this.createdBy = "system";
    }
    next();
});

tokenSchema.pre("findOneAndUpdate", function (next) {
    this._update.updatedBy = this._update.updatedBy || "system";
    next();
});

module.exports = Token = Modle("tokens", tokenSchema);
