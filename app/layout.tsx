import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import { baseOptions } from "@/lib/layout.shared";
import { source } from "@/lib/source";
import "./globals.css";
import { RootProvider } from "fumadocs-ui/provider/next";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const jetbrainsMono = JetBrains_Mono({
	subsets: ["latin"],
	variable: "--font-sans",
});

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

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="es" className={jetbrainsMono.variable} suppressHydrationWarning>
			<body
				className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col antialiased`}
			>
				<RootProvider
					theme={{
						defaultTheme: "light",
					}}
				>
					<Suspense fallback={<RootLayoutSkeleton />}>
						<DocsLayout tree={source.getPageTree()} {...baseOptions()}>
							{children}
						</DocsLayout>
					</Suspense>
				</RootProvider>
			</body>
		</html>
	);
}

const RootLayoutSkeleton = () => {
	return (
		<main>
			<section>
				{Array.from({ length: 10 }).map((_, index) => {
					return (
						<Skeleton
							key={`section-${index.toString()}`}
							className="h-12 w-full"
						/>
					);
				})}
			</section>
		</main>
	);
};
