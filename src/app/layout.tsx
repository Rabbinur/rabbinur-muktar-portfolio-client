import MainProvider from "@/components/Provider/MainProvider";
import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://rabbinurmuktar.vercel.app";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default:
      "Hire Full Stack Developer Bangladesh | Next.js & React Expert - Rabbinur Muktar",
    template: "%s | Rabbinur Muktar",
  },

  description:
    "Hire Rabbinur Muktar, a professional Full Stack Developer from Bangladesh specializing in Next.js, React, Node.js, and MongoDB. I build fast, scalable, SEO-optimized web applications, SaaS platforms, and modern business solutions.",

  keywords: [
    "hire full stack developer Bangladesh",
    "next.js developer",
    "react developer freelance",
    "node.js developer Bangladesh",
    "mern stack developer",
    "web development service",
    "seo optimized web developer",
    "saas developer",
    "custom web application developer",
    "freelance web developer",
    "frontend backend developer",
    "software engineer Bangladesh",
    "Rabbinur Muktar",
  ],

  authors: [{ name: "Rabbinur Muktar", url: BASE_URL }],
  creator: "Rabbinur Muktar",
  publisher: "Rabbinur Muktar",

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

  alternates: {
    canonical: BASE_URL,
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Rabbinur Muktar Portfolio",
    title:
      "Hire Full Stack Developer Bangladesh | Next.js & React Expert - Rabbinur Muktar",
    description:
      "Professional Full Stack Developer from Bangladesh. Expert in Next.js, React, Node.js & MongoDB. Building scalable SaaS & modern web apps.",
    images: [
      {
        url: "/rabbinur.jpeg",
        width: 1200,
        height: 630,
        alt: "Rabbinur Muktar - Full Stack Developer",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Hire Full Stack Developer Bangladesh | Next.js & React Expert",
    description:
      "Full Stack Developer specializing in Next.js, React, Node.js & scalable SaaS apps.",
    images: ["/rabbinur.jpeg"],
    creator: "@rabbinurmuktar",
  },

  category: "technology",
  appleWebApp: {
    capable: true,
    title: "Rabbinur",
    statusBarStyle: "default",
  },
};

/* JSON-LD Structured Data (SEO BOOST) */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Rabbinur Muktar",
  alternateName: "Md. Rabbinur Muktar",
  url: BASE_URL,
  image: `${BASE_URL}/rabbinur.jpeg`,
  jobTitle: "Full Stack Web Developer",

  description:
    "Full Stack Developer from Bangladesh specializing in Next.js, React, Node.js, MongoDB and SaaS development.",

  address: {
    "@type": "PostalAddress",
    addressCountry: "BD",
    addressRegion: "Dhaka",
  },

  sameAs: [
    "https://github.com/rabbinur",
    "https://www.linkedin.com/in/md-rabbinur-muktar-89a364232/",
    "https://twitter.com/rabbinurmuktar",
    "https://www.instagram.com/rabbinur_muktar/",
  ],

  knowsAbout: [
    "Next.js",
    "React",
    "Node.js",
    "MongoDB",
    "TypeScript",
    "Full Stack Development",
    "SaaS Development",
    "API Development",
    "Web Performance Optimization",
  ],

  hasOccupation: {
    "@type": "Occupation",
    name: "Full Stack Web Developer",
    skills: [
      "Next.js",
      "React",
      "Node.js",
      "MongoDB",
      "TypeScript",
      "REST API",
      "GraphQL",
      "SEO Optimization",
    ],
  },

  worksFor: {
    "@type": "Organization",
    name: "Freelance",
  },
};

/* Service Schema (VERY IMPORTANT FOR RANKING) */
const serviceLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Full Stack Web Development",
  provider: {
    "@type": "Person",
    name: "Rabbinur Muktar",
    url: BASE_URL,
  },
  areaServed: "Worldwide",
  description:
    "Professional web development service using Next.js, React, Node.js and MongoDB to build scalable SaaS and business applications.",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} antialiased scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        {/* Person Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Service Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }}
        />
      </head>
      <body className="bg-background text-foreground transition-colors duration-300 min-h-screen flex flex-col justify-between">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <MainProvider>
            {children}
          </MainProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
