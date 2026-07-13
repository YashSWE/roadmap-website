import { MetadataRoute } from "next";
import { chapters } from "@/content/roadmap";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://roadmap.behumoury.com";

  // Root URL
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
  ];

  // Chapter URLs
  chapters.forEach((chapter) => {
    routes.push({
      url: `${baseUrl}/${chapter.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    });
  });

  return routes;
}
