import { TUserRegistration } from "../../entities/auth";
import { ProfileRepository } from "../../interfaces/repositories/profile";
import { ProfileUseCase } from "../../interfaces/use-case/profile";
import {
  AccountResponseModel,
  ProfileRequestModel,
  ProfileResponseModel,
  UpdateProfileRequestModel,
} from "../../entities/profile";
import { readFile } from "fs/promises";
import { join, dirname } from "path";
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

  async executeAddOneProfile(profile: ProfileRequestModel): Promise<any> {
    const result = await this.profileRepository.addOneProfile(profile);
    return result;
  }

  async executeUpateOneProfile(
    profile: UpdateProfileRequestModel
  ): Promise<any> {
    const result = await this.profileRepository.updateOneProfile(profile);
    return result;
  }

  async executeGetLevelRules(): Promise<any> {
    const result = await this.profileRepository.getLevelRules();
    return result;
  }

}

export default ProfileExecute;
