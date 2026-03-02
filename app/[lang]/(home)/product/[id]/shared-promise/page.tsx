import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { db } from "@/lib/db";
import { ProductPageSkeleton } from "../_components/product-page-skeleton";
import { ProductContentSharedPromise } from "./_components/product-content-shared-promise";

export default async function ProductSharedPromisePage(
	props: PageProps<"/[lang]/product/[id]/shared-promise">,
) {
	const params = await props.params;
	return (
		<div className="mx-auto flex w-full max-w-[900px] flex-col gap-4 px-4 py-6 [grid-area:main] md:px-6 md:pt-8 xl:px-8 xl:pt-14 xl:layout:[--fd-toc-width:268px]">
			<Link
				href={`/${params.lang}`}
				className="mb-6 inline-flex items-center gap-2 font-medium text-blue-600 hover:text-blue-800"
			>
				<ArrowLeft className="h-4 w-4" />
				{params.lang === "es" ? "Volver al inicio" : "Back to home"}
			</Link>

			<Suspense fallback={<ProductPageSkeleton lang={params.lang} />}>
				<ProductContentSharedPromise params={params} />
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
