export interface GenerateUseCase {
  executeGenerateCaption(image: string): Promise<any>;
  executeGenerateImage(text: string): Promise<any>;
}
