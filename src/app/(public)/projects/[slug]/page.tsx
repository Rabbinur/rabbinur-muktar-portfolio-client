import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ExternalLink, Github, Layers, Target, ShieldAlert, Award } from "lucide-react";
import { notFound } from "next/navigation";

const fallbackProjects = [
  {
    title: "ShoppingCart.bd",
    slug: "shoppingcart-bd",
    description: "A full-featured e-commerce platform built with Next.js, Node.js, MongoDB, Stripe, and bKash payment gateway integration.",
    techStack: ["Next.js", "Node.js", "MongoDB", "Stripe", "bKash"],
    features: ["Add to Cart", "Checkout flow", "bKash & Stripe payment", "Order dashboard"],
    challenges: "Handling payment consistency during intermittent mobile network outages for local bKash checkout APIs.",
    results: "Achieved transactional success rates exceeding 99.8% by implementing robust queuing state models and database transaction logs.",
    featured: true,
    liveLink: "https://shoppingcart.muktar.dev",
    githubLink: "https://github.com/rabbinur-muktar/shoppingcart-bd",
    thumbnail: "",
    screenshots: []
  },
  {
    title: "USA Marry",
    slug: "usa-marry",
    description: "A specialized matrimonial matching platform optimized for SEO, including auth and dashboard flows.",
    techStack: ["Next.js", "MongoDB", "Authentication", "SEO"],
    features: ["User authentication", "Dynamic profile matches", "Optimized SEO meta headers"],
    challenges: "Configuring high-performing dynamic og:image headers dynamically for thousands of registered members while matching core performance indexes.",
    results: "Slashed load delays by 35% and increased organic match queries index by leveraging Next.js App Router edge metadata rendering.",
    featured: true,
    liveLink: "https://usamarry.com",
    githubLink: "https://github.com/rabbinur-muktar/usa-marry",
    thumbnail: "",
    screenshots: []
  },
  {
    title: "CRM Distributor System",
    slug: "crm-distributor-system",
    description: "Enterprise CRM system with Role-Based Access Control, stock tracking, and deliveries management.",
    techStack: ["Next.js", "Node.js", "MongoDB", "RBAC"],
    features: ["Role-Based Access Control", "Inventory tracker", "Sales reports"],
    challenges: "Designing clean database aggregations for real-time delivery sheet reports mapping multi-level delivery routes.",
    results: "Integrated atomic update queries reducing loading sheet calculation overheads from 5s to under 100ms.",
    featured: true,
    liveLink: "https://crm.muktar.dev",
    githubLink: "https://github.com/rabbinur-muktar/crm-distributor",
    thumbnail: "",
    screenshots: []
  },
  {
    title: "Enterprise Dashboard System",
    slug: "enterprise-dashboard-system",
    description: "Real-time metrics visualization platform built with React, Node.js, and MongoDB.",
    techStack: ["React", "Node.js", "MongoDB"],
    features: ["Real-time data charts", "Metrics cards", "PDF exports"],
    challenges: "Updating massive live charts without causing client memory leaks or excessive DOM re-renders.",
    results: "Achieved seamless 60fps rendering of dynamic metrics charts using optimized canvas hooks and debounced API pooling.",
    featured: true,
    liveLink: "https://dashboard.muktar.dev",
    githubLink: "https://github.com/rabbinur-muktar/enterprise-dashboard",
    thumbnail: "",
    screenshots: []
  }
];

async function getProjectData(slug: string) {
  try {
    // Use the local Next.js API route — works in all environments
    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

    const res = await fetch(`${baseUrl}/api/projects/${slug}`, {
      next: { revalidate: 60 },
    });

    if (res.ok) {
      const data = await res.json();
      return data?.data || null;
    }
  } catch (err) {
    console.error("Failed to fetch project, using fallback:", err);
  }
  // Fallback static data if DB is unreachable
  return fallbackProjects.find((p) => p.slug === slug) || null;
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectData(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow pt-28 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Back btn */}
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors bg-slate-50 dark:bg-zinc-900 border border-border/40 px-4 py-2 rounded-xl"
          >
            <ArrowLeft size={14} />
            Back to Showcase
          </Link>

          {/* Heading title */}
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground">
              {project.title}
            </h1>
            
            {/* Tech tags */}
            <div className="flex flex-wrap gap-2">
              {project.techStack?.map((tech: string) => (
                <span key={tech} className="text-xs font-bold bg-input border border-border/40 text-foreground/85 px-3 py-1 rounded-full">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Image Thumbnail */}
          <div className="relative h-64 sm:h-96 rounded-3xl border border-border overflow-hidden bg-input/20">
            {project.thumbnail ? (
              <Image
                src={project.thumbnail}
                alt={project.title}
                fill
                priority
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs font-bold">
                Project Image Showcase
              </div>
            )}
          </div>

          {/* Core Overview & Sidebar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
            {/* Description side */}
            <div className="md:col-span-2 space-y-6">
              <div className="space-y-2">
                <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <Layers size={18} className="text-secondary" />
                  Description Overview
                </h2>
                <p className="text-sm font-medium text-muted-foreground leading-relaxed whitespace-pre-line">
                  {project.description}
                </p>
              </div>

              {/* Case Study Details */}
              {project.challenges && (
                <div className="space-y-2 pt-4 border-t border-border/40">
                  <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                    <ShieldAlert size={18} className="text-rose-500" />
                    Challenges Faced
                  </h2>
                  <p className="text-sm font-medium text-muted-foreground leading-relaxed">
                    {project.challenges}
                  </p>
                </div>
              )}

              {project.results && (
                <div className="space-y-2 pt-4 border-t border-border/40">
                  <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                    <Award size={18} className="text-emerald-500" />
                    Results Achieved
                  </h2>
                  <p className="text-sm font-medium text-muted-foreground leading-relaxed">
                    {project.results}
                  </p>
                </div>
              )}
            </div>

            {/* Sidebar actions & features */}
            <div className="space-y-6">
              {/* Action links */}
              <div className="space-y-3 bg-slate-50/50 dark:bg-black/10 p-5 rounded-2xl border border-border/40">
                <h3 className="text-xs font-black uppercase text-muted-foreground tracking-wider mb-2">Project URLs</h3>
                {project.liveLink && (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-primary text-background py-3 rounded-xl text-xs font-black hover:opacity-90 transition-opacity shadow-sm"
                  >
                    <ExternalLink size={13} />
                    <span>Launch Live Demo</span>
                  </a>
                )}
                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 border border-border/80 text-foreground py-3 rounded-xl text-xs font-black hover:bg-input transition-all"
                  >
                    <Github size={14} />
                    <span>Explore Codebase</span>
                  </a>
                )}
              </div>

              {/* Features list */}
              {project.features && project.features.length > 0 && (
                <div className="bg-slate-50/50 dark:bg-black/10 p-5 rounded-2xl border border-border/40 space-y-3">
                  <h3 className="text-xs font-black uppercase text-muted-foreground tracking-wider flex items-center gap-1.5">
                    <Target size={14} className="text-secondary" />
                    Key Features
                  </h3>
                  <ul className="space-y-2">
                    {project.features.map((feat: string, i: number) => (
                      <li key={i} className="text-xs text-muted-foreground font-semibold flex items-start gap-2">
                        <span className="h-1.5 w-1.5 bg-blue-500 rounded-full mt-1.5 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
