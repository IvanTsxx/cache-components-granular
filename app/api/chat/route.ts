// oxlint-disable prefer-template
import { google } from "@ai-sdk/google";
import { convertToModelMessages, streamText } from "ai";

import { ProvideLinksToolSchema } from "@/lib/inkeep-qa-schema";

const model = google("gemini-2.5-flash");

// Función para obtener el contexto de la página actual
async function getCurrentPageContext(
  currentUrl: string,
  currentLang: string
): Promise<string> {
  try {
    const baseURL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const url = `${baseURL}/${currentLang}/llms.mdx/docs/${currentUrl}`;

    const response = await fetch(url);

    if (!response.ok) {
      console.warn(`Failed to fetch page context: ${response.status}`);
      return "";
    }

    return await response.text();
  } catch (error) {
    console.error("Error fetching current page context:", error);
    return "";
  }
}

export async function POST(req: Request) {
  const reqJson = await req.json();
  const { messages } = reqJson;

  // Obtener la URL de la página actual
  const currentPageUrl =
    req.headers.get("x-current-page") || reqJson.currentPage || "";
  const currentLang =
    req.headers.get("x-current-lang") || reqJson.currentLang || "es";

  let pageContext = "";
  if (currentPageUrl) {
    pageContext = await getCurrentPageContext(currentPageUrl, currentLang);
    console.log("pageContext", pageContext);
  }

  // Crear mensaje del sistema
  const systemMessage = {
    content: `Eres un asistente de IA especializado en responder preguntas sobre el contenido de esta web, que es una demostracion sobre como se usa Cache Components de Next.js.
${
  pageContext
    ? `CONTEXTO DE LA PÁGINA ACTUAL:
${pageContext}

Responde basándote principalmente en el contenido de esta página. Si la pregunta está relacionada con el contenido mostrado, úsalo como referencia principal.`
    : "No hay contexto específico de página disponible."
}

INSTRUCCIONES:
- Prioriza la información del contexto de la página actual
- Proporciona ejemplos de código cuando sea relevante
- Si necesitas información de otras páginas, indícalo claramente
- Mantén tus respuestas precisas y útiles
- Si la pregunta no está relacionada con el contenido de la página, puedes responder de manera general sobre Fumadocs`,
    role: "system" as const,
  };

  const result = streamText({
    messages: await convertToModelMessages(messages, {
      ignoreIncompleteToolCalls: true,
    }),
    model,
    system: systemMessage,
    temperature: 0.3,
    toolChoice: "auto",
    tools: {
      provideLinks: {
        inputSchema: ProvideLinksToolSchema,
      },
    },
  });

  return result.toUIMessageStreamResponse();
}
