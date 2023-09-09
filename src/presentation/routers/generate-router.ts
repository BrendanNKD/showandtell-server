import express, { NextFunction, Request, Response } from "express";
import { GenerateUseCase } from "../../domain/interfaces/use-case/generate";

export default function GenerateRouter(generateUseCase: GenerateUseCase) {
  const router = express.Router();

  router.post(
    "/gencaption",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { image } = req.body;
        const result = await generateUseCase.executeGenerateCaption(image);

        if (result)
          res
            .status(200)
            .json({ message: "caption successfull", result: result });
      } catch (err: any) {
        next(err);
      }
    }
  );
  return router;
}
