import "@/app/globals.css";
import { defineI18nUI } from "fumadocs-ui/i18n";
import { RootProvider } from "fumadocs-ui/provider/next";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { DocsLayout } from "@/components/layout/notebook";
import { i18n } from "@/lib/i18n";
import { baseOptions } from "@/lib/layout.shared";
import { source } from "@/lib/source";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Cache Components Granular | Next.js 16",
	description:
		"Demo educativa de Cache Components en Next.js 16: cacheo granular, Suspense, revalidación y beneficios de performance/coste.",
};

const { provider } = defineI18nUI(i18n, {
	translations: {
		en: {
			displayName: "English",
			search: "Search",
			chooseLanguage: "Choose language",
			nextPage: "Next page",
			previousPage: "Previous page",
			lastUpdate: "Last update",
			toc: "Table of contents",
		},
		es: {
			displayName: "Español",
			search: "Buscar",
			chooseLanguage: "Elige idioma",
			nextPage: "Página siguiente",
			previousPage: "Página anterior",
			lastUpdate: "Última actualización",
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
	const lang = (await params).lang;

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
						{children}
					</DocsLayout>
				</RootProvider>
			</body>
		</html>
	);
}
