import Navbar from "@/components/navbar";
import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import Projects from "@/components/sections/projects";
import Experience from "@/components/sections/experience";
import Contact from "@/components/sections/contact";
import Footer from "@/components/footer";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5005/api/v1";

const fallbackSettings = {
  personalInfo: {
    name: "Rabbinur Muktar",
    role: "Full Stack Developer",
    location: "Bangladesh",
    bio: "I build robust, high-performance web applications using cutting-edge full-stack technologies. Driven by software crafts and high fidelity user experiences.",
    profileImage: "",
    resumeUrl: ""
  },
  socialLinks: {
    github: "https://github.com/rabbinur-muktar",
    linkedin: "https://linkedin.com/in/rabbinur-muktar",
    twitter: "https://twitter.com/rabbinur_muktar",
    facebook: "https://facebook.com/rabbinur.muktar"
  },
  websiteSettings: {
    availabilityStatus: "Available for new opportunities",
    theme: "dark"
  },
  heroTitle: "Crafting Premium Full Stack Web Applications",
  heroSubtitle: "Hi, I'm Rabbinur Muktar, a Full Stack Developer from Bangladesh. I build robust backend services and highly animated, responsive client portals."
};

const fallbackProjects = [
  {
    title: "ShoppingCart.bd",
    slug: "shoppingcart-bd",
    description: "A full-featured e-commerce platform built with Next.js, Node.js, MongoDB, Stripe, and bKash payment gateway integration.",
    techStack: ["Next.js", "Node.js", "MongoDB", "Stripe", "bKash"],
    features: ["Add to Cart", "Checkout flow", "bKash & Stripe payment", "Order dashboard"],
    featured: true,
    order: 1
  },
  {
    title: "USA Marry",
    slug: "usa-marry",
    description: "A specialized matrimonial matching platform optimized for SEO, including auth and dashboard flows.",
    techStack: ["Next.js", "MongoDB", "Authentication", "SEO"],
    features: ["User authentication", "Dynamic profile matches", "Optimized SEO meta headers"],
    featured: true,
    order: 2
  },
  {
    title: "CRM Distributor System",
    slug: "crm-distributor-system",
    description: "Enterprise CRM system with Role-Based Access Control, stock tracking, and deliveries management.",
    techStack: ["Next.js", "Node.js", "MongoDB", "RBAC"],
    features: ["Role-Based Access Control", "Inventory tracker", "Sales reports"],
    featured: true,
    order: 3
  },
  {
    title: "Enterprise Dashboard System",
    slug: "enterprise-dashboard-system",
    description: "Real-time metrics visualization platform built with React, Node.js, and MongoDB.",
    techStack: ["React", "Node.js", "MongoDB"],
    features: ["Real-time data charts", "Metrics cards", "PDF exports"],
    featured: true,
    order: 4
  }
];

const fallbackExperiences = [
  {
    role: "Senior Full Stack Engineer",
    company: "Global IT Solutions",
    duration: "Jan 2024 - Present",
    location: "Dhaka, Bangladesh",
    description: ["Leading development of enterprise scale dashboards", "Mentoring junior engineers and code quality audits", "Reduced page load speeds by 40% via bundles splitting"],
    isCurrent: true,
    order: 1
  },
  {
    role: "Full Stack Developer",
    company: "Tech Bangladesh Ltd",
    duration: "Jun 2022 - Dec 2023",
    location: "Dhaka, Bangladesh",
    description: ["Designed and shipped Matrimonial and E-commerce products", "Developed modular APIs utilizing Express and MongoDB", "Engineered bKash and Stripe checkouts"],
    isCurrent: false,
    order: 2
  }
];

async function getPortfolioData() {
  try {
    const [settingsRes, projectsRes, experiencesRes] = await Promise.all([
      fetch(`${API_URL}/settings`, { next: { revalidate: 30 } }).then(r => r.ok ? r.json() : null),
      fetch(`${API_URL}/projects`, { next: { revalidate: 30 } }).then(r => r.ok ? r.json() : null),
      fetch(`${API_URL}/experiences`, { next: { revalidate: 30 } }).then(r => r.ok ? r.json() : null)
    ]);

    const hasProjects = projectsRes?.data?.data && Array.isArray(projectsRes.data.data) && projectsRes.data.data.length > 0;
    const hasExperiences = experiencesRes?.data?.data && Array.isArray(experiencesRes.data.data) && experiencesRes.data.data.length > 0;

    return {
      settings: settingsRes?.data || fallbackSettings,
      projects: hasProjects ? projectsRes.data.data : fallbackProjects,
      experiences: hasExperiences ? experiencesRes.data.data : fallbackExperiences
    };
  } catch (err) {
    console.error("Connection to backend server timed out. Using default fallback values.");
    return {
      settings: fallbackSettings,
      projects: fallbackProjects,
      experiences: fallbackExperiences
    };
  }
}

export default async function Home() {
  const { settings, projects, experiences } = await getPortfolioData();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Dynamic Header */}
      <Navbar />

      <main className="flex-grow">
        {/* Sections */}
        <Hero settings={settings} apiUrl={API_URL} />
        <About settings={settings} projectCount={projects.length} experiences={experiences} />
        <Projects projects={projects} />
        <Contact settings={settings} apiUrl={API_URL} />
      </main>

      {/* Dynamic Footer */}
      <Footer settings={settings} />
    </div>
  );
}
