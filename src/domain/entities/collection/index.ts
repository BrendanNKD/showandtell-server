export interface CollectionProp {
  image: string;
  caption: string;
  profile: string;
  profileIndex: number;
  description: string;
  avatar: number;
}

export interface CollectionRequestModel {
  username: string;
  collection: CollectionProp[];
}

export interface UpdateCollectionRequestModel {
  username: string;
  collections: CollectionProp;
}
