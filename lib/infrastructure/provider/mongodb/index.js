"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
async function getMongodbClient() {
    const db = await mongoose_1.default.connect(String(process.env.MONGOOSE_URL));
    return db.connection;
}
exports.default = getMongodbClient;
