import { remarkFeedbackBlock } from "fumadocs-core/mdx-plugins/remark-feedback-block";
import type { RemarkFeedbackBlockOptions } from "fumadocs-core/mdx-plugins/remark-feedback-block";
import { defineConfig, defineDocs } from "fumadocs-mdx/config";

const feedbackOptions: RemarkFeedbackBlockOptions = {
  // other options:
};

export const docs = defineDocs({
  dir: "content/docs",
});

export default defineConfig({
  mdxOptions: {
    remarkPlugins: [[remarkFeedbackBlock, feedbackOptions]],
  },
});
