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
const express_1 = __importDefault(require("express"));
const setAuthCookie_1 = __importDefault(require("../../utils/cookie/setAuthCookie"));
const captcha_1 = __importDefault(require("../middleware/captcha/captcha"));
function AuthRouter(authUserUseCase) {
    const router = express_1.default.Router();
    router.post("/register", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { password, email, dateOfBirth, firstName, lastName, username } = req.body;
            const result = yield authUserUseCase.executeCreateUser({
                email,
                password,
                dateOfBirth,
                firstName,
                lastName,
                username,
            });
            if (result)
                res.status(201).json({ message: "Account Successfully created" });
        }
        catch (err) {
            next(err);
        }
    }));
    router.post("/confirmSignup", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { username, otp } = req.body;
            const result = yield authUserUseCase.executeConfirmSignup(username, otp);
            if (result)
                res.status(200).json(result);
        }
        catch (err) {
            next(err);
        }
    }));
    router.post("/resendConfirmationCode", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { username } = req.body;
            const result = yield authUserUseCase.executeResendConfirmationCode(username);
            res.status(200).json(result);
        }
        catch (err) {
            next(err);
        }
    }));
    router.post("/forgotPassword", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { username } = req.body;
            const result = yield authUserUseCase.executeResetPassword(username);
            if (result)
                res.status(200).json(result);
        }
        catch (err) {
            next(err);
        }
    }));
    router.post("/confirmForgotPassword", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { password, otp, username } = req.body;
            const result = yield authUserUseCase.executeConfirmResetPassword(username, password, otp);
            if (result)
                res.status(200).json(result);
        }
        catch (err) {
            next(err);
        }
    }));
    router.post("/changePassword", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { previousPassword, proposedPassword } = req.body;
            const accessToken = req.cookies.access_token;
            const result = yield authUserUseCase.executeChangePassword(accessToken, previousPassword, proposedPassword);
            res.status(200).json(result);
        }
        catch (err) {
            next(err);
        }
    }));
    router.post("/login", captcha_1.default, (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { username, password } = req.body;
            if (!username || !password) {
                res.status(400).send();
                return;
            }
            const result = yield authUserUseCase.executeLogin(username, password);
            (0, setAuthCookie_1.default)(res, {
                idToken: result.AuthenticationResult.IdToken,
                accessToken: result.AuthenticationResult.AccessToken,
                refreshToken: result.AuthenticationResult.RefreshToken,
            });
            res.status(200).json(true);
        }
        catch (err) {
            next(err);
        }
    }));
    return router;
}
exports.default = AuthRouter;
