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
    const result: any = await this.profileRepository.getOneProfile(username);
    // CHECK if any profile is missing quests
    // loop through the profiles and create quest array append to the one that dont have
    // if (result)
    //   for (let i = 0; i < result.profiles.length; i++) {
    //     const id = String(result.profiles[i]._id);
    //     const quests = await this.questRepository.getProfileQuest(id);
    //     if (quests.quests.length == 0) {
    //       const newQuests = await createQuest();
    //       const identity = {
    //         id: { profileId: id, username },
    //         newQuests: newQuests,
    //         newProfile: false,
    //       };
    //       const created = await this.questRepository.createProfileQuests(
    //         identity
    //       );
    //     }
    //   }

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
  async executeAwardStars(data: any): Promise<any> {
    const { awardStars, profileId, username } = data;
    let result = await this.profileRepository.awardStars(data);
    const level = await this.profileRepository.getLevelRules();
    const nextLimit = level[0].rules[Number(result.level) + 1];

    if (Number(result.stars) >= Number(nextLimit)) {
      const offset = Number(result.stars) - Number(nextLimit);

      result = await this.profileRepository.levelup({
        profileId,
        username,
        offset,
      });
      //add level
      //add reset currentstars

      return { result, leveled: true };
    }

    return { result: result.result, leveled: false };
  }
  async executeDeleteOneProfile(
    username: string,
    profileId: string
  ): Promise<any> {
    const result = await this.profileRepository.deleteOneProfile(
      username,
      profileId
    );
    return result;
  }
}

export default ProfileExecute;
