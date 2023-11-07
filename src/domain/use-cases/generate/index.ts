import { GenerateUseCase } from "../../interfaces/use-case/generate";
import { replicate } from "../../../utils/replicate";

class GenerateUseCaseImp implements GenerateUseCase {
  async executeGenerateCaption(data: any): Promise<any> {
    const { image, category } = data;
    try {
      const output = await replicate.run(
        "dummybanana/clip_gpt2_refresh:90557f4748025f91c4ac8fb35aeeb2c372e78a73c8d4829981a19f6cc345bbc7",
        {
          input: {
            image: image,
            model: category,
          },
        }
      );
      return output;
    } catch (err: any) {
      console.log(err);
    }
    return false;
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
