import { createRelativeLink } from "fumadocs-ui/mdx";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Feedback } from "@/components/feedback/client";
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from "@/components/layout/notebook/page";
import { PageLastUpdate } from "@/components/layout/notebook/page/client";
import { LLMCopyButton, ViewOptions } from "@/components/page-actions";
import { onPageFeedbackAction } from "@/lib/github";
import { getPageImage, source } from "@/lib/source";
import { getMDXComponents } from "@/mdx-components";

const owner = "IvanTsxx";
const repo = "cache-components-granular";

export default async function Page(
  props: PageProps<"/[lang]/docs/[[...slug]]">
) {
  const params = await props.params;
  const page = source.getPage(params.slug, params.lang);
  if (!page) {
    notFound();
  }

  const MDX = page.data.body;

  const { lastModified } = await page.data;

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      {lastModified && <PageLastUpdate date={lastModified} />}
      <div className="flex flex-row gap-2 items-center border-b pt-2 pb-6">
        <LLMCopyButton
          markdownUrl={page.url.replace("/docs", "/llms.mdx/docs")}
          lang={params.lang}
        />
        <ViewOptions
          markdownUrl={page.url.replace("/docs", "/llms.mdx/docs")}
          githubUrl={`https://github.com/${owner}/${repo}/blob/dev/apps/docs/content/docs/${page.path}`}
          lang={params.lang}
        />
      </div>
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
      <Feedback onSendAction={onPageFeedbackAction} />
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
    openGraph: {
      images: getPageImage(page).url,
    },
    title: page.data.title,
  };
}
