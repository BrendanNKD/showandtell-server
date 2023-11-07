import levelRules from "../../../data/mongodb/model/levelRules";
import UserModel from "../../../data/mongodb/model/user";
import {
  AccountResponseModel,
  CreateProfileRequestModel,
  ProfileRequestModel,
  ProfileResponseModel,
  UpdateProfileRequestModel,
} from "../../entities/profile";
import { ProfileRepository } from "../../interfaces/repositories/profile";

class ProfileRepositoryImpl implements ProfileRepository {
  async createOneProfile(
    profile: CreateProfileRequestModel
  ): Promise<AccountResponseModel> {
    const result = await new UserModel(profile).save();

    return result;
  }

  async getOneProfile(username: string): Promise<AccountResponseModel | null> {
    const result = await UserModel.findOne({ username }).lean();
    return result;
  }
  async getAllProfile(): Promise<AccountResponseModel[]> {
    const result = await UserModel.find({}).lean();
    return result;
  }
  async addOneProfile(newprofile: any): Promise<any> {
    const { username, profile } = newprofile;

    const updatedDocument = await UserModel.findOneAndUpdate(
      { username },
      { $push: { profiles: profile } },
      { new: true }
    );

    return updatedDocument;
  }

  async updateOneProfile(newprofile: UpdateProfileRequestModel): Promise<any> {
    const { index, profile, username } = newprofile;
    const updatedDocument = await UserModel.findOneAndUpdate(
      { username },
      {
        $set: {
          [`profiles.${index}`]: profile,
        },
      },
      { new: true }
    );
    return updatedDocument;
  }
  async getLevelRules(): Promise<any> {
    const result = await levelRules.find({}).lean();
    return result;
  }
  async awardStars(data: any): Promise<any> {
    const result = await UserModel.findOneAndUpdate(
      {
        username: data.username,
        "profiles._id": data.profileId,
      },
      {
        $inc: {
          "profiles.$.totalStars": Number(data.awardStars), // Increment totalStars by 5 (You can change the value)
          "profiles.$.stars": Number(data.awardStars), // Increment stars by 2 (You can change the value)
        },
      },
      {
        new: true, // To return the updated document
      }
    );
    // Fetch the updated profiles object
    const updatedProfile = result?.profiles.find(
      (profile: any) => profile._id.toString() === data.profileId
    );

    if (updatedProfile) {
      const { level, stars, totalStars } = updatedProfile;
      return { level, stars, totalStars, result };
    } else {
      console.log("Profile ID not found");
      // Handle case where profile ID is not found
    }
  }

  async levelup(data: any): Promise<any> {
    // Update the document and get the updated one
    const result = await UserModel.findOneAndUpdate(
      {
        username: data.username,
        "profiles._id": data.profileId,
      },
      {
        $inc: {
          "profiles.$.level": 1, // Increment the level by 1
        },
        $set: {
          "profiles.$.stars": data.offset, // Set stars to the offset value
        },
      },
      { new: true } // To return the updated document
    );

    return result;
  }
  async deleteOneProfile(username: string, profileId: string): Promise<any> {
    const result = await UserModel.findOneAndUpdate(
      { username },
      { $pull: { profiles: { _id: profileId } } },
      { new: true }
    );
    return result;
  }
}

export default ProfileRepositoryImpl;
