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
      const data = req.body;

      try {
        const result = await collectionUseCase.executeSaveCollection({
          username: username,
          collections: data,
        });

        if (result) res.status(200).json(result);
      } catch (err: any) {
        next(err);
      }
    }
  );

  router.get(
    "/",
    authMiddleware,
    async (req: Request, res: Response, next: NextFunction) => {
      const { username } = req.userInfo;
      try {
        const result = await collectionUseCase.executeGetCollection(username);

        if (result) res.status(200).json(result.collections);
      } catch (err: any) {
        next(err);
      }
    }
  );
  return router;
}
