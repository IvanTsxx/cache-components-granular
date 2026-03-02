import { getLLMText } from "@/lib/get-llm-text";
import { source } from "@/lib/source";

export async function GET() {
  console.log("LLMS-FULL.TXT");
  const scan = source.getPages().map(getLLMText);
  const scanned = await Promise.all(scan);

  return new Response(scanned.join("\n\n"));
}
