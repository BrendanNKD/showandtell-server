import {
  CollectionProp,
  CollectionRequestModel,
  UpdateCollectionRequestModel,
} from "../../../entities/collection";

export interface GenerateRepository {
  createOneReport(report: any): Promise<any>;
}
