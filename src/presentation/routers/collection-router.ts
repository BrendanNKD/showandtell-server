import express, { NextFunction, Request, Response } from "express";
import { GenerateUseCase } from "../../domain/interfaces/use-case/generate";
import { CollectionUseCase } from "../../domain/interfaces/use-case/collection";
import { authMiddleware } from "../middleware/auth/auth";

export default function CollectionRouter(collectionUseCase: CollectionUseCase) {
  const router = express.Router();

  router.post(
    "/update",
    authMiddleware,
    async (req: Request, res: Response, next: NextFunction) => {
      const { username } = req.userInfo;
      try {
        const { data } = req.body;

        const result = await collectionUseCase.executeSaveCollection({
          username: username,
          collections: data,
        });
        console.log(result);
        if (result)
          res.status(200).json({ message: "saved successful", result: result });
      } catch (err: any) {
        next(err);
      }
    }
  );

  return router;
}
