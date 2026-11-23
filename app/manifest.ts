import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/** Web app manifest: name, colours and icon for "add to home screen". */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: "Travel Dubai",
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#fbf3e5",
    theme_color: "#0e7c86",
    icons: [{ src: "/favicon.ico", sizes: "any", type: "image/x-icon" }],
  };
}
