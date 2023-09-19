import { GenerateUseCase } from "../../interfaces/use-case/generate";
import { replicate } from "../../../utils/replicate";
import {
  CollectionProp,
  UpdateCollectionRequestModel,
} from "../../entities/collection";
import { CollectionUseCase } from "../../interfaces/use-case/collection";
import { CollectionRepository } from "../../interfaces/repositories/collection";
import cloudinary from "../../../utils/cloudinary/cld-connect";

class CollectionUseCaseImp implements CollectionUseCase {
  collectionRepository: CollectionRepository;

  constructor(collectionRepository: CollectionRepository) {
    this.collectionRepository = collectionRepository;
  }

  async executeSaveCollection(
    data: UpdateCollectionRequestModel
  ): Promise<any> {
    //logic
    //convert base64 to img and send to cloudinary
    // Upload an image to Cloudinary

    try {
      console.log(data);
      // Upload an image to Cloudinary
      // const result = await cloudinary.uploader.upload(data.collections.image, {
      //   folder: "showandtell",
      //   resource_type: "image",
      // });

      // data.collections.image = String(result.url);

      const createCollection =
        await this.collectionRepository.insertOneCollection({
          username: data.username,
          collections: data.collections,
        });

      return createCollection.collections; // Return the value here
    } catch (error) {
      // Handle errors appropriately
      console.error(error);
      throw error;
    }
  }

  async executeGetCollection(username: string): Promise<any> {
    const result = await this.collectionRepository.getAllCollection(username);
    return result;
  }
}

export default CollectionUseCaseImp;
