import { authMiddleware } from "../middleware/auth/auth";
import { ProfileUseCase } from "../../domain/interfaces/use-case/profile";
import express, { Request, Response } from "express";

export default function ProfileRouter(profileUseCase: ProfileUseCase) {
  const router = express.Router();

  // public
  router.get(
    "/current",
    authMiddleware,
    async (req: Request, res: Response) => {
      try {
        const { username } = req.userInfo;
        console.log(username);
        const profile = await profileUseCase.executeGetOneProfile(username);

        if (profile == null) {
          res.status(404).json({ message: "No profiles found" });
        }

        res.status(200).json(profile);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error getting profile" });
      }
    }
  );

  router.get("/getall", async (req: Request, res: Response) => {
    try {
      const profile = await profileUseCase.executeGetAllProfile();

      res.status(200).json(profile);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error getting profile" });
    }
  });

  // router.put("/", async (req: Request, res: Response) => {
  //   try {
  //     const profile = await profileUseCase.executeGetAllProfile();

  //     res.status(200).json(profile);
  //   } catch (err) {
  //     console.error(err);
  //     res.status(500).json({ message: "Error getting profile" });
  //   }
  // });

  router.post("/add", authMiddleware, async (req: Request, res: Response) => {
    try {
      const { username } = req.userInfo;
      console.log(req.body);
      const account = await profileUseCase.executeAddOneProfile({
        username: username,
        profile: req.body,
      });

      res.status(200).json(account);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error getting profile" });
    }
  });

  router.post(
    "/update",
    authMiddleware,
    async (req: Request, res: Response) => {
      try {
        const { username } = req.userInfo;
        const { index, profile } = req.body;

        const account = await profileUseCase.executeUpateOneProfile({
          username,
          index,
          profile,
        });
        console.log(account);
        res.status(200).json(account);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error getting profile" });
      }
    }
  );

  router.get("/levelrules", async (req: Request, res: Response) => {
    try {
      const rules = await profileUseCase.executeGetLevelRules();

      res.status(200).json(rules);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error getting rules" });
    }
  });

  router.post(
    "/awardStars",
    authMiddleware,
    async (req: Request, res: Response) => {
      try {
        const { username } = req.userInfo;
        const { awardStars, profileId } = req.body;

        console.log(req.body);
        const result = await profileUseCase.executeAwardStars({
          awardStars,
          profileId,
          username,
        });

        res.status(200).json(result);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error creating quests" });
      }
    }
  );

  router.post(
    "/deleteOne",
    authMiddleware,
    async (req: Request, res: Response) => {
      try {
        const { username } = req.userInfo;
        const { profileId } = req.body;
        const result = await profileUseCase.executeDeleteOneProfile(
          username,
          profileId
        );

        res.status(200).json(result);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error creating quests" });
      }
    }
  );

  return router;
}
