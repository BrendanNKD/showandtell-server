export interface QuestUseCase {
  executeGetQuest(): Promise<any | null>;
  executeCreateProfileQuests(newQuests: any): Promise<any>;
  executeCompleteQuest(questCompleted: any): Promise<any>;
  executeGetProfileQuest(profileId: any): Promise<any>;

}
