import mongoose, { Schema } from "mongoose";

const personalInfoSchema = new Schema(
  {
    name: { type: String, default: "Rabbinur Muktar" },
    role: { type: String, default: "Full Stack Developer" },
    location: { type: String, default: "Bangladesh" },
    bio: { type: String, default: "" },
    profileImage: { type: String, default: "" },
    resumeUrl: { type: String, default: "" },
  },
  { _id: false }
);

const socialLinksSchema = new Schema(
  {
    github: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    twitter: { type: String, default: "" },
    facebook: { type: String, default: "" },
  },
  { _id: false }
);

const seoSettingsSchema = new Schema(
  {
    title: { type: String, default: "Rabbinur Muktar | Full Stack Developer" },
    description: { type: String, default: "Portfolio website of Rabbinur Muktar" },
    keywords: { type: [String], default: [] },
  },
  { _id: false }
);

const websiteSettingsSchema = new Schema(
  {
    availabilityStatus: { type: String, default: "Available for projects" },
    theme: { type: String, enum: ["light", "dark", "system"], default: "dark" },
  },
  { _id: false }
);

const contactInfoSchema = new Schema(
  {
    email: { type: String, default: "" },
    phone: { type: String, default: "" },
    whatsapp: { type: String, default: "" },
    instagram: { type: String, default: "" },
  },
  { _id: false }
);

const settingsSchema = new Schema(
  {
    personalInfo: { type: personalInfoSchema, default: {} },
    socialLinks: { type: socialLinksSchema, default: {} },
    seoSettings: { type: seoSettingsSchema, default: {} },
    websiteSettings: { type: websiteSettingsSchema, default: {} },
    contactInfo: { type: contactInfoSchema, default: {} },
    heroTitle: { type: String, default: "Building high-performance full-stack web applications" },
    heroSubtitle: { type: String, default: "Experienced developer specializing in Next.js, Node.js, and clean software architecture." },
    stat1Label: { type: String, default: "Completed Projects" },
    stat1Value: { type: String, default: "" },
    stat2Label: { type: String, default: "Client satisfaction" },
    stat2Value: { type: String, default: "99%" },
    stat3Label: { type: String, default: "Years experience" },
    stat3Value: { type: String, default: "3+" },
    resumeDownloadCount: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
    },
  }
);

if (process.env.NODE_ENV === "development" && mongoose.models && mongoose.models.Settings) {
  delete mongoose.models.Settings;
}

export const SettingsModel = mongoose.models.Settings || mongoose.model("Settings", settingsSchema);
export default SettingsModel;

