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

  router.put("/", async (req: Request, res: Response) => {
    try {
      const profile = await profileUseCase.executeGetAllProfile();

      res.status(200).json(profile);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error getting profile" });
    }
  });

  return router;
}
