import { TUserRegistration } from "../../entities/auth";
import { ProfileRepository } from "../../interfaces/repositories/profile";
import { ProfileUseCase } from "../../interfaces/use-case/profile";
import {
  AccountResponseModel,
  ProfileResponseModel,
} from "../../entities/profile";

class ProfileExecute implements ProfileUseCase {
  profileRepository: ProfileRepository;
  constructor(profileRepository: ProfileRepository) {
    this.profileRepository = profileRepository;
  }

  async executeCreateOneProfile(
    profile: TUserRegistration
  ): Promise<AccountResponseModel> {
    const result = await this.profileRepository.createOneProfile(profile);
    return result;
  }

  async executeGetOneProfile(
    username: string
  ): Promise<AccountResponseModel | null> {
    const result = await this.profileRepository.getOneProfile(username);
    return result;
  }

  async executeGetAllProfile(): Promise<AccountResponseModel[]> {
    const result = await this.profileRepository.getAllProfile();
    return result;
  }
}

export default ProfileExecute;
