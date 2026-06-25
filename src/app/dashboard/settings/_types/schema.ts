import * as z from "zod";

export const settingsFormSchema = z.object({
  personalInfo: z.object({
    name: z.string().min(1, "Name is required"),
    role: z.string().min(1, "Role is required"),
    location: z.string().min(1, "Location is required"),
    bio: z.string().min(1, "Bio is required"),
    profileImage: z.string().optional(),
    resumeUrl: z.string().optional(),
  }),
  socialLinks: z.object({
    github: z.string().url("Must be a valid URL").or(z.literal("")),
    linkedin: z.string().url("Must be a valid URL").or(z.literal("")),
    twitter: z.string().url("Must be a valid URL").or(z.literal("")),
    facebook: z.string().url("Must be a valid URL").or(z.literal("")),
  }),
  contactInfo: z.object({
    email: z.string().email("Must be a valid email").or(z.literal("")),
    phone: z.string().optional(),
    whatsapp: z.string().optional(),
    instagram: z.string().url("Must be a valid URL").or(z.literal("")),
  }),
  seoSettings: z.object({
    title: z.string().min(1, "SEO Title is required"),
    description: z.string().min(1, "SEO Description is required"),
    keywordsInput: z.string().optional(),
    keywords: z.array(z.string()),
  }),
  websiteSettings: z.object({
    availabilityStatus: z.string(),
    theme: z.enum(["light", "dark", "system"]),
  }),
  heroTitle: z.string().min(1, "Hero Title is required"),
  heroSubtitle: z.string().min(1, "Hero Subtitle is required"),
  stat1Label: z.string().optional(),
  stat1Value: z.string().optional(),
  stat2Label: z.string().optional(),
  stat2Value: z.string().optional(),
  stat3Label: z.string().optional(),
  stat3Value: z.string().optional(),
});

export type SettingsFormValues = z.infer<typeof settingsFormSchema>;

export const DEFAULT_SETTINGS_VALUES: SettingsFormValues = {
  personalInfo: { name: "", role: "", location: "", bio: "", profileImage: "", resumeUrl: "" },
  socialLinks: { github: "", linkedin: "", twitter: "", facebook: "" },
  contactInfo: { email: "", phone: "", whatsapp: "", instagram: "" },
  seoSettings: { title: "", description: "", keywords: [] },
  websiteSettings: { availabilityStatus: "Available for projects", theme: "dark" },
  heroTitle: "",
  heroSubtitle: "",
  stat1Label: "Completed Projects",
  stat1Value: "",
  stat2Label: "Client satisfaction",
  stat2Value: "99%",
  stat3Label: "Years experience",
  stat3Value: "3+",
};
