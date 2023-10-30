import express, { Request, Response } from "express";
import { QuestUseCase } from "../../domain/interfaces/use-case/quest";
import { authMiddleware } from "../middleware/auth/auth";

export default function QuestRouter(questUseCase: QuestUseCase) {
  const router = express.Router();

  router.get("/", async (req: Request, res: Response) => {
    try {
      const result = await questUseCase.executeGetQuest();
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ message: "Error getting quests" });
    }
  });

  router.get(
    "/profileQuest/:profileId",
    async (req: Request, res: Response) => {
      try {
        const profileId = req.params.profileId;
        console.log(profileId);
        const result = await questUseCase.executeGetProfileQuest(profileId);
        res.status(200).json(result);
      } catch (err) {
        res.status(500).json({ message: "Error getting quests" });
      }
    }
  );

  router.post(
    "/createQuest",
    authMiddleware,
    async (req: Request, res: Response) => {
      try {
        const { username } = req.userInfo;
        const { profileId } = req.body;

        const result = await questUseCase.executeCreateProfileQuests({
          username,
          profileId,
        });

        res.status(200).json(true);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error creating quests" });
      }
    }
  );

  router.post(
    "/completeQuest",
    authMiddleware,
    async (req: Request, res: Response) => {
      try {
        const { username } = req.userInfo;
        const { questIndex, profileId } = req.body;

        const result = await questUseCase.executeCompleteQuest({
          username,
          profileId,
          questIndex,
        });

        res.status(200).json(true);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error creating quests" });
      }
    }
  );

 

  return router;
}
