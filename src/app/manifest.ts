import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MD Rabbinur Muktar - Full Stack Web Developer",
    short_name: "Rabbinur",
    description: "Hire Full Stack Developer Bangladesh | Next.js & React Expert - Rabbinur Muktar",
    start_url: "/",
    display: "standalone",
    background_color: "#fafcff",
    theme_color: "#4745a7",
    icons: [
      {
        src: "/fav.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/rabbinur-logo.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
