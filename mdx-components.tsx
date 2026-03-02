import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";

import { FeedbackBlock } from "@/components/feedback/client";
import { Mermaid } from "@/components/mdx/mermaid";

import { onBlockFeedbackAction } from "./lib/github";

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    ...components,
    FeedbackBlock: ({ children, ...rest }) => (
      <FeedbackBlock {...rest} onSendAction={onBlockFeedbackAction}>
        {children}
      </FeedbackBlock>
    ),
    Mermaid,
  };
}
