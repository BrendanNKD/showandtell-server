import { GenerateUseCase } from "../../interfaces/use-case/generate";
import { replicate } from "../../../utils/replicate";

class GenerateUseCaseImp implements GenerateUseCase {
  async executeGenerateCaption(data: any): Promise<any> {
    const { image, category } = data;
    const output = await replicate.run(
      "dummybanana/clip_gpt2:c1eb5c955f92dfdc78aa138a46a4cb544dc321ead2f4aaa4fce06dcf59f24174",
      {
        input: {
          image: image,
          model: category,
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
