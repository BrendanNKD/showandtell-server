"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const profiles_1 = require("./profiles");
const accountSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
        index: true,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
    },
    profiles: [profiles_1.profileSchema],
}, { timestamps: true });
const UserModel = (0, mongoose_1.model)("User", accountSchema);
exports.default = UserModel;
