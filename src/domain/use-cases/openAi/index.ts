import { CompletionUseCase } from "../../interfaces/use-case/openAi";
import { replicate } from "../../../utils/replicate";

import config from "../../../config/config";
import OpenAI from "openai";

class CompletionCaseImp implements CompletionUseCase {
  async executeChat(data: string): Promise<OpenAI.Completions.Completion> {
    const openai = new OpenAI({
      apiKey: config.openai.apiKey, // This is also the default, can be omitted
    });

    //one-shot prompting
    const conditioning =
      " to a young kid in an informative and fun way, using exclamations, don't use any complex words";

    const prompt = "Explain an object" + data + conditioning;

    const response = await openai.completions.create({
      model: "text-davinci-001",
      prompt: prompt,
      temperature: 0.4,
      max_tokens: 250,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty:  0.3,
    });
    return response;
  }
}

export default CompletionCaseImp;
