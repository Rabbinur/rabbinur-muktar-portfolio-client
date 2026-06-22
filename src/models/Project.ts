import mongoose, { Schema } from "mongoose";

const projectSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    thumbnail: { type: String, default: "" },
    screenshots: { type: [String], default: [] },
    description: { type: String, required: true },
    techStack: { type: [String], required: true },
    features: { type: [String], default: [] },
    challenges: { type: String, default: "" },
    results: { type: String, default: "" },
    liveLink: { type: String, default: "" },
    githubLink: { type: String, default: "" },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    type: { type: String, default: "WEB APP" },
    status: { type: String, default: "Completed" },
    detailsLink: { type: String, default: "" },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
    },
  }
);

export const ProjectModel = mongoose.models.Project || mongoose.model("Project", projectSchema);
export default ProjectModel;
