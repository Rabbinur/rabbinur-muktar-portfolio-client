import mongoose, { Schema } from "mongoose";

const adminSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      default: "Full Stack Developer",
    },
    bio: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      default: "admin",
    },
    image: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["inactive", "admin_approval", "active"],
      default: "active",
    },
    phone_number: {
      type: String,
      default: null,
    },
    driving_license: {
      type: String,
      default: null,
    },
    work_place: {
      type: String,
      default: null,
    },
    date_of_birth: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
    },
  }
);

export const AdminModel = mongoose.models.Admin || mongoose.model("Admin", adminSchema);
export default AdminModel;
