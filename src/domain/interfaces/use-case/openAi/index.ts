import OpenAI from "openai";

export interface CompletionUseCase {
  executeChat(data: string): Promise<OpenAI.Completions.Completion>;
}
