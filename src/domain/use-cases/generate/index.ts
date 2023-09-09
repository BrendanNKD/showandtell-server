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
}

export default GenerateUseCaseImp;
