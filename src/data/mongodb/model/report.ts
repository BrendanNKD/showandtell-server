import { Schema, model } from "mongoose";
import { profileSchema } from "./profiles";

const reportSchema = new Schema(
  {
    image: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
      required: true,
    },
    description: { type: String, required: true },
    issue: { type: Array, required: true },
    otherIssues: { type: String, required: false },
  },
  { timestamps: true }
);

const ReportModel = model("reports", reportSchema);

export default ReportModel;
