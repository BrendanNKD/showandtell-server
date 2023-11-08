"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_cognito_identity_provider_1 = require("@aws-sdk/client-cognito-identity-provider");
const cognitoErrorHandler = (err, req, res, next) => {
    if (err instanceof client_cognito_identity_provider_1.NotAuthorizedException) {
        return res
            .status(err.$metadata.httpStatusCode ? err.$metadata.httpStatusCode : 500)
            .json({
            message: err.message,
            err: err.name,
        });
    }
    if (err instanceof client_cognito_identity_provider_1.UsernameExistsException) {
        return res
            .status(err.$metadata.httpStatusCode ? err.$metadata.httpStatusCode : 500)
            .json({
            message: err.message,
            err: err.name,
        });
    }
    if (err instanceof client_cognito_identity_provider_1.CodeMismatchException) {
        res
            .status(err.$metadata.httpStatusCode ? err.$metadata.httpStatusCode : 500)
            .json({ message: err.message, err: err.name });
    }
    if (err instanceof client_cognito_identity_provider_1.UserNotFoundException) {
        res
            .status(err.$metadata.httpStatusCode ? err.$metadata.httpStatusCode : 500)
            .json({ message: err.message, err: err.name });
    }
    if (err instanceof client_cognito_identity_provider_1.ExpiredCodeException) {
        res
            .status(err.$metadata.httpStatusCode ? err.$metadata.httpStatusCode : 500)
            .json({ message: err.message, err: err.name });
    }
    if (err instanceof client_cognito_identity_provider_1.UserNotConfirmedException) {
        res
            .status(err.$metadata.httpStatusCode ? err.$metadata.httpStatusCode : 500)
            .json({ message: err.message, err: err.name });
    }
    if (err instanceof client_cognito_identity_provider_1.InvalidParameterException) {
        res
            .status(err.$metadata.httpStatusCode ? err.$metadata.httpStatusCode : 500)
            .json({ message: err.message, err: err.name });
    }
};
exports.default = cognitoErrorHandler;
