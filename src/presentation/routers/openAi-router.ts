import express, { NextFunction, Request, Response } from "express";
import { CompletionUseCase } from "../../domain/interfaces/use-case/openAi";
import OpenAI from "openai";

export default function OpenAiRouter(completionUseCase: CompletionUseCase) {
  const router = express.Router();

  router.post(
    "/completions",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { prompt } = req.body;
        console.log(prompt);
        const result: OpenAI.Completions.Completion =
          await completionUseCase.executeChat(prompt);

        if (result) res.status(200).json(result.choices[0].text);
      } catch (err: any) {
        next(err);
      }
    }
  );
  return router;
}
