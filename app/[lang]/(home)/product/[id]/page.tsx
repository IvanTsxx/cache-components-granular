import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

import { db } from "@/lib/db";

import { ProductContent } from "./_components/product-content";
import { ProductPageSkeleton } from "./_components/product-page-skeleton";

// ============================================
// COMPONENTE PRINCIPAL - Solo estructura estática
// ============================================
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
      description: `Ejemplo de cacheo granular en Next.js 16: ${productText.description}`,
      keywords: [
        "nextjs cache components",
        "nextjs 16",
        "ejemplos de nextjs cache components",
        "granular caching",
        "PPR",
        "suspense",
      ],
      title: `${productText.name} | Demo de Componentes Next.js 16`,
    };
  }

  return {
    description: `Granular caching example in Next.js 16: ${productText.description}`,
    keywords: [
      "nextjs cache components",
      "nextjs 16",
      "nextjs cache components examples",
      "granular caching",
      "PPR",
      "suspense",
    ],
    title: `${productText.name} | Next.js 16 Cache Components Demo`,
  };
}

export default async function ProductPage(
  props: PageProps<"/[lang]/product/[id]">
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
