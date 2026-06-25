import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import FloatingActions from "@/components/sections/FloatingActions";
import type { Metadata } from "next";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ||
  "https://rabbinurmuktar.vercel.app";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || `${BASE_URL}/api`;

/* ----------------------------- */
/* Safe API fetch helper */
/* ----------------------------- */
async function getSEOData() {
  try {
    const res = await fetch(`${API_BASE}/settings`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) throw new Error("SEO API failed");

    return await res.json();
  } catch {
    return null;
  }
}

/* ----------------------------- */
/* Dynamic Metadata */
/* ----------------------------- */
export async function generateMetadata(): Promise<Metadata> {
  const data = await getSEOData();

  const seo = data?.data?.seoSettings || {};
  const personal = data?.data?.personalInfo || {};

  const title =
    seo.title ||
    "Hire Full Stack Developer | Next.js & React Expert - Rabbinur Muktar";

  const description =
    seo.description ||
    "Hire Rabbinur Muktar, a Full Stack Developer from Bangladesh specializing in Next.js, React, Node.js, and MongoDB. Building fast, scalable, SEO-optimized web applications.";

  const keywords: string[] =
    seo.keywords && seo.keywords.length > 0
      ? seo.keywords
      : [
        "hire full stack developer",
        "next.js developer",
        "react developer freelance",
        "node.js developer Bangladesh",
        "mern stack developer",
        "web development service",
        "saas developer",
        "freelance developer Bangladesh",
      ];

  const image = personal.profileImage || "/rabbinur.jpeg";
  const name = personal.name || "Rabbinur Muktar";
  const role = personal.role || "Full Stack Developer";

  return {
    metadataBase: new URL(BASE_URL),

    title: {
      default: title,
      template: "%s | Rabbinur Muktar",
    },

    description,

    keywords,

    authors: [{ name, url: BASE_URL }],
    creator: name,
    publisher: name,

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    openGraph: {
      title,
      description,
      url: BASE_URL,
      siteName: `${name} Portfolio`,
      locale: "en_US",
      type: "website",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${name} - ${role}`,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@rabbinurmuktar",
    },

    alternates: {
      canonical: BASE_URL,
    },
  };
}

/* ----------------------------- */
/* Layout Component */
/* ----------------------------- */
export default function PublicLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="relative w-full overflow-x-hidden flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow w-full overflow-x-hidden">
        {children}
      </main>

      <Footer />
      <FloatingActions />
    </div>
  );
}