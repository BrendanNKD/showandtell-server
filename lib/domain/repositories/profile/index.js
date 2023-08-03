"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../../../data/mongodb/model/user"));
class ProfileRepositoryImpl {
    async createOneProfile(profile) {
        const result = await new user_1.default(profile).save();
        return result;
    }
    async getOneProfile(username) {
        const result = await user_1.default.findOne({ username }).lean();
        return result;
    }
    async getAllProfile() {
        const result = await user_1.default.find({}).lean();
        return result;
    }
}
exports.default = ProfileRepositoryImpl;
