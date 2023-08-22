import {
  AccountResponseModel,
  CreateProfileRequestModel,
  ProfileResponseModel,
} from "../../../entities/profile";

export interface ProfileRepository {
  getOneProfile(username: string): Promise<AccountResponseModel | null>;
  createOneProfile(
    profile: CreateProfileRequestModel
  ): Promise<AccountResponseModel>;
  getAllProfile(): Promise<AccountResponseModel[]>;
}
