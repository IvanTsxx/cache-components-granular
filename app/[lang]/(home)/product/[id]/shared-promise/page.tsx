import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

import { ProductPageSkeleton } from "@/app/[lang]/(home)/product/[id]/_components/product-page-skeleton";
import { ProductContentSharedPromise } from "@/app/[lang]/(home)/product/[id]/shared-promise/_components/product-content-shared-promise";
import { db } from "@/lib/db";

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    id: string;
    lang: string;
  }>;
}): Promise<Metadata> {
  const { id, lang } = await params;

  let productText;
  try {
    productText = await db.getProductText(id);
  } catch {
    productText = {
      description: "Demo product for Next.js Cache Components",
      name: `Product ${id}`,
    };
  }

  if (lang === "es") {
    return {
      description: `Ejemplo de "Shared Promise" con Next.js Cache Components: resolviendo múltiples peticiones a la vez para tu data fetching: ${productText.description}`,
      keywords: [
        "nextjs cache components",
        "nextjs 16",
        "ejemplos de nextjs cache components",
        "shared promise",
        "data fetching nextjs",
        "react cache components",
        "suspense caching",
      ],
      title: `${productText.name} (Shared Promise) | Demo de Componentes Next.js 16`,
    };
  }

  return {
    description: `Shared Promise example with Next.js Cache Components: resolving multiple requests at once for data fetching: ${productText.description}`,
    keywords: [
      "nextjs cache components",
      "nextjs 16",
      "nextjs cache components examples",
      "shared promise",
      "data fetching nextjs",
      "react cache components",
      "suspense caching",
    ],
    title: `${productText.name} (Shared Promise) | Next.js 16 Cache Components Demo`,
  };
}

export default async function ProductSharedPromisePage(
  props: PageProps<"/[lang]/product/[id]/shared-promise">
) {
  const params = await props.params;
  return (
    <div className="mx-auto flex w-full max-w-[900px] flex-col gap-4 px-4 py-6 [grid-area:main] md:px-6 md:pt-8 xl:px-8 xl:pt-14 xl:layout:[--fd-toc-width:268px]">
      <Link
        prefetch={false}
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
