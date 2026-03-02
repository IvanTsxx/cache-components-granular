// oxlint-disable require-await
"use server";

import { revalidateTag } from "next/cache";

import { invalidateCacheCreatedAt } from "@/lib/cache-age-registry";
import { parseProductId } from "@/lib/validators/product";

function validateProductId(productId: string) {
  return parseProductId(productId);
}

export async function revalidateProductPrice(productId: string) {
  const safeProductId = validateProductId(productId);
  const priceTag = `product-price-${safeProductId}`;
  const sharedTag = `product-shared-${safeProductId}`;
  console.log(
    `[Server Action] 💰 Revalidating price for product ${safeProductId}`
  );
  revalidateTag(priceTag, "max");
  revalidateTag(sharedTag, "max");
  invalidateCacheCreatedAt(priceTag, sharedTag);
  return { message: "Precio revalidado exitosamente", success: true };
}

export async function revalidateProductText(productId: string) {
  const safeProductId = validateProductId(productId);
  const textTag = `product-text-${safeProductId}`;
  const sharedTag = `product-shared-${safeProductId}`;
  console.log(
    `[Server Action] 📝 Revalidating text for product ${safeProductId}`
  );
  revalidateTag(textTag, "max");
  revalidateTag(sharedTag, "max");
  invalidateCacheCreatedAt(textTag, sharedTag);
  return { message: "Texto revalidado exitosamente", success: true };
}

export async function revalidateProduct(productId: string) {
  const safeProductId = validateProductId(productId);
  const priceTag = `product-price-${safeProductId}`;
  const textTag = `product-text-${safeProductId}`;
  const sharedTag = `product-shared-${safeProductId}`;
  console.log(
    `[Server Action] 🔄 Revalidating all fields for product ${safeProductId}`
  );
  revalidateTag(priceTag, "max");
  revalidateTag(textTag, "max");
  revalidateTag(sharedTag, "max");
  invalidateCacheCreatedAt(priceTag, textTag, sharedTag);
  return { message: "Producto completo revalidado", success: true };
}

export async function revalidateSharedPromiseProduct(productId: string) {
  const safeProductId = validateProductId(productId);
  const sharedCacheTag = `product-shared-${productId}`;
  console.log(
    `[Server Action] 🔄 Revalidating shared promise for product ${safeProductId}`
  );
  revalidateTag(sharedCacheTag, "max");
  invalidateCacheCreatedAt(sharedCacheTag);
  return { message: "Shared promise revalidado exitosamente", success: true };
}
