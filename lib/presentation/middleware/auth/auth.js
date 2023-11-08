"use strict";
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
const authMiddleware = async (req, res, next) => {
    const accessToken = req.cookies.access_token || "";
    const idToken = req.cookies.id_token || "";
    const refreshToken = req.cookies.refresh_token || "";
    // if (accessToken === "" && idToken === "" && refreshToken) {
    //   console.log("expired");
    //   // res.status(440).send({ success: false, error: "Session expired" });
    //   next();
    // } else
    try {
        const input = {
            // GetUserRequest
            AccessToken: accessToken, // required
        };
        const command = new client_cognito_identity_provider_1.GetUserCommand(input);
        const cognitoUser = await cognito_1.default.send(command);
        req.cognitoUser = cognitoUser;
        // has username
        const userInfo = await exports.jwtVerifier.verifySync(String(accessToken));
        req.userInfo = userInfo;
        next();
    }
    catch (err) {
        // you are forbidden to access the service or your token is not verified
        res.status(404).json({ statusCode: 404, message: "Forbidden" });
    }
};
exports.authMiddleware = authMiddleware;
