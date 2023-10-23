import OpenAI from "openai";
import config from "../../config/config";

export const openai = new OpenAI({
  apiKey: config.openai.apiKey, // This is also the default, can be omitted
});
