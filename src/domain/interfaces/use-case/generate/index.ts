export interface GenerateUseCase {
  executeGenerateCaption(image: string): Promise<any>;
  executeGenerateImage(text: string): Promise<any>;
  executeCreateOneReport(report: any): Promise<any>;
}
