"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cognito_commands_1 = require("../../../utils/aws/cognito/cognito-commands");
class AuthUserUseCaseImp {
    constructor(profileRepository) {
        this.profileRepository = profileRepository;
    }
    async executeCreateUser(user) {
        const { username, email, firstName, lastName, dateOfBirth } = user;
        // will throw error if user exist
        await (0, cognito_commands_1.signUp)(user);
        // create profile
        const createdProfile = await this.profileRepository.createOneProfile({
            email,
            firstName,
            lastName,
            dateOfBirth,
            username,
        });
        if (createdProfile)
            return true;
        return false;
    }
    async executeConfirmSignup(username, otp) {
        await (0, cognito_commands_1.confirmSignUp)(username, otp);
        return true;
    }
    async executeResendConfirmationCode(username) {
        await (0, cognito_commands_1.resendConfirmationCode)(username);
        return true;
    }
    async executeResetPassword(username) {
        await (0, cognito_commands_1.resetPassword)(username);
        return true;
    }
    async executeConfirmResetPassword(username, password, confirmationCode) {
        await (0, cognito_commands_1.confirmResetPassword)(username, password, confirmationCode);
        return true;
    }
    async executeChangePassword(accessToken, previousPassword, proposedPassword) {
        await (0, cognito_commands_1.changePassword)(accessToken, previousPassword, proposedPassword);
        return true;
    }
    async executeLogin(username, password) {
        const loginResult = await (0, cognito_commands_1.login)(username, password);
        return loginResult;
    }
}
exports.default = AuthUserUseCaseImp;
