import {
  CollectionProp,
  UpdateCollectionRequestModel,
} from "../../../entities/collection";

export interface CollectionUseCase {
  executeSaveCollection(data: UpdateCollectionRequestModel): Promise<any>;
  executeGetCollection(username: string): Promise<any>;
  executeDeleteOneCollection(username: any, data: any): Promise<any>;
}
