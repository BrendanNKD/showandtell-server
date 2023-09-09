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
      " for kids to learn about what is inside the image. example the image has a tiger. the object in the image is a [object] from.... and this is usually used on ...... OR the object in the image is a shape of a .... usually can be found in .... OR the object in the image is a animal ..... [animal] is a .... and found in .... and has ......";

    const prompt = "write about the image caption" + data + conditioning;

    const response = await openai.completions.create({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 1,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    return response;
  }
}

export default CompletionCaseImp;
