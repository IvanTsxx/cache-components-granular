import Link from "next/link";
import { Suspense } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { parseProductId } from "@/lib/validators/product";

import { ProductPriceFromPromise } from "./product-price-from-promise";
import { ProductStockFromPromise } from "./product-stock-from-promise";
import { ProductTextFromPromise } from "./product-text-from-promise";
import {
  ProductPriceFromPromiseSkeleton,
  ProductStockFromPromiseSkeleton,
  ProductTextFromPromiseSkeleton,
} from "./promise-field-skeletons";
import { getSharedProduct } from "./shared-product";

export function ProductContentSharedPromise({
  params,
}: {
  params: {
    lang: string;
    id: string;
  };
}) {
  const safeProductId = parseProductId(params.id);
  const productPromise = getSharedProduct(safeProductId);

  return (
    <div className="space-y-6">
      <Card className="border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
        <CardHeader>
          <CardTitle>
            {params.lang === "es"
              ? "Patrón: 1 promesa compartida + 1 Suspense por campo"
              : "Pattern: 1 shared promise + 1 Suspense per field"}
          </CardTitle>
          <CardDescription>
            {params.lang === "es"
              ? "Se crea una sola promesa con todos los datos del producto y se comparte a cada bloque para deconstruir el campo necesario."
              : "A single promise is created with all product data and shared to each block to deconstruct the necessary field."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>
            <code className="rounded bg-slate-200 px-1.5 py-0.5 text-xs dark:bg-slate-900">
              const productPromise = db.getProduct(id)
            </code>
          </p>
          <p>
            {params.lang === "es" ? (
              <>
                Cada componente hace <code>await productPromise</code> y usa
                solo su parte:{" "}
                <code>{"const { stock } = await productPromise"}</code>.
              </>
            ) : (
              <>
                Each component does <code>await productPromise</code> and uses
                only its part:{" "}
                <code>{"const { stock } = await productPromise"}</code>.
              </>
            )}
          </p>
          <p className="text-muted-foreground">
            {params.lang === "es"
              ? "Trade-off: al invalidar este enfoque, se recalcula el payload completo."
              : "Trade-off: when invalidating this approach, the full payload is recalculated."}
          </p>
          <Link
            href={`/${params.lang}/product/${safeProductId}`}
            className="inline-flex font-medium text-blue-600 hover:text-blue-800"
          >
            {params.lang === "es"
              ? "Ver version granular por query (multi-query)"
              : "See granular version by query (multi-query)"}
          </Link>
        </CardContent>
      </Card>

      <Suspense
        fallback={<ProductTextFromPromiseSkeleton lang={params.lang} />}
      >
        <ProductTextFromPromise
          productPromise={productPromise}
          lang={params.lang}
        />
      </Suspense>

      <Suspense
        fallback={<ProductPriceFromPromiseSkeleton lang={params.lang} />}
      >
        <ProductPriceFromPromise
          productPromise={productPromise}
          lang={params.lang}
        />
      </Suspense>

      <Suspense
        fallback={<ProductStockFromPromiseSkeleton lang={params.lang} />}
      >
        <ProductStockFromPromise
          productPromise={productPromise}
          lang={params.lang}
        />
      </Suspense>
    </div>
  );
}
