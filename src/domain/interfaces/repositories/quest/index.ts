export interface QuestRepository {
  getQuest(): Promise<any | null>;
  createProfileQuests(quest: any): Promise<any>;
  completeQuest(completedQuest: any): Promise<any>;
  getProfileQuest(profileId: any): Promise<any>;
}
