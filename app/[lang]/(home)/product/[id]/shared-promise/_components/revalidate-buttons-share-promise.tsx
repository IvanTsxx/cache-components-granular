"use client";

import { Loader2 } from "lucide-react";
import { useState } from "react";

import { revalidateSharedPromiseProduct } from "@/app/actions";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function RevalidateButtonsSharedPromise({
  productId,
  lang,
}: {
  productId: string;
  lang: string;
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("");

  const handleRevalidate = async () => {
    setLoading(true);
    setStatus("");

    try {
      const result: { success: boolean; message: string } =
        await revalidateSharedPromiseProduct(productId);

      setStatus(result.message);
      setTimeout(() => setStatus(""), 3000);
    } catch (error) {
      console.error(error);
      setStatus(lang === "es" ? "Error al revalidar" : "Error revalidating");
      setTimeout(() => setStatus(""), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-purple-200 bg-purple-50 dark:border-purple-800 dark:bg-purple-950">
      <CardHeader>
        <CardTitle>
          {lang === "es" ? "🔧 Controles de Cache" : "🔧 Cache Controls"}
        </CardTitle>
        <CardDescription>
          {lang === "es"
            ? "Usa este boton para forzar la revalidación de los datos. El stock siempre se actualiza automáticamente (sin cache)."
            : "Use this button to force revalidation of the data. Stock is always updated automatically (no cache)."}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleRevalidate}
            disabled={loading}
            className={cn(
              buttonVariants({
                color: "primary",
                size: "sm",
              }),
              "bg-green-600 hover:bg-green-700"
            )}
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {lang === "es" ? "Revalidar" : "Revalidate"}
          </button>
        </div>

        {status && (
          <div className="rounded-lg bg-blue-100 p-3 text-center text-blue-900 text-sm dark:bg-blue-900 dark:text-blue-100">
            {status}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
