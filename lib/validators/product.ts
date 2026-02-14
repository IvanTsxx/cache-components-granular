import { z } from "zod";

export const productIdSchema = z
	.string()
	.trim()
	.min(1)
	.regex(/^[a-zA-Z0-9-]+$/);

export function parseProductId(productId: string) {
	return productIdSchema.parse(productId);
}
