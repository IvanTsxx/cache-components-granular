// source.config.ts
import { remarkFeedbackBlock } from "fumadocs-core/mdx-plugins/remark-feedback-block";
import { defineConfig, defineDocs } from "fumadocs-mdx/config";
var feedbackOptions = {
  // other options:
};
var docs = defineDocs({
  dir: "content/docs"
});
var source_config_default = defineConfig({
  mdxOptions: {
    remarkPlugins: [[remarkFeedbackBlock, feedbackOptions]]
  }
});
export {
  source_config_default as default,
  docs
};
