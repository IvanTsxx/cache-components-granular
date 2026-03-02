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

const translations = {
  en: {
    howItWorks1: "Each product field is a ",
    howItWorks1End: " with its own cache strategy.",
    howItWorks1Strong: "separate async component",
    howItWorks2: "The stock is wrapped in ",
    howItWorks2Code: "<Suspense>",
    howItWorks2End: " for streaming at request time.",
    howItWorks3:
      "Open the server console to see which queries are executed and when.",
    howItWorksTitle: "💡 How it works",
    priceDesc: "Cached for 1 hour (changes occasionally)",
    priceLabel: "💰 Price",
    sharedPromiseDesc:
      "Same promise for all blocks (text, price and stock), with a Suspense per component.",
    sharedPromiseLink: "Open shared promise demo (/product/1/shared-promise)",
    sharedPromiseTitle: "🔬 Alternative case: Shared promise",
    stockDesc: "No cache (always up-to-date, streaming)",
    stockLabel: "📦 Stock",
    subtitle: "Granular caching example per field in Next.js 16",
    textDesc: "Cached for 1 week (rarely changes)",
    textLabel: "📝 Text",
    title: "🛍️ Demo Cache Components",
    whatDoesItShow: "What does this app demonstrate?",
    whatDoesItShowDesc: "Independent caching of fields within the same record",
  },
  es: {
    howItWorks1: "Cada campo del producto es un ",
    howItWorks1End: " con su propia estrategia de cache.",
    howItWorks1Strong: "componente async separado",
    howItWorks2: "El stock se envuelve en ",
    howItWorks2Code: "<Suspense>",
    howItWorks2End: " para streaming en request time.",
    howItWorks3:
      "Abre la consola del servidor para ver qué queries se ejecutan y cuándo.",
    howItWorksTitle: "💡 Cómo funciona",
    priceDesc: "Cacheado por 1 hora (cambia ocasionalmente)",
    priceLabel: "💰 Precio",
    sharedPromiseDesc:
      "Misma promesa para todos los bloques (texto, precio y stock), con un Suspense por componente.",
    sharedPromiseLink: "Abrir demo shared promise (/product/1/shared-promise)",
    sharedPromiseTitle: "🔬 Caso alternativo: Promise compartida",
    stockDesc: "Sin cache (siempre actualizado, streaming)",
    stockLabel: "📦 Stock",
    subtitle: "Ejemplo de cacheo granular por campo en Next.js 16",
    textDesc: "Cacheado por 1 semana (rara vez cambia)",
    textLabel: "📝 Texto",
    title: "🛍️ Demo Cache Components",
    whatDoesItShow: "¿Qué demuestra esta app?",
    whatDoesItShowDesc:
      "Cacheo independiente de campos dentro del mismo registro",
  },
} as const;

export default async function HomePage({
  params,
}: {
  params: Promise<{
    lang: string;
  }>;
}) {
  const { lang } = await params;
  const t = translations[lang as keyof typeof translations] || translations.en;

  return (
    <div className="mx-auto flex w-full max-w-[900px] flex-col gap-4 px-4 py-6 [grid-area:main] md:px-6 md:pt-8 xl:px-8 xl:pt-14 xl:layout:[--fd-toc-width:268px]">
      <div className="mb-12 border-b pb-8 text-center">
        <h1 className="mb-2 font-bold text-4xl">{t.title}</h1>
        <p className="text-lg text-muted-foreground">{t.subtitle}</p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{t.whatDoesItShow}</CardTitle>
          <CardDescription>{t.whatDoesItShowDesc}</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <Badge className="mt-0.5" variant="secondary">
                {t.textLabel}
              </Badge>
              <span>{t.textDesc}</span>
            </li>
            <li className="flex items-start gap-2">
              <Badge className="mt-0.5" variant="secondary">
                {t.priceLabel}
              </Badge>
              <span>{t.priceDesc}</span>
            </li>
            <li className="flex items-start gap-2">
              <Badge className="mt-0.5" variant="secondary">
                {t.stockLabel}
              </Badge>
              <span>{t.stockDesc}</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/*con Suspense porque es async */}
      <Suspense fallback={<ProductsGridSkeleton />}>
        <ProductsGrid lang={lang} />
      </Suspense>

      <Card className="border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
        <CardHeader>
          <CardTitle>{t.sharedPromiseTitle}</CardTitle>
          <CardDescription>{t.sharedPromiseDesc}</CardDescription>
        </CardHeader>
        <CardContent>
          <Link
            prefetch={false}
            href={`/${lang}/product/1/shared-promise`}
            className="inline-flex font-medium text-blue-600 hover:text-blue-800"
          >
            {t.sharedPromiseLink}
          </Link>
        </CardContent>
      </Card>

      <Card className="mt-8 border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950">
        <CardHeader>
          <CardTitle className="text-blue-900 dark:text-blue-100">
            {t.howItWorksTitle}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>
            {t.howItWorks1}
            <strong>{t.howItWorks1Strong}</strong>
            {t.howItWorks1End}
          </p>
          <p>
            {t.howItWorks2}
            <code className="rounded bg-blue-100 px-1.5 py-0.5 dark:bg-blue-900">
              {t.howItWorks2Code}
            </code>{" "}
            {t.howItWorks2End}
          </p>
          <p className="text-muted-foreground">{t.howItWorks3}</p>
        </CardContent>
      </Card>
    </div>
  );
}
