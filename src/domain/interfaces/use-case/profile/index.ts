import { TUserRegistration } from "../../../entities/auth";
import { ProfileResponseModel } from "../../../entities/profile";

export interface ProfileUseCase {
  executeCreateOneProfile(
    profile: TUserRegistration
  ): Promise<ProfileResponseModel | null>;
  executeGetOneProfile(username: string): Promise<ProfileResponseModel | null>;
  executeGetAllProfile(): Promise<ProfileResponseModel[]>;
}
