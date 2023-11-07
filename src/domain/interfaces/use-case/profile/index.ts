import { TUserRegistration } from "../../../entities/auth";
import {
  AccountResponseModel,
  ProfileRequestModel,
  ProfileResponseModel,
  UpdateProfileRequestModel,
} from "../../../entities/profile";

export interface ProfileUseCase {
  executeCreateOneProfile(
    profile: TUserRegistration
  ): Promise<AccountResponseModel | null>;
  executeGetOneProfile(username: string): Promise<AccountResponseModel | null>;
  executeGetAllProfile(): Promise<AccountResponseModel[]>;
  executeAddOneProfile(profile: ProfileRequestModel): Promise<any>;
  executeUpateOneProfile(profile: UpdateProfileRequestModel): Promise<any>;
  executeGetLevelRules(): Promise<any>;
  executeAwardStars(data: any): Promise<any>;
  executeDeleteOneProfile(username: string, profileId: string): Promise<any>;
}
