import Quests from "../../../data/mongodb/model/quest";
import { QuestRepository } from "../../interfaces/repositories/quest";

class QuestRepositoryImpl implements QuestRepository {
  async getQuest(): Promise<any> {
    const quests = await Quests.find();

    return quests;
  }

  async refreshProfileQuests(profileId: string, newQuest: any): Promise<any> {
    console.log(profileId);
    const result = await Quests.updateOne(
      { profileId: profileId },
      { $set: { quests: newQuest } }
    );
    if (result) return true;
    return false;
  }

  async createProfileQuests(identity: any): Promise<any> {
    const { id, newQuests } = identity;
    // if (newProfile) {
    const newProfileQuest = { profileId: id.profileId, quests: newQuests };
    const result = await new Quests(newProfileQuest).save();

    if (result) return true;
    return false;
  }

  async completeQuest(completedQuest: any): Promise<any> {
    const { id, questIndex } = completedQuest;

    const update = {};

    update[`quests.${questIndex}.completed`] = true;

    const result = await Quests.updateOne(
      { profileId: id.profileId },
      {
        $set: update,
      }
    )
      .then((result) => {
        console.log("Quest's 'completed' field updated.");
      })
      .catch((err) => {
        console.error(err);
      });
    return true;
  }

  async getProfileQuest(profileId: any): Promise<any> {
    const result = await Quests.findOne({ profileId }).lean();
    return result;
  }
}
export default QuestRepositoryImpl;
