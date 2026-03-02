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
export function ProductContent({
	params,
}: {
	params: { id: string; lang: string };
}) {
	const { id, lang } = params;
	const safeProductId = parseProductId(id);

	return (
		<div className="space-y-6">
			<Link
				href={`/${lang}/product/${safeProductId}/shared-promise`}
				className="inline-flex font-medium text-blue-600 hover:text-blue-800"
			>
				{lang === "es"
					? "Ver demo alternativa: promise compartida + Suspense por bloque"
					: "See alternative demo: shared promise + Suspense per block"}
			</Link>

			{/* 
        TEXTO DEL PRODUCTO - Cacheado por 1 semana
        Se incluye en el static shell durante prerendering
      */}
			<ProductText productId={safeProductId} lang={lang} />

			{/* 
        PRECIO - Cacheado por 1 hora
        Se incluye en el static shell durante prerendering
      */}
			<ProductPrice productId={safeProductId} lang={lang} />

			{/* 
        STOCK - SIN CACHE, siempre fresh
        Requiere Suspense porque streams en request time
        El componente ProductStock ES la promesa
      */}
			<Suspense fallback={<StockSkeleton lang={lang} />}>
				<ProductStock productId={safeProductId} lang={lang} />
			</Suspense>

			{/* Botones para revalidar manualmente */}
			<RevalidateButtons productId={safeProductId} lang={lang} />
		</div>
	);
}
