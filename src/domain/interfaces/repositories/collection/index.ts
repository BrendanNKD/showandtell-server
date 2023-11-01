import {
  CollectionProp,
  CollectionRequestModel,
  UpdateCollectionRequestModel,
} from "../../../entities/collection";

export interface CollectionRepository {
  createOneCollection(collection: CollectionRequestModel): Promise<any>;
  getAllCollection(username: string): Promise<any>;
  insertOneCollection(collection: UpdateCollectionRequestModel): Promise<any>;
  deleteOneCollection(username: any, data: any): Promise<any>;
}
