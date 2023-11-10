import { CompletionUseCase } from "../../interfaces/use-case/openAi";
import { replicate } from "../../../utils/replicate";
import config from "../../../config/config";
import OpenAI from "openai";
import { openai } from "../../../utils/openAi";

class CompletionCaseImp implements CompletionUseCase {
  async executeChat(data: string): Promise<OpenAI.Completions.Completion> {
    //one-shot prompting
    const conditioning =
      " to a young child of age 3 to 5 years old in an informative, fun and cheery tone, using exclamations, use simple easy to understand language, maximum 30 words. Start the sentence with 'Your picture shows'";

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
    //one-shot prompting
    const prompt =
      "does this word " +
      data.caption +
      " exist in the caption " +
      '"This is a' +
      data.sentence +
      '.". Reply in only True or False make the comparison not case sensitive';

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
