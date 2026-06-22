import { AdminModel } from "../models/Admin";
import { SettingsModel } from "../models/Settings";
import { ExperienceModel } from "../models/Experience";
import { ProjectModel } from "../models/Project";
import BcryptInstance from "./bcrypt";

export async function seedAdmin() {
  try {
    // 1. Seed Admin
    const adminCount = await AdminModel.countDocuments();
    if (adminCount === 0) {
      const defaultEmail = process.env.DEFAULT_ADMIN_EMAIL || "admin@gmail.com";
      const defaultPassword = process.env.DEFAULT_ADMIN_PASSWORD || "admin@gmail.com";

      console.log("🌱 Seeding default admin account:", defaultEmail);
      const hashedPassword = await BcryptInstance.hash(defaultPassword);

      await AdminModel.create({
        name: "Rabbinur Muktar",
        email: defaultEmail,
        password: hashedPassword,
        role: "admin",
        status: "active",
        designation: "Full Stack Developer",
        bio: "Crafting premium full-stack web applications.",
      });
      console.log("✅ Default admin account seeded successfully!");
    }

    // 2. Seed Settings
    const settingsCount = await SettingsModel.countDocuments();
    if (settingsCount === 0) {
      console.log("🌱 Seeding default website settings...");
      await SettingsModel.create({
        personalInfo: {
          name: "Rabbinur Muktar",
          role: "Full Stack Developer",
          location: "Bangladesh",
          bio: "I build robust, high-performance web applications using cutting-edge full-stack technologies. Driven by software crafts and high fidelity user experiences.",
          profileImage: "",
          resumeUrl: "",
        },
        socialLinks: {
          github: "https://github.com/rabbinur-muktar",
          linkedin: "https://linkedin.com/in/rabbinur-muktar",
          twitter: "https://twitter.com/rabbinur_muktar",
          facebook: "https://facebook.com/rabbinur.muktar",
        },
        seoSettings: {
          title: "Rabbinur Muktar | Full Stack Developer",
          description: "Portfolio website of Rabbinur Muktar",
          keywords: ["Next.js", "React", "Node.js", "MongoDB", "Full Stack Developer"],
        },
        websiteSettings: {
          availabilityStatus: "Available for new opportunities",
          theme: "dark",
        },
        heroTitle: "Crafting Premium Full Stack Web Applications",
        heroSubtitle: "Hi, I'm Rabbinur Muktar, a Full Stack Developer from Bangladesh. I build robust backend services and highly animated, responsive client portals.",
        resumeDownloadCount: 0,
      });
      console.log("✅ Default settings seeded successfully!");
    }

    // 3. Seed Experiences
    const experienceCount = await ExperienceModel.countDocuments();
    if (experienceCount === 0) {
      console.log("🌱 Seeding default experiences...");
      const defaultExperiences = [
        {
          role: "Senior Full Stack Engineer",
          company: "Global IT Solutions",
          duration: "Jan 2024 - Present",
          location: "Dhaka, Bangladesh",
          description: [
            "Leading development of enterprise scale dashboards",
            "Mentoring junior engineers and code quality audits",
            "Reduced page load speeds by 40% via bundles splitting",
          ],
          isCurrent: true,
          order: 1,
        },
        {
          role: "Full Stack Developer",
          company: "Tech Bangladesh Ltd",
          duration: "Jun 2022 - Dec 2023",
          location: "Dhaka, Bangladesh",
          description: [
            "Designed and shipped Matrimonial and E-commerce products",
            "Developed modular APIs utilizing Express and MongoDB",
            "Engineered bKash and Stripe checkouts",
          ],
          isCurrent: false,
          order: 2,
        },
        {
          role: "Freelance Front-End Developer",
          company: "Self-Employed",
          duration: "Jun 2022 - Dec 2023",
          location: "Remote",
          description: [
            "Turned Figma designs into responsive, production-ready UIs.",
            "Built high-performance, interactive web interfaces using React and Next.js.",
            "Optimized client applications for speed, accessibility, and SEO compliance.",
          ],
          isCurrent: false,
          order: 3,
        },
      ];
      await ExperienceModel.insertMany(defaultExperiences);
      console.log("✅ Default experiences seeded successfully!");
    }

    // 4. Seed Projects
    const projectCount = await ProjectModel.countDocuments();
    if (projectCount === 0) {
      console.log("🌱 Seeding default projects...");
      const defaultProjects = [
        {
          title: "Cashless Union Services",
          slug: "cashless-union-services",
          description: "uniontax.gov.bd is a digital online service system for Union Parishads in Bangladesh. Through this platform, citizens can securely process taxes, licenses, and certificates.",
          techStack: ["React", "Next.js", "TypeScript", "JavaScript", "TailwindCSS", "Node.js"],
          features: ["Tax processing", "License generation", "Certificate downloads"],
          featured: true,
          order: 1,
          type: "WEB APP",
          status: "Completed",
          detailsLink: "#",
          liveLink: "#",
          githubLink: "#",
          thumbnail: "/project1.png",
        },
        {
          title: "Shopping Cart BD",
          slug: "shoppingcart-bd",
          description: "A high-performance, full-stack multi-vendor e-commerce platform built with Next.js, Node.js, MongoDB, Stripe, and bKash payment gateway integration.",
          techStack: ["Next.js", "React", "Redux Toolkit", "Node.js", "MongoDB", "Express", "Stripe", "bKash"],
          features: ["Add to Cart", "Checkout flow", "bKash & Stripe payment", "Order dashboard", "Multi-vendor panel"],
          featured: true,
          order: 2,
          type: "FULL STACK",
          status: "Completed",
          detailsLink: "#",
          liveLink: "#",
          githubLink: "#",
          thumbnail: "/project3.png",
        },
        {
          title: "USAMARRY Matrimony Platform",
          slug: "usa-marry",
          description: "Developed and maintained frontend features for a live global matrimony platform focused on secure user profiles, intelligent matchmaking filters, and robust SEO optimization.",
          techStack: ["React", "Next.js", "TypeScript", "JavaScript", "MongoDB", "TailwindCSS", "Authentication", "SEO"],
          features: ["User authentication", "Dynamic profile matches", "Optimized SEO meta headers"],
          featured: true,
          order: 3,
          type: "WEB APP",
          status: "Completed",
          detailsLink: "#",
          liveLink: "#",
          githubLink: "#",
          thumbnail: "/project4.png",
        },
        {
          title: "CRM Distributor System",
          slug: "crm-distributor-system",
          description: "Enterprise CRM system with Role-Based Access Control, stock tracking, and deliveries management.",
          techStack: ["Next.js", "Node.js", "MongoDB", "RBAC"],
          features: ["Role-Based Access Control", "Inventory tracker", "Sales reports"],
          featured: true,
          order: 4,
          type: "ENTERPRISE",
          status: "Completed",
          detailsLink: "#",
          liveLink: "#",
          githubLink: "#",
          thumbnail: "/project2.png",
        },
      ];
      await ProjectModel.insertMany(defaultProjects);
      console.log("✅ Default projects seeded successfully!");
    }
  } catch (error: any) {
    console.error("❌ Failed to seed database:", error.message);
  }
}
