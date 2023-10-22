import { Schema, model } from "mongoose";

export const levelRulesSchema = new Schema({
  rules: {
    type: Array,
    required: true,
  },
});

const levelRules = model("level_rules", levelRulesSchema);
export default levelRules;
