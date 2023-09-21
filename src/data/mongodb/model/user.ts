import { Schema, model } from "mongoose";
import { profileSchema } from "./profiles";

const accountSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },

    profiles: [profileSchema],
  },
  { timestamps: true }
);

const UserModel = model("User", accountSchema);

export default UserModel;
