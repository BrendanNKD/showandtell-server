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
exports.login = exports.changePassword = exports.confirmResetPassword = exports.resetPassword = exports.resendConfirmationCode = exports.confirmSignUp = exports.signUp = void 0;
const client_cognito_identity_provider_1 = require("@aws-sdk/client-cognito-identity-provider");
const config_1 = __importDefault(require("../../../config/config"));
const cognito_1 = __importDefault(require("../../../infrastructure/provider/aws/cognito"));
const signUp = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = user;
    const command = new client_cognito_identity_provider_1.SignUpCommand({
        ClientId: config_1.default.aws.cognito.clientId,
        Username: username,
        Password: password,
        UserAttributes: [{ Name: "email", Value: email }],
    });
    return cognito_1.default.send(command);
});
exports.signUp = signUp;
const confirmSignUp = (username, otp) => __awaiter(void 0, void 0, void 0, function* () {
    const command = new client_cognito_identity_provider_1.ConfirmSignUpCommand({
        ClientId: config_1.default.aws.cognito.clientId,
        Username: username,
        ConfirmationCode: otp,
    });
    return cognito_1.default.send(command);
});
exports.confirmSignUp = confirmSignUp;
const resendConfirmationCode = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const command = new client_cognito_identity_provider_1.ResendConfirmationCodeCommand({
        ClientId: config_1.default.aws.cognito.clientId,
        Username: username,
    });
    return cognito_1.default.send(command);
});
exports.resendConfirmationCode = resendConfirmationCode;
const resetPassword = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const command = new client_cognito_identity_provider_1.ForgotPasswordCommand({
        ClientId: config_1.default.aws.cognito.clientId,
        Username: username,
    });
    return cognito_1.default.send(command);
});
exports.resetPassword = resetPassword;
const confirmResetPassword = (username, password, confirmationCode) => __awaiter(void 0, void 0, void 0, function* () {
    const command = new client_cognito_identity_provider_1.ConfirmForgotPasswordCommand({
        ClientId: config_1.default.aws.cognito.clientId,
        Username: username,
        Password: password,
        ConfirmationCode: confirmationCode,
    });
    return cognito_1.default.send(command);
});
exports.confirmResetPassword = confirmResetPassword;
const changePassword = (accessToken, previousPassword, proposedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const command = new client_cognito_identity_provider_1.ChangePasswordCommand({
        AccessToken: accessToken,
        PreviousPassword: previousPassword,
        ProposedPassword: proposedPassword,
    });
    return cognito_1.default.send(command);
});
exports.changePassword = changePassword;
const login = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const command = new client_cognito_identity_provider_1.InitiateAuthCommand({
        ClientId: config_1.default.aws.cognito.clientId,
        AuthFlow: client_cognito_identity_provider_1.AuthFlowType.USER_PASSWORD_AUTH,
        AuthParameters: { USERNAME: username, PASSWORD: password },
    });
    return cognito_1.default.send(command);
});
exports.login = login;
