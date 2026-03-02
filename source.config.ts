import { remarkFeedbackBlock } from "fumadocs-core/mdx-plugins/remark-feedback-block";
import type { RemarkFeedbackBlockOptions } from "fumadocs-core/mdx-plugins/remark-feedback-block";
import { metaSchema, pageSchema } from "fumadocs-core/source/schema";
import { defineConfig, defineDocs } from "fumadocs-mdx/config";
import lastModified from "fumadocs-mdx/plugins/last-modified";
import { z } from "zod";

const feedbackOptions: RemarkFeedbackBlockOptions = {
  // other options:
};

export const docs = defineDocs({
  dir: "content/docs",
  docs: {
    postprocess: {
      includeProcessedMarkdown: true,
    },
    schema: pageSchema.extend({
      keywords: z.array(z.string()).optional(),
    }),
  },
  meta: {
    schema: metaSchema,
  },
});

export default defineConfig({
  mdxOptions: {
    remarkPlugins: [[remarkFeedbackBlock, feedbackOptions]],
  },
  plugins: [lastModified()],
});
