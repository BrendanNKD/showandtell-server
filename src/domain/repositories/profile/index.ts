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
  async addOneProfile(newprofile: ProfileRequestModel): Promise<any> {
    const { username, profile } = newprofile;
    console.log(profile);
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
}

export default ProfileRepositoryImpl;
