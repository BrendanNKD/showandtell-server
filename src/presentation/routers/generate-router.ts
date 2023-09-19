import express, { NextFunction, Request, Response } from "express";
import { GenerateUseCase } from "../../domain/interfaces/use-case/generate";

export default function GenerateRouter(generateUseCase: GenerateUseCase) {
  const router = express.Router();

  router.post(
    "/gencaption",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        console.log("test");
        const { image } = req.body;
        const result = await generateUseCase.executeGenerateCaption(image);

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

  return router;
}
