import Link from "next/link";
import { Suspense } from "react";
import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ProductsGrid } from "./_components/products-grid";
import { ProductsGridSkeleton } from "./_components/products-grid-skeleton";

export default function HomePage() {
	return (
		<div className="mx-auto flex w-full max-w-[900px] flex-col gap-4 px-4 py-6 [grid-area:main] md:px-6 md:pt-8 xl:px-8 xl:pt-14 xl:layout:[--fd-toc-width:268px]">
			<div className="mb-12 border-b pb-8 text-center">
				<h1 className="mb-2 font-bold text-4xl">🛍️ Demo Cache Components</h1>
				<p className="text-lg text-muted-foreground">
					Ejemplo de cacheo granular por campo en Next.js 16
				</p>
			</div>

			<Card className="mb-8">
				<CardHeader>
					<CardTitle>¿Qué demuestra esta app?</CardTitle>
					<CardDescription>
						Cacheo independiente de campos dentro del mismo registro
					</CardDescription>
				</CardHeader>
				<CardContent>
					<ul className="space-y-2">
						<li className="flex items-start gap-2">
							<Badge className="mt-0.5" variant="secondary">
								📝 Texto
							</Badge>
							<span>Cacheado por 1 semana (rara vez cambia)</span>
						</li>
						<li className="flex items-start gap-2">
							<Badge className="mt-0.5" variant="secondary">
								💰 Precio
							</Badge>
							<span>Cacheado por 1 hora (cambia ocasionalmente)</span>
						</li>
						<li className="flex items-start gap-2">
							<Badge className="mt-0.5" variant="secondary">
								📦 Stock
							</Badge>
							<span>Sin cache (siempre actualizado, streaming)</span>
						</li>
					</ul>
				</CardContent>
			</Card>

			{/*con Suspense porque es async */}
			<Suspense fallback={<ProductsGridSkeleton />}>
				<ProductsGrid />
			</Suspense>

			<Card className="border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
				<CardHeader>
					<CardTitle>🔬 Caso alternativo: Promise compartida</CardTitle>
					<CardDescription>
						Misma promesa para todos los bloques (texto, precio y stock), con un
						Suspense por componente.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Link
						href="/product/1/shared-promise"
						className="inline-flex font-medium text-blue-600 hover:text-blue-800"
					>
						Abrir demo shared promise (/product/1/shared-promise)
					</Link>
				</CardContent>
			</Card>

			<Card className="mt-8 border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950">
				<CardHeader>
					<CardTitle className="text-blue-900 dark:text-blue-100">
						💡 Cómo funciona
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-2 text-sm">
					<p>
						Cada campo del producto es un{" "}
						<strong>componente async separado</strong> con su propia estrategia
						de cache.
					</p>
					<p>
						El stock se envuelve en{" "}
						<code className="rounded bg-blue-100 px-1.5 py-0.5 dark:bg-blue-900">
							&lt;Suspense&gt;
						</code>{" "}
						para streaming en request time.
					</p>
					<p className="text-muted-foreground">
						Abre la consola del servidor para ver qué queries se ejecutan y
						cuándo.
					</p>
				</CardContent>
			</Card>
		</div>
	);
}
