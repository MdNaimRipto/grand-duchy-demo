"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = exports.usersSchema = void 0;
const mongoose_1 = require("mongoose");
const user_constant_1 = require("./user.constant");
exports.usersSchema = new mongoose_1.Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    uid: { type: String, required: true },
    userType: {
        type: String,
        required: true,
        enum: ["ADMIN", "USER"],
        default: "USER",
    },
    linkedProviders: {
        type: [
            {
                type: String,
                enum: user_constant_1.LinkedProvidersEnums,
            },
        ],
        required: true,
    },
    fontSize: { type: Number, required: true, default: 16, min: 0 },
    totalActive: { type: Number, required: true, default: 1000, min: 0 },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Users = (0, mongoose_1.model)("Users", exports.usersSchema);
