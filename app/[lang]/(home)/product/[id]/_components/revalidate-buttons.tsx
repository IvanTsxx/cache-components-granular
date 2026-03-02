"use client";

import { Loader2 } from "lucide-react";
import { useState } from "react";
import {
	revalidateProduct,
	revalidateProductPrice,
	revalidateProductText,
} from "@/app/actions";
import { buttonVariants } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function RevalidateButtons({
	productId,
	lang,
}: {
	productId: string;
	lang: string;
}) {
	const [loading, setLoading] = useState<string | null>(null);
	const [status, setStatus] = useState<string>("");

	const handleRevalidate = async (action: "price" | "text" | "all") => {
		setLoading(action);
		setStatus("");

		try {
			let result: { success: boolean; message: string };
			if (action === "price") {
				result = await revalidateProductPrice(productId);
			} else if (action === "text") {
				result = await revalidateProductText(productId);
			} else {
				result = await revalidateProduct(productId);
			}

			setStatus(result.message);
			setTimeout(() => setStatus(""), 3000);
		} catch (error) {
			console.error(error);
			setStatus(lang === "es" ? "Error al revalidar" : "Error revalidating");
			setTimeout(() => setStatus(""), 3000);
		} finally {
			setLoading(null);
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
						? "Usa estos botones para forzar la revalidación de campos específicos. El stock siempre se actualiza automáticamente (sin cache)."
						: "Use these buttons to force revalidation of specific fields. Stock is always updated automatically (no cache)."}
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="flex flex-wrap gap-3">
					<button
						type="button"
						onClick={() => handleRevalidate("text")}
						disabled={loading !== null}
						className={cn(
							buttonVariants({
								color: "primary",
								size: "sm",
							}),
							"bg-green-600 hover:bg-green-700",
						)}
					>
						{loading === "text" && (
							<Loader2 className="mr-2 h-4 w-4 animate-spin" />
						)}
						{lang === "es" ? "Revalidar Texto" : "Revalidate Text"}
					</button>

					<button
						type="button"
						onClick={() => handleRevalidate("price")}
						disabled={loading !== null}
						className={cn(
							buttonVariants({
								color: "primary",
								size: "sm",
							}),
							"bg-blue-600 hover:bg-blue-700",
						)}
					>
						{loading === "price" && (
							<Loader2 className="mr-2 h-4 w-4 animate-spin" />
						)}
						{lang === "es" ? "Revalidar Precio" : "Revalidate Price"}
					</button>

					<button
						type="button"
						onClick={() => handleRevalidate("all")}
						disabled={loading !== null}
						className={cn(
							buttonVariants({
								color: "primary",
								size: "sm",
							}),
							"bg-purple-600 hover:bg-purple-700",
						)}
					>
						{loading === "all" && (
							<Loader2 className="mr-2 h-4 w-4 animate-spin" />
						)}
						{lang === "es" ? "Revalidar Todo" : "Revalidate All"}
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
