"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const setAuthCookie_1 = __importDefault(require("../../utils/cookie/setAuthCookie"));
const auth_1 = require("../middleware/auth/auth");
const clearAuthCookie_1 = __importDefault(require("../../utils/cookie/clearAuthCookie"));
function AuthRouter(authUserUseCase) {
    const router = express_1.default.Router();
    router.post("/register", async (req, res, next) => {
        try {
            const { password, username, profiles, email } = req.body;
            const result = await authUserUseCase.executeCreateUser({
                profiles,
                password,
                email,
                username,
            });
            if (result)
                res.status(201).json({ message: "Account Successfully created" });
        }
        catch (err) {
            next(err);
        }
    });
    router.post("/confirmSignup", async (req, res, next) => {
        try {
            const { username, otp } = req.body;
            const result = await authUserUseCase.executeConfirmSignup(username, otp);
            if (result)
                res.status(200).json(result);
        }
        catch (err) {
            next(err);
        }
    });
    router.post("/resendConfirmationCode", async (req, res, next) => {
        try {
            const { username } = req.body;
            const result = await authUserUseCase.executeResendConfirmationCode(username);
            res.status(200).json(result);
        }
        catch (err) {
            next(err);
        }
    });
    router.post("/forgotPassword", async (req, res, next) => {
        try {
            const { username } = req.body;
            const result = await authUserUseCase.executeResetPassword(username);
            if (result)
                res.status(200).json(result);
        }
        catch (err) {
            next(err);
        }
    });
    router.post("/confirmForgotPassword", async (req, res, next) => {
        try {
            const { password, otp, username } = req.body;
            const result = await authUserUseCase.executeConfirmResetPassword(username, password, otp);
            if (result)
                res.status(200).json(result);
        }
        catch (err) {
            next(err);
        }
    });
    router.post("/changePassword", async (req, res, next) => {
        try {
            const { previousPassword, proposedPassword } = req.body;
            const accessToken = req.cookies.access_token;
            const result = await authUserUseCase.executeChangePassword(accessToken, previousPassword, proposedPassword);
            res.status(200).json(result);
        }
        catch (err) {
            next(err);
        }
    });
    router.post("/login", 
    //captchaMiddleware,
    async (req, res, next) => {
        try {
            const { username, password } = req.body;
            if (!username || !password) {
                res.status(400).send();
                return;
            }
            const result = await authUserUseCase.executeLogin(username, password);
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
    });
    router.post("/logout", auth_1.authMiddleware, async (req, res, next) => {
        try {
            (0, clearAuthCookie_1.default)(res);
            res.status(200).json(true);
        }
        catch (err) {
            res.status(500).json({ error: "An error occurred" });
        }
    });
    router.post("/session", auth_1.authMiddleware, async (req, res, next) => {
        try {
            res.status(200).json(true);
        }
        catch (err) {
            res.status(500).json({ error: "An error occurred" });
        }
    });
    return router;
}
exports.default = AuthRouter;
