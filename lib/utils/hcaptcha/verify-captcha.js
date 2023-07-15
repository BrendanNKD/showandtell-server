"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hcaptcha_1 = __importDefault(require("hcaptcha"));
const config_1 = __importDefault(require("../../config/config"));
const verifyCaptcha = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield hcaptcha_1.default.verify(config_1.default.hcaptcha.secret || "", token, undefined, config_1.default.hcaptcha.siteKey);
    return result.success;
});
exports.default = verifyCaptcha;
