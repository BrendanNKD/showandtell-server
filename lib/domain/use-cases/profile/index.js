"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProfileExecute {
    constructor(profileRepository) {
        this.profileRepository = profileRepository;
    }
    async executeCreateOneProfile(profile) {
        const result = await this.profileRepository.createOneProfile(profile);
        return result;
    }
    async executeGetOneProfile(username) {
        const result = await this.profileRepository.getOneProfile(username);
        return result;
    }
    async executeGetAllProfile() {
        const result = await this.profileRepository.getAllProfile();
        return result;
    }
}
exports.default = ProfileExecute;
