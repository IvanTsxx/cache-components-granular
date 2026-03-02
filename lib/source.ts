import type { InferPageType } from "fumadocs-core/source";
import { loader } from "fumadocs-core/source";
import { lucideIconsPlugin } from "fumadocs-core/source/lucide-icons";
import { docs } from "fumadocs-mdx:collections/server";

import { i18n } from "./i18n";

export const source = loader({
  baseUrl: "/docs",
  i18n,
  plugins: [lucideIconsPlugin()],
  source: docs.toFumadocsSource(),
});

export function getPageImage(page: InferPageType<typeof source>) {
  const segments = [...page.slugs, "image.webp"];

  return {
    segments,
    url: `/${page.locale}/og/${segments.join("/")}`,
  };
}
