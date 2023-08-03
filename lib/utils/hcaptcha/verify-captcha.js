"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hcaptcha_1 = __importDefault(require("hcaptcha"));
const config_1 = __importDefault(require("../../config/config"));
const verifyCaptcha = async (token) => {
    const result = await hcaptcha_1.default.verify(config_1.default.hcaptcha.secret || "", token, undefined, config_1.default.hcaptcha.siteKey);
    return result.success;
};
exports.default = verifyCaptcha;
