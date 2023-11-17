import OpenAI from "openai";

export interface CompletionUseCase {
  executeChat(data: string): Promise<OpenAI.Completions.Completion>;
  executeCheckAnswer(data: any): Promise<OpenAI.Completions.Completion>;
  executeTextToSpeech(data: any): Promise<any>;
}
