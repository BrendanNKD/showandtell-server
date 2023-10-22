import { Schema, model } from "mongoose";

export const questSchema = new Schema({
  profileId: { type: String, required: true },
  quests: {
    type: Array,
    required: true,
  },
});

const Quests = model("quests", questSchema);
export default Quests;
