import { TUserRegistration } from "../../../entities/auth";
import {
  AccountResponseModel,
  ProfileResponseModel,
} from "../../../entities/profile";

export interface ProfileUseCase {
  executeCreateOneProfile(
    profile: TUserRegistration
  ): Promise<AccountResponseModel | null>;
  executeGetOneProfile(username: string): Promise<AccountResponseModel | null>;
  executeGetAllProfile(): Promise<AccountResponseModel[]>;
}
