import Quests from "../../../data/mongodb/model/quest";
import { QuestRepository } from "../../interfaces/repositories/quest";

class QuestRepositoryImpl implements QuestRepository {
  async getQuest(): Promise<any> {
    const quests = await Quests.find();

    return quests;
  }

  async createProfileQuests(identity: any): Promise<any> {
    const { id, newQuests, newProfile } = identity;
    if (newProfile) {
      const newProfileQuest = { profileId: id.profileId, quests: newQuests };
      await new Quests(newProfileQuest).save();
    } else {
      const newQuest = await Quests.updateOne(
        { profileId: id.profileId },
        { $set: { quests: newQuests } }
      )
        .then((result) => {
          console.log("Quests array replaced in the specified profile.");
        })
        .catch((err) => {
          console.error(err);
        });
    }
    return true;
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
    console.log(result);
    return result;
  }
}
export default QuestRepositoryImpl;
