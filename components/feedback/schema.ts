import { z } from "zod/mini";

export const blockFeedback = z.object({
  blockBody: z.optional(z.string()),
  blockId: z.string(),
  message: z.string(),

  url: z.string(),
});

export const pageFeedback = z.object({
  message: z.string(),
  opinion: z.enum(["good", "bad"]),
  url: z.string(),
});

export const actionResponse = z.object({
  githubUrl: z.optional(z.string()),
});

export type BlockFeedback = z.infer<typeof blockFeedback>;
export type PageFeedback = z.infer<typeof pageFeedback>;
export type ActionResponse = z.infer<typeof actionResponse>;
