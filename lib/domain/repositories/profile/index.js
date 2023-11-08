"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const levelRules_1 = __importDefault(require("../../../data/mongodb/model/levelRules"));
const user_1 = __importDefault(require("../../../data/mongodb/model/user"));
class ProfileRepositoryImpl {
    async createOneProfile(profile) {
        const result = await new user_1.default(profile).save();
        return result;
    }
    async getOneProfile(username) {
        const result = await user_1.default.findOne({ username }).lean();
        return result;
    }
    async getAllProfile() {
        const result = await user_1.default.find({}).lean();
        return result;
    }
    async addOneProfile(newprofile) {
        const { username, profile } = newprofile;
        const updatedDocument = await user_1.default.findOneAndUpdate({ username }, { $push: { profiles: profile } }, { new: true });
        return updatedDocument;
    }
    async updateOneProfile(newprofile) {
        const { index, profile, username } = newprofile;
        const updatedDocument = await user_1.default.findOneAndUpdate({ username }, {
            $set: {
                [`profiles.${index}`]: profile,
            },
        }, { new: true });
        return updatedDocument;
    }
    async getLevelRules() {
        const result = await levelRules_1.default.find({}).lean();
        return result;
    }
    async awardStars(data) {
        const result = await user_1.default.findOneAndUpdate({
            username: data.username,
            "profiles._id": data.profileId,
        }, {
            $inc: {
                "profiles.$.totalStars": Number(data.awardStars),
                "profiles.$.stars": Number(data.awardStars), // Increment stars by 2 (You can change the value)
            },
        }, {
            new: true, // To return the updated document
        });
        // Fetch the updated profiles object
        const updatedProfile = result?.profiles.find((profile) => profile._id.toString() === data.profileId);
        if (updatedProfile) {
            const { level, stars, totalStars } = updatedProfile;
            return { level, stars, totalStars, result };
        }
        else {
            console.log("Profile ID not found");
            // Handle case where profile ID is not found
        }
    }
    async levelup(data) {
        // Update the document and get the updated one
        const result = await user_1.default.findOneAndUpdate({
            username: data.username,
            "profiles._id": data.profileId,
        }, {
            $inc: {
                "profiles.$.level": 1, // Increment the level by 1
            },
            $set: {
                "profiles.$.stars": data.offset, // Set stars to the offset value
            },
        }, { new: true } // To return the updated document
        );
        return result;
    }
    async deleteOneProfile(username, profileId) {
        const result = await user_1.default.findOneAndUpdate({ username }, { $pull: { profiles: { _id: profileId } } }, { new: true });
        return result;
    }
}
exports.default = ProfileRepositoryImpl;
