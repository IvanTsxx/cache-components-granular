import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "@takumi-rs/image-response";

import BlogPostTemplate from "@/takumi/blog-post-template";

export const contentType = "image/webp";
export const size = { height: 630, width: 1200 };

export default async function Image({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  const avatarPath = join(process.cwd(), "public", "avatar.webp");
  const avatarBuffer = await readFile(avatarPath);
  const avatarBase64 = `data:image/webp;base64,${avatarBuffer.toString("base64")}`;

  const title = "Demo Cache Components";
  const category = lang === "es" ? "Inicio" : "Home";
  const date = new Date().toLocaleDateString(
    lang === "es" ? "es-ES" : "en-US",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  );

  return new ImageResponse(
    <BlogPostTemplate
      author="Nano Banana"
      avatar={avatarBase64}
      category={category}
      date={date}
      title={title}
    />,
    {
      format: "webp",
      height: 630,
      width: 1200,
    }
  );
}
