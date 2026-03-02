// oxlint-disable prefer-template
import { google } from "@ai-sdk/google";
import { convertToModelMessages, streamText } from "ai";
import { z } from "zod";

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

  // Crear mensaje del sistema
  const systemMessage = {
    content: `Eres un asistente de IA especializado en responder preguntas sobre el contenido de esta web, que es una demostracion sobre como se usa Cache Components de Next.js.
Tienes a tu disposición una herramienta llamada "getPageContext" que te permite obtener el contenido de la página actual en la que se encuentra el usuario.
Úsala siempre que la pregunta del usuario parezca estar relacionada con el contenido de la página o si necesitas más contexto para responder adecuadamente.

INSTRUCCIONES:
- Llama a la herramienta getPageContext si necesitas saber de qué trata la página actual.
- Proporciona la pagina actual que es ${currentPageUrl} y el idioma que es ${currentLang}.
- Prioriza la información del contexto de la página actual si está disponible.
- Proporciona ejemplos de código cuando sea relevante.
- Si necesitas información de otras páginas, indícalo claramente.
- Mantén tus respuestas precisas y útiles.
- Si la pregunta no está relacionada con el contenido de la página o del sitio web, puedes responder de manera general.`,
    role: "system" as const,
  };

  const result = streamText({
    messages: await convertToModelMessages(messages, {
      ignoreIncompleteToolCalls: true,
    }),
    model,
    system: systemMessage.content,
    tools: {
      getPageContext: {
        description:
          "Obtiene el contexto de la página actual en la que se encuentra el usuario. Úsala cuando necesites saber qué está viendo el usuario para responder a su pregunta.",
        execute: async ({ pageUrl, locale }) => {
          const context = await getCurrentPageContext(pageUrl, locale);
          return context || "No se pudo obtener el contexto de la página.";
        },
        inputExamples: [
          {
            input: {
              locale: "es",
              pageUrl: "/revalidation",
            },
          },
          {
            input: {
              locale: "en",
              pageUrl: "/implementation",
            },
          },
        ],
        inputSchema: z.object({
          locale: z.string(),
          pageUrl: z.string(),
        }),
      },
      provideLinks: {
        inputSchema: ProvideLinksToolSchema,
      },
    },
  });

  return result.toUIMessageStreamResponse();
}
