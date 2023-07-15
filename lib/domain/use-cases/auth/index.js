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
Object.defineProperty(exports, "__esModule", { value: true });
const cognito_commands_1 = require("../../../utils/aws/cognito/cognito-commands");
class AuthUserUseCaseImp {
    constructor(profileRepository) {
        this.profileRepository = profileRepository;
    }
    executeCreateUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, email, firstName, lastName, dateOfBirth } = user;
            // will throw error if user exist
            yield (0, cognito_commands_1.signUp)(user);
            // create profile
            const createdProfile = yield this.profileRepository.createOneProfile({
                email,
                firstName,
                lastName,
                dateOfBirth,
                username,
            });
            if (createdProfile)
                return true;
            return false;
        });
    }
    executeConfirmSignup(username, otp) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, cognito_commands_1.confirmSignUp)(username, otp);
            return true;
        });
    }
    executeResendConfirmationCode(username) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, cognito_commands_1.resendConfirmationCode)(username);
            return true;
        });
    }
    executeResetPassword(username) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, cognito_commands_1.resetPassword)(username);
            return true;
        });
    }
    executeConfirmResetPassword(username, password, confirmationCode) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, cognito_commands_1.confirmResetPassword)(username, password, confirmationCode);
            return true;
        });
    }
    executeChangePassword(accessToken, previousPassword, proposedPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, cognito_commands_1.changePassword)(accessToken, previousPassword, proposedPassword);
            return true;
        });
    }
    executeLogin(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const loginResult = yield (0, cognito_commands_1.login)(username, password);
            return loginResult;
        });
    }
}
exports.default = AuthUserUseCaseImp;
