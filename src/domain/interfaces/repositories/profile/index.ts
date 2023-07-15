import {
  CreateProfileRequestModel,
  ProfileResponseModel,
} from "../../../entities/profile";

export interface ProfileRepository {
  getOneProfile(username: string): Promise<ProfileResponseModel | null>;
  createOneProfile(
    profile: CreateProfileRequestModel
  ): Promise<ProfileResponseModel>;
  getAllProfile(): Promise<ProfileResponseModel[]>;
}
