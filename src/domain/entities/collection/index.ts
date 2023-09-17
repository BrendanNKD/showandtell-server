export interface CollectionProp {
  image: string;
  caption: string;
  profile: string;
  description: number;
  avatar: string;
}

export interface CollectionRequestModel {
  username: string;
  collection: CollectionProp[];
}

export interface UpdateCollectionRequestModel {
  username: string;
  collections: CollectionProp;
}
