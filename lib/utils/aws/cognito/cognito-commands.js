"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.changePassword = exports.confirmResetPassword = exports.resetPassword = exports.resendConfirmationCode = exports.confirmSignUp = exports.signUp = void 0;
const client_cognito_identity_provider_1 = require("@aws-sdk/client-cognito-identity-provider");
const config_1 = __importDefault(require("../../../config/config"));
const cognito_1 = __importDefault(require("../../../infrastructure/provider/aws/cognito"));
const signUp = async (user) => {
    const { username, email, password } = user;
    const command = new client_cognito_identity_provider_1.SignUpCommand({
        ClientId: config_1.default.aws.cognito.clientId,
        Username: username,
        Password: password,
        UserAttributes: [{ Name: "email", Value: email }],
    });
    return cognito_1.default.send(command);
};
exports.signUp = signUp;
const confirmSignUp = async (username, otp) => {
    const command = new client_cognito_identity_provider_1.ConfirmSignUpCommand({
        ClientId: config_1.default.aws.cognito.clientId,
        Username: username,
        ConfirmationCode: otp,
    });
    return cognito_1.default.send(command);
};
exports.confirmSignUp = confirmSignUp;
const resendConfirmationCode = async (username) => {
    const command = new client_cognito_identity_provider_1.ResendConfirmationCodeCommand({
        ClientId: config_1.default.aws.cognito.clientId,
        Username: username,
    });
    return cognito_1.default.send(command);
};
exports.resendConfirmationCode = resendConfirmationCode;
const resetPassword = async (username) => {
    const command = new client_cognito_identity_provider_1.ForgotPasswordCommand({
        ClientId: config_1.default.aws.cognito.clientId,
        Username: username,
    });
    return cognito_1.default.send(command);
};
exports.resetPassword = resetPassword;
const confirmResetPassword = async (username, password, confirmationCode) => {
    const command = new client_cognito_identity_provider_1.ConfirmForgotPasswordCommand({
        ClientId: config_1.default.aws.cognito.clientId,
        Username: username,
        Password: password,
        ConfirmationCode: confirmationCode,
    });
    return cognito_1.default.send(command);
};
exports.confirmResetPassword = confirmResetPassword;
const changePassword = async (accessToken, previousPassword, proposedPassword) => {
    const command = new client_cognito_identity_provider_1.ChangePasswordCommand({
        AccessToken: accessToken,
        PreviousPassword: previousPassword,
        ProposedPassword: proposedPassword,
    });
    return cognito_1.default.send(command);
};
exports.changePassword = changePassword;
const login = async (username, password) => {
    const command = new client_cognito_identity_provider_1.InitiateAuthCommand({
        ClientId: config_1.default.aws.cognito.clientId,
        AuthFlow: client_cognito_identity_provider_1.AuthFlowType.USER_PASSWORD_AUTH,
        AuthParameters: { USERNAME: username, PASSWORD: password },
    });
    return cognito_1.default.send(command);
};
exports.login = login;
