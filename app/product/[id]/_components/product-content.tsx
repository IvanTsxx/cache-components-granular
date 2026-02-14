// ============================================
// CONTENIDO DEL PRODUCTO - Accede a params

import Link from "next/link";
import { Suspense } from "react";
import { parseProductId } from "@/lib/validators/product";
import { ProductPrice } from "./product-price";
import { ProductStock } from "./product-stock";
import { ProductText } from "./product-text";
import { RevalidateButtons } from "./revalidate-buttons";
import { StockSkeleton } from "./stock-skeleton";

// ============================================
export async function ProductContent({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const safeProductId = parseProductId(id);

	return (
		<div className="space-y-6">
			<Link
				href={`/product/${safeProductId}/shared-promise`}
				className="inline-flex font-medium text-blue-600 hover:text-blue-800"
			>
				Ver demo alternativa: promise compartida + Suspense por bloque
			</Link>

			{/* 
        TEXTO DEL PRODUCTO - Cacheado por 1 semana
        Se incluye en el static shell durante prerendering
      */}
			<ProductText productId={safeProductId} />

			{/* 
        PRECIO - Cacheado por 1 hora
        Se incluye en el static shell durante prerendering
      */}
			<ProductPrice productId={safeProductId} />

			{/* 
        STOCK - SIN CACHE, siempre fresh
        Requiere Suspense porque streams en request time
        El componente ProductStock ES la promesa
      */}
			<Suspense fallback={<StockSkeleton />}>
				<ProductStock productId={safeProductId} />
			</Suspense>

			{/* Botones para revalidar manualmente */}
			<RevalidateButtons productId={safeProductId} />
		</div>
	);
}
