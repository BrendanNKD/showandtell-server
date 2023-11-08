"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const quests_1 = require("../../../utils/quests");
class ProfileExecute {
    constructor(profileRepository, questRepository) {
        this.profileRepository = profileRepository;
        this.questRepository = questRepository;
    }
    async executeCreateOneProfile(profile) {
        const result = await this.profileRepository.createOneProfile(profile);
        return result;
    }
    async executeGetOneProfile(username) {
        const result = await this.profileRepository.getOneProfile(username);
        // CHECK if any profile is missing quests
        // loop through the profiles and create quest array append to the one that dont have
        // if (result)
        //   for (let i = 0; i < result.profiles.length; i++) {
        //     const id = String(result.profiles[i]._id);
        //     const quests = await this.questRepository.getProfileQuest(id);
        //     if (quests.quests.length == 0) {
        //       const newQuests = await createQuest();
        //       const identity = {
        //         id: { profileId: id, username },
        //         newQuests: newQuests,
        //         newProfile: false,
        //       };
        //       const created = await this.questRepository.createProfileQuests(
        //         identity
        //       );
        //     }
        //   }
        return result;
    }
    async executeGetAllProfile() {
        const result = await this.profileRepository.getAllProfile();
        return result;
    }
    async executeAddOneProfile(profiledetails) {
        const { username } = profiledetails;
        const result = await this.profileRepository.addOneProfile(profiledetails);
        const newlyCreatedProfile = result?.profiles[result?.profiles.length - 1];
        const newQuests = await (0, quests_1.createQuest)();
        const identity = {
            id: { profileId: String(newlyCreatedProfile._id), username },
            newQuests: newQuests,
        };
        const created = await this.questRepository.createProfileQuests(identity);
        return result;
    }
    async executeUpateOneProfile(profile) {
        const result = await this.profileRepository.updateOneProfile(profile);
        return result;
    }
    async executeGetLevelRules() {
        const result = await this.profileRepository.getLevelRules();
        return result;
    }
    async executeAwardStars(data) {
        const { awardStars, profileId, username } = data;
        let result = await this.profileRepository.awardStars(data);
        const level = await this.profileRepository.getLevelRules();
        const nextLimit = level[0].rules[Number(result.level) + 1];
        if (Number(result.stars) >= Number(nextLimit)) {
            const offset = Number(result.stars) - Number(nextLimit);
            result = await this.profileRepository.levelup({
                profileId,
                username,
                offset,
            });
            //add level
            //add reset currentstars
            return { result, leveled: true };
        }
        return { result: result.result, leveled: false };
    }
    async executeDeleteOneProfile(username, profileId) {
        const result = await this.profileRepository.deleteOneProfile(username, profileId);
        return result;
    }
}
exports.default = ProfileExecute;
