import { CompletionUseCase } from "../../interfaces/use-case/openAi";
import { replicate } from "../../../utils/replicate";
import config from "../../../config/config";
import OpenAI from "openai";
import { openai } from "../../../utils/openAi";

class CompletionCaseImp implements CompletionUseCase {
  async executeChat(data: string): Promise<OpenAI.Completions.Completion> {
    //one-shot prompting
    const conditioning =
      " to a young kid in an informative and fun way, using exclamations, don't use any complex words and keep it short";

    const prompt =
      "Explain the caption word " + '"' + data + '" ' + conditioning;

    const response = await openai.completions.create({
      model: "gpt-3.5-turbo-instruct",
      prompt: prompt,
      temperature: 0.4,
      max_tokens: 250,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0.3,
    });
    return response;
  }
  async executeCheckAnswer(data: any): Promise<OpenAI.Completions.Completion> {
    console.log(data);
    //one-shot prompting
    const prompt =
      "does this word " +
      data.caption +
      " exist in the caption sentence " +
      data.sentence +
      ". reply in only true or false";

    const response = await openai.completions.create({
      model: "gpt-3.5-turbo-instruct",
      prompt: prompt,
      temperature: 0.4,
      max_tokens: 250,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0.3,
    });
    return response;
  }
}

export default CompletionCaseImp;
