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
const verify_captcha_1 = __importDefault(require("../../../utils/hcaptcha/verify-captcha"));
const captchaMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // disable captcha verification for local development
    if (process.env.ENVIRONMENT === "dev") {
        next();
        return;
    }
    const captchaToken = req.headers["captcha-token"] || "";
    if (captchaToken === "") {
        // if no token at all means no authentication
        res
            .status(400)
            .json({ success: false, error: "Captcha token is not defined" });
    }
    else {
        // verifying token to see if token valid
        try {
            // token verified go to next function
            const result = yield (0, verify_captcha_1.default)(captchaToken);
            if (result) {
                next();
                return;
            }
            res.status(400).json({ success: false, error: "Invalid captcha token" });
            return;
        }
        catch (e) {
            // you are forbidden to access the service or your token is not verified
            res
                .status(400)
                .json({ statusCode: 400, message: "Invalid captcha token" });
        }
    }
});
exports.default = captchaMiddleware;
