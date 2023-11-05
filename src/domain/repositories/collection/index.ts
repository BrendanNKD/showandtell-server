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
      "collections"
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
  async deleteOneCollection(username: any, data: any): Promise<any> {
    const result = await CollectionModel.findOneAndUpdate(
      { username },
      { $pull: { collections: { _id: data.profileId } } },
      { new: true } // Return the updated document
    );
    return result;
  }
}
export default CollectionRepositoryImpl;
