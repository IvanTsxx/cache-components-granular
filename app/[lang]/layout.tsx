import "@/app/globals.css";
import { Analytics } from "@vercel/analytics/next";
import { defineI18nUI } from "fumadocs-ui/i18n";
import { RootProvider } from "fumadocs-ui/provider/next";
import { MessageCircleIcon } from "lucide-react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { DocsLayout } from "@/components/layout/notebook";
import { AISearch, AISearchPanel, AISearchTrigger } from "@/components/search";
import { buttonVariants } from "@/components/ui/button";
import { i18n } from "@/lib/i18n";
import { baseOptions } from "@/lib/layout.shared";
import { source } from "@/lib/source";
import { cn } from "@/lib/utils";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  description:
    "Demo educativa de Cache Components en Next.js 16: cacheo granular, Suspense, revalidación y beneficios de performance/coste.",
  title: "Cache Components Granular | Next.js 16",
};

const { provider } = defineI18nUI(i18n, {
  translations: {
    en: {
      chooseLanguage: "Choose language",
      displayName: "English",
      lastUpdate: "Last update",
      nextPage: "Next page",
      previousPage: "Previous page",
      search: "Search",
      toc: "Table of contents",
    },
    es: {
      chooseLanguage: "Elige idioma",
      displayName: "Español",
      lastUpdate: "Última actualización",
      nextPage: "Página siguiente",
      previousPage: "Página anterior",
      search: "Buscar",
      toc: "Tabla de contenidos",
    },
  },
});

export function generateStaticParams() {
  return i18n.languages.map((lang) => ({ lang }));
}

export default async function RootLayout({
  params,
  children,
}: {
  params: Promise<{ lang: string }>;
  children: React.ReactNode;
}) {
  const { lang } = await params;

  return (
    <html lang={lang} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col antialiased`}
      >
        <RootProvider i18n={provider(lang)}>
          <DocsLayout
            tabMode="navbar"
            tree={source.getPageTree(lang)}
            {...baseOptions(lang)}
          >
            <AISearch>
              <AISearchPanel />
              <AISearchTrigger
                position="float"
                className={cn(
                  buttonVariants({
                    className: "text-fd-muted-foreground rounded-2xl",
                    variant: "secondary",
                  })
                )}
              >
                <MessageCircleIcon className="size-4.5" />
                Ask AI
              </AISearchTrigger>
            </AISearch>
            {children}
          </DocsLayout>
        </RootProvider>
        <Analytics />
      </body>
    </html>
  );
}
