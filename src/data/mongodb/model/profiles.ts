import { Schema, model } from "mongoose";

export const profileSchema = new Schema({
  email: {
    type: String,
    unique: true,
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
