import { GenerateUseCase } from "../../interfaces/use-case/generate";
import { replicate } from "../../../utils/replicate";
import { GenerateRepository } from "../../interfaces/repositories/generate";
import cloudinary from "../../../utils/cloudinary/cld-connect";

class GenerateUseCaseImp implements GenerateUseCase {
  generateRepository: GenerateRepository;
  constructor(generateRepository: GenerateRepository) {
    this.generateRepository = generateRepository;
  }
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
  async executeCreateOneReport(report: any): Promise<any> {
    //Upload an image to Cloudinary

    const image = await cloudinary.uploader.upload(report.image, {
      folder: "reports",
      resource_type: "image",
    });
    report.image = String(image.url);
    console.log(report);
    const result = await this.generateRepository.createOneReport(report);
    return result;
  }
}

export default GenerateUseCaseImp;
