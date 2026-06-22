import mongoose, { Schema } from "mongoose";

const experienceSchema = new Schema(
  {
    company: { type: String, required: true },
    role: { type: String, required: true },
    duration: { type: String, required: true },
    description: { type: [String], default: [] },
    location: { type: String, required: true },
    isCurrent: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
    },
  }
);

export const ExperienceModel = mongoose.models.Experience || mongoose.model("Experience", experienceSchema);
export default ExperienceModel;
