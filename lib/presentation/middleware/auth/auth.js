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
exports.authMiddleware = exports.jwtVerifier = void 0;
const client_cognito_identity_provider_1 = require("@aws-sdk/client-cognito-identity-provider");
const cognito_1 = __importDefault(require("../../../infrastructure/provider/aws/cognito"));
const aws_jwt_verify_1 = require("aws-jwt-verify");
const config_1 = __importDefault(require("../../../config/config"));
exports.jwtVerifier = aws_jwt_verify_1.CognitoJwtVerifier.create({
    userPoolId: String(config_1.default.aws.cognito.userPoolId),
    tokenUse: "access",
    clientId: String(config_1.default.aws.cognito.clientId), // needs to be specified here or upon calling verify
});
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = req.cookies.access_token || "";
    // const idToken = req.cookies.id_token || "";
    // const refreshToken = req.cookies.refresh_token || "";
    if (accessToken === "") {
        res.status(401).json({ success: false, error: "Not Authenticated" });
    }
    else {
        try {
            const input = {
                // GetUserRequest
                AccessToken: accessToken, // required
            };
            const command = new client_cognito_identity_provider_1.GetUserCommand(input);
            const cognitoUser = yield cognito_1.default.send(command);
            console.log(cognitoUser);
            req.cognitoUser = cognitoUser;
            // has username
            const userInfo = exports.jwtVerifier.verifySync(String(accessToken));
            req.userInfo = userInfo;
            next();
        }
        catch (_a) {
            // you are forbidden to access the service or your token is not verified
            res.status(404).json({ statusCode: 404, message: "Forbidden" });
        }
    }
});
exports.authMiddleware = authMiddleware;
