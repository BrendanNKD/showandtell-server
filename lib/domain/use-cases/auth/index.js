"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cognito_commands_1 = require("../../../utils/aws/cognito/cognito-commands");
const quests_1 = require("../../../utils/quests");
class AuthUserUseCaseImp {
    constructor(profileRepository, collectionRepository, questRepository) {
        this.profileRepository = profileRepository;
        this.collectionRepository = collectionRepository;
        this.questRepository = questRepository;
    }
    async executeCreateUser(user) {
        const { username, profiles, email } = user;
        // will throw error if user exist
        await (0, cognito_commands_1.signUp)(user);
        // create profile
        const createdProfile = await this.profileRepository.createOneProfile({
            profiles,
            email,
            username,
        });
        const createCollection = await this.collectionRepository.createOneCollection({
            username: username,
            collection: [],
        });
        const newQuests = await (0, quests_1.createQuest)();
        const identity = {
            id: {
                username: username,
                profileId: String(createdProfile.profiles[0]._id),
            },
            newQuests: newQuests,
        };
        const createdQuest = await this.questRepository.createProfileQuests(identity);
        console.log("created quest HERE");
        console.log(createdQuest);
        if (createdProfile && createCollection && createdQuest)
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
