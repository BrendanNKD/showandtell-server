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
        const result: OpenAI.Completions.Completion =
          await completionUseCase.executeChat(prompt);
        if (result) res.status(200).json(result.choices[0].text);
      } catch (err: any) {
        next(err);
      }
    }
  );

  router.post(
    "/check",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const result: OpenAI.Completions.Completion =
          await completionUseCase.executeCheckAnswer(req.body);

        if (result) res.status(200).json(result.choices[0].text);
      } catch (err: any) {
        next(err);
      }
    }
  );

  router.post(
    "/speech",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        console.log(req.body);
        const { text } = req.body;
        const result: any = await completionUseCase.executeTextToSpeech(text);

        if (result) res.status(200).json(result);
      } catch (err: any) {
        next(err);
      }
    }
  );

  return router;
}
