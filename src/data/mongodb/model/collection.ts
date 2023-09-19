import { Schema, model } from "mongoose";

const collections = new Schema({
  image: { type: String, required: true },
  caption: { type: String, required: true },
  profile: { type: String, required: true },
  profileIndex: { type: Number, required: true },
  description: { type: String, required: true },
  avatar: { type: String, required: true },
});

export const collectionSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },

  collections: [collections],
});

const CollectionModel = model("Collection", collectionSchema);
export default CollectionModel;
