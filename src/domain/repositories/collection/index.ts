import CollectionModel from "../../../data/mongodb/model/collection";
import UserModel from "../../../data/mongodb/model/user";

import {
  CollectionProp,
  CollectionRequestModel,
  UpdateCollectionRequestModel,
} from "../../entities/collection";

import { CollectionRepository } from "../../interfaces/repositories/collection";
import { ProfileRepository } from "../../interfaces/repositories/profile";

class CollectionRepositoryImpl implements CollectionRepository {
  async getAllCollection(username: string): Promise<any> {
    const collections = await CollectionModel.findOne({ username }).select(
      "collection"
    );
    return collections;
  }
  async insertOneCollection(
    newCollection: UpdateCollectionRequestModel
  ): Promise<any> {
    const { username, collections } = newCollection;
    const result = await CollectionModel.findOneAndUpdate(
      { username },
      { $push: { collections: collections } },
      { new: true } // Return the updated document
    );

    return result;
  }
  async createOneCollection(collection: CollectionRequestModel): Promise<any> {
    const result = await new CollectionModel(collection).save();
    return result;
  }

  //   async getOneProfile(username: string): Promise<AccountResponseModel | null> {
  //     const result = await UserModel.findOne({ username }).lean();
  //     return result;
  //   }
  //   async getAllProfile(): Promise<AccountResponseModel[]> {
  //     const result = await UserModel.find({}).lean();
  //     return result;
  //   }
}
export default CollectionRepositoryImpl;
