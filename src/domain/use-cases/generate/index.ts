import { GenerateUseCase } from "../../interfaces/use-case/generate";
import { replicate } from "../../../utils/replicate";

class GenerateUseCaseImp implements GenerateUseCase {
  async executeGenerateCaption(image: string): Promise<any> {
    const output = await replicate.run(
      "salesforce/blip:2e1dddc8621f72155f24cf2e0adbde548458d3cab9f00c0139eea840d0ac4746",
      {
        input: {
          image: image,
        },
      }
    );
    return output;
  }

  async executeGenerateImage(text: string): Promise<any> {
    const output = await replicate.run(
      "stability-ai/sdxl:8beff3369e81422112d93b89ca01426147de542cd4684c244b673b105188fe5f",
      {
        input: {
          prompt: text,
          num_outputs: 3,
        },
      }
    );
    return output;
  }
}

export default GenerateUseCaseImp;
