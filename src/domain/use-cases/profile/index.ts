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
import { QuestRepository } from "../../interfaces/repositories/quest";
import { createQuest } from "../../../utils/quests";
class ProfileExecute implements ProfileUseCase {
  profileRepository: ProfileRepository;
  questRepository: QuestRepository;
  constructor(
    profileRepository: ProfileRepository,
    questRepository: QuestRepository
  ) {
    this.profileRepository = profileRepository;
    this.questRepository = questRepository;
  }

  async executeCreateOneProfile(
    profile: TUserRegistration
  ): Promise<AccountResponseModel> {
    const result: any = await this.profileRepository.createOneProfile(profile);

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

  async executeAddOneProfile(
    profiledetails: ProfileRequestModel
  ): Promise<any> {
    const { username } = profiledetails;
    const result = await this.profileRepository.addOneProfile(profiledetails);
    const newlyCreatedProfile = result?.profiles[result?.profiles.length - 1];
    const newQuests = await createQuest();
    const identity = {
      id: { profileId: String(newlyCreatedProfile._id), username },
      newQuests: newQuests,
      newProfile: true,
    };
    const created = await this.questRepository.createProfileQuests(identity);
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
