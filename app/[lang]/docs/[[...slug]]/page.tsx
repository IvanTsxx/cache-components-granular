import { createRelativeLink } from "fumadocs-ui/mdx";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from "@/components/layout/notebook/page";
import { source } from "@/lib/source";
import { getMDXComponents } from "@/mdx-components";

export default async function Page(
  props: PageProps<"/[lang]/docs/[[...slug]]">
) {
  const params = await props.params;
  const page = source.getPage(params.slug, params.lang);
  if (!page) {
    notFound();
  }

  const MDX = page.data.body;

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDX
          components={getMDXComponents({
            // this allows you to link to other pages with relative file paths
            a: createRelativeLink(source, page),
          })}
        />
      </DocsBody>
    </DocsPage>
  );
}

export function generateStaticParams() {
  return source.generateParams("slug", "lang");
}

export async function generateMetadata(
  props: PageProps<"/[lang]/docs/[[...slug]]">
): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug, params.lang);
  if (!page) {
    notFound();
  }

  return {
    description: page.data.description,
    title: page.data.title,
  };
}
