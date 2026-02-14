"use server";

import { revalidateTag } from "next/cache";
import { parseProductId } from "@/lib/validators/product";

function validateProductId(productId: string) {
	return parseProductId(productId);
}

export async function revalidateProductPrice(productId: string) {
	const safeProductId = validateProductId(productId);
	console.log(
		`[Server Action] 💰 Revalidating price for product ${safeProductId}`,
	);
	revalidateTag(`product-price-${safeProductId}`, "max");
	return { success: true, message: "Precio revalidado exitosamente" };
}

export async function revalidateProductText(productId: string) {
	const safeProductId = validateProductId(productId);
	console.log(
		`[Server Action] 📝 Revalidating text for product ${safeProductId}`,
	);
	revalidateTag(`product-text-${safeProductId}`, "max");
	return { success: true, message: "Texto revalidado exitosamente" };
}

export async function revalidateProduct(productId: string) {
	const safeProductId = validateProductId(productId);
	console.log(
		`[Server Action] 🔄 Revalidating all fields for product ${safeProductId}`,
	);
	revalidateTag(`product-price-${safeProductId}`, "max");
	revalidateTag(`product-text-${safeProductId}`, "max");
	return { success: true, message: "Producto completo revalidado" };
}
