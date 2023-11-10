import express, { NextFunction, Request, Response } from "express";
import { GenerateUseCase } from "../../domain/interfaces/use-case/generate";
import { authMiddleware } from "../middleware/auth/auth";

export default function GenerateRouter(generateUseCase: GenerateUseCase) {
  const router = express.Router();

  router.post(
    "/gencaption",
    authMiddleware,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const result = await generateUseCase.executeGenerateCaption(req.body);

        if (result)
          res
            .status(200)
            .json({ message: "caption successful", result: result });
      } catch (err: any) {
        next(err);
      }
    }
  );

  router.post(
    "/genimage",
    authMiddleware,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { prompt } = req.body;
        console.log(prompt);
        const result = await generateUseCase.executeGenerateImage(prompt);
        console.log(result);
        if (result) res.status(200).json(result);
      } catch (err: any) {
        next(err);
      }
    }
  );

  router.post(
    "/report",
    authMiddleware,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        console.log(req.body);
        const result = await generateUseCase.executeCreateOneReport(req.body);

        if (result) res.status(200).json(true);
      } catch (err: any) {
        next(err);
      }
    }
  );

  return router;
}
