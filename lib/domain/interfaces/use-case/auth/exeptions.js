"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitiateAuthExeptions = exports.ChangePasswordExceptions = exports.ConfirmForgotPasswordExceptions = exports.ForgotPasswordExceptions = exports.ResendConfirmationCodeExceptions = exports.ConfirmSignupExceptions = exports.SignUpExceptions = void 0;
var SignUpExceptions;
(function (SignUpExceptions) {
    SignUpExceptions["USER_EXIST"] = "UsernameExistsException";
})(SignUpExceptions = exports.SignUpExceptions || (exports.SignUpExceptions = {}));
var ConfirmSignupExceptions;
(function (ConfirmSignupExceptions) {
    ConfirmSignupExceptions["INVALID_CODE"] = "CodeMismatchException";
    ConfirmSignupExceptions["CODE_EXPIRED"] = "ExpiredCodeException";
    ConfirmSignupExceptions["USER_NOT_FOUND"] = "UserNotFoundException";
})(ConfirmSignupExceptions = exports.ConfirmSignupExceptions || (exports.ConfirmSignupExceptions = {}));
var ResendConfirmationCodeExceptions;
(function (ResendConfirmationCodeExceptions) {
    ResendConfirmationCodeExceptions["USER_NOT_FOUND"] = "UserNotFoundException";
})(ResendConfirmationCodeExceptions = exports.ResendConfirmationCodeExceptions || (exports.ResendConfirmationCodeExceptions = {}));
var ForgotPasswordExceptions;
(function (ForgotPasswordExceptions) {
    ForgotPasswordExceptions["USER_NOT_FOUND"] = "UserNotFoundException";
})(ForgotPasswordExceptions = exports.ForgotPasswordExceptions || (exports.ForgotPasswordExceptions = {}));
var ConfirmForgotPasswordExceptions;
(function (ConfirmForgotPasswordExceptions) {
    ConfirmForgotPasswordExceptions["INVALID_CODE"] = "CodeMismatchException";
    ConfirmForgotPasswordExceptions["CODE_EXPIRED"] = "ExpiredCodeException";
    ConfirmForgotPasswordExceptions["USER_NOT_FOUND"] = "UserNotFoundException";
})(ConfirmForgotPasswordExceptions = exports.ConfirmForgotPasswordExceptions || (exports.ConfirmForgotPasswordExceptions = {}));
var ChangePasswordExceptions;
(function (ChangePasswordExceptions) {
    ChangePasswordExceptions["USER_NOT_FOUND"] = "UserNotFoundException";
    ChangePasswordExceptions["USER_NOT_CONFIRMED"] = "UserNotConfirmedException";
})(ChangePasswordExceptions = exports.ChangePasswordExceptions || (exports.ChangePasswordExceptions = {}));
var InitiateAuthExeptions;
(function (InitiateAuthExeptions) {
    InitiateAuthExeptions["USER_NOT_FOUND"] = "UserNotFoundException";
    InitiateAuthExeptions["USER_NOT_CONFIRMED"] = "UserNotConfirmedException";
    InitiateAuthExeptions["PASSWORD_RESET_REQUIRED"] = "PasswordResetRequiredException";
})(InitiateAuthExeptions = exports.InitiateAuthExeptions || (exports.InitiateAuthExeptions = {}));
