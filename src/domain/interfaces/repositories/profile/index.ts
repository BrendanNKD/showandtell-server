import {
  AccountResponseModel,
  CreateProfileRequestModel,
  ProfileRequestModel,
  ProfileResponseModel,
  UpdateProfileRequestModel,
} from "../../../entities/profile";

export interface ProfileRepository {
  getOneProfile(username: string): Promise<AccountResponseModel | null>;
  createOneProfile(
    profile: CreateProfileRequestModel
  ): Promise<AccountResponseModel>;
  getAllProfile(): Promise<AccountResponseModel[]>;
  addOneProfile(profile: any): Promise<any>;
  updateOneProfile(profile: UpdateProfileRequestModel): Promise<any>;
  getLevelRules(): Promise<any>;
}
