import UserModel from "../../../data/mongodb/model/user";
import {
  AccountResponseModel,
  CreateProfileRequestModel,
  ProfileResponseModel,
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
}
export default ProfileRepositoryImpl;
