import { Schema, model } from "mongoose";

export const profileSchema = new Schema({
  email: {
    type: String,
    required: true,
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

  dateOfBirth: { type: String, required: true },
});
