import { Schema, model } from "mongoose";

export const profileSchema = new Schema({
  email: {
    type: String,
    // trim: true,
    // index: true,
    // unique: true,
    // sparse: true,
  },

  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
  },

  profilePic: {
    type: Number,
    required: true,
  },

  dateOfBirth: { type: String, required: true },
});
