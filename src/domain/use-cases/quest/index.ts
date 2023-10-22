import { CompletionUseCase } from "../../interfaces/use-case/openAi";
import { replicate } from "../../../utils/replicate";

import config from "../../../config/config";
import OpenAI from "openai";
import { QuestUseCase } from "../../interfaces/use-case/quest";
import { QuestRepository } from "../../interfaces/repositories/quest";
import { readFile } from "fs/promises";
import { join, dirname } from "path";
import { createQuest } from "../../../utils/quests";

class QuestCaseImp implements QuestUseCase {
  questRepository: QuestRepository;

  constructor(questRepository: QuestRepository) {
    this.questRepository = questRepository;
  }

  async executeGetQuest(): Promise<any> {
    const result = await this.questRepository.getQuest();
    return result;
  }
  async executeCompleteQuest(questCompleted: any): Promise<any> {
    const { username, profileId, questIndex } = questCompleted;
    const identity = { id: { username, profileId }, questIndex: questIndex };
    const result = await this.questRepository.completeQuest(identity);
    return true;
  }
  async executeCreateProfileQuests(profile: any): Promise<any> {
    const newQuests = createQuest();
    const identity = { id: profile, newQuests: newQuests };
    const result = await this.questRepository.createProfileQuests(identity);
    return true;
  }
  async executeGetProfileQuest(profileId: any): Promise<any> {
    const result = await this.questRepository.getProfileQuest(profileId);
    return result;
  }
}

export default QuestCaseImp;
