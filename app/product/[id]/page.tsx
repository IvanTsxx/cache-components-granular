import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

import { db } from "@/lib/db";
import { ProductContent } from "./_components/product-content";
import { ProductPageSkeleton } from "./_components/product-page-skeleton";

// ============================================
// COMPONENTE PRINCIPAL - Solo estructura estática
// ============================================
export default function ProductPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	return (
		<div className="mx-auto flex w-full max-w-[900px] flex-col gap-4 px-4 py-6 [grid-area:main] md:px-6 md:pt-8 xl:px-8 xl:pt-14 xl:layout:[--fd-toc-width:268px]">
			<Link
				href="/"
				className="mb-6 inline-flex items-center gap-2 font-medium text-blue-600 hover:text-blue-800"
			>
				<ArrowLeft className="h-4 w-4" />
				Volver al inicio
			</Link>

			{/* Todo el contenido dinámico dentro de Suspense */}
			<Suspense fallback={<ProductPageSkeleton />}>
				<ProductContent params={params} />
			</Suspense>
		</div>
	);
}

export async function generateStaticParams() {
	const products = await db.listProducts();

	return products.map((product) => ({
		id: product.id,
	}));
}
