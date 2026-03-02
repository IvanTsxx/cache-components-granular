import { google } from "@ai-sdk/google";
import { convertToModelMessages, streamText } from "ai";

import { ProvideLinksToolSchema } from "@/lib/inkeep-qa-schema";

export const revalidate = 60;

const model = google("gemini-2.5-flash");

export async function POST(req: Request) {
  const reqJson = await req.json();

  const result = streamText({
    messages: await convertToModelMessages(reqJson.messages, {
      ignoreIncompleteToolCalls: true,
    }),
    model,
    toolChoice: "auto",
    tools: {
      provideLinks: {
        inputSchema: ProvideLinksToolSchema,
      },
    },
  });

  return result.toUIMessageStreamResponse();
}
