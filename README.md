# 🚀 Cache Components Demo – Next.js 16

> Practical demonstration of **field-level granular caching** using Cache Components in Next.js 16.

📄 Spanish version: [Leer en Español](./readme.es.md)

[![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-48bdf8?logo=tailwind-css)](https://tailwindcss.com/)

---

## 🎯 What Problem Does This Solve?

This project demonstrates how to cache **individual fields of a record** using different strategies in Next.js 16.

### Common Scenario

You have a product with three fields that change at different rates:

- **Text** (name + description): Rarely changes
- **Price**: Changes occasionally
- **Stock**: Must always be up to date

How do you cache each field independently?

### The Solution

Each field is implemented as a **separate async component**, with its own query and caching strategy.

```tsx
// ✅ Each field has its own strategy
<ProductText productId={id} />      // Cached for 1 week
<ProductPrice productId={id} />     // Cached for 1 hour
<Suspense>
  <ProductStock productId={id} />   // No cache (streaming)
</Suspense>
```

---

## ✨ Features

- ✅ **Granular field-level caching** — Independent control over each data segment
- ✅ **Separated queries** — One query per field, automatically optimized
- ✅ **Tag-based revalidation** — Invalidate only what changed
- ✅ **Static shell + Streaming** — Instant HTML + fresh runtime data
- ✅ **Correct Suspense boundaries** — Clear examples of placement and reasoning
- ✅ **Interactive demo** — Buttons to test live revalidation
- ✅ **Static product routes** — `generateStaticParams` reinforcing educational PPR
- ✅ **Zod validation** — `productId` sanitization in Server Actions
- ✅ **Tailwind + shadcn/ui** — Modern, professional UI
- ✅ **TypeScript** — Fully type-safe
- ✅ **Mock DB with logs** — Observe when and how queries execute

---

## 🏗️ Architecture

```text
ProductPage (parent - sync)
│
└─ <Suspense>
   └─ ProductContent (async - accesses params)
      ├─ ProductText (async + 'use cache' + cacheLife('weeks'))
      ├─ ProductPrice (async + 'use cache' + cacheLife('hours'))
      └─ <Suspense>
         └─ ProductStock (async without cache - streaming)
```

---

## 📦 Installation

```bash
# Install dependencies
bun install

# Start development server
bun dev
```

Open: [http://localhost:3000](http://localhost:3000)

---

## 🎮 How to Use

### 1. View the Demo

- The home page displays a product list
- Click any product
- Observe colored badges indicating cache behavior

### 2. Inspect Network Tab

- Open DevTools → Network
- Disable cache
- Navigate to a product
- Notice:
  - Initial HTML already contains text and price
  - Stock arrives later via streaming

### 3. Check Server Logs

In your terminal:

```text
[DB Query] 📝 getProductText - Product 1
[DB Query] 💰 getProductPrice - Product 1
[DB Query] 📦 getProductStock - Product 1
```

### 4. Test Revalidation

- Click **"Revalidate Price"**
- Refresh the page
- Only the price regenerates
- Text remains cached

---

## 🔑 Key Concepts

### 1. Async Component = Promise

```tsx
// An async component IS a promise
async function ProductStock({ productId }) {
  const stock = await db.getStock(productId);
  return <div>{stock}</div>;
}

// Suspense must wrap it in the PARENT
<Suspense fallback="Loading...">
  <ProductStock /> {/* ← This line creates the promise */}
</Suspense>;
```

---

### 2. Multiple Queries vs Cache

Yes, there are multiple queries — but:

- **Cached queries** run at **build time** → static shell
- **Dynamic queries** run at **request time** → streaming
- Result: Improved perceived performance

---

### 3. Tag-Based Revalidation

```tsx
// Cache with tag
cacheTag(`product-price-${productId}`);

// Revalidate only that field
revalidateTag(`product-price-${productId}`, "max");
```

---

## 📖 Internal Documentation

- `/docs` — Introduction
- `/docs/implementation` — Full implementation
- `/docs/concepts` — Core concepts
- `/docs/revalidation` — `updateTag` vs `revalidateTag`
- `/docs/benefits` — Advantages

---

## 📚 Resources

- [Cache Components Documentation](https://nextjs.org/docs/app/getting-started/cache-components)
- [use cache directive](https://nextjs.org/docs/app/api-reference/directives/use-cache)
- [cacheLife API](https://nextjs.org/docs/app/api-reference/functions/cacheLife)
- [cacheTag API](https://nextjs.org/docs/app/api-reference/functions/cacheTag)
- [revalidateTag API](https://nextjs.org/docs/app/api-reference/functions/revalidateTag)
- [Next Skills](https://skills.sh/vercel-labs/next-skills/next-cache-components)

---

## 🐛 Troubleshooting

### Error: "Uncached data was accessed outside of Suspense"

**Cause:** Async component without cache or Suspense

**Fix:** Add `<Suspense>` in the parent or `'use cache'` inside the component

---

### Stock does not update on refresh

**Cause:** Browser cache enabled

**Fix:** Hard refresh (`Ctrl + Shift + R`) or use a private window

---

### Revalidation does not work

**Cause:** Incorrect tag

**Fix:** Ensure the tag is identical in both cache and revalidation:

```ts
cacheTag(`product-price-${productId}`);
revalidateTag(`product-price-${productId}`, "max");
```

---

## 🤝 Contributing

Contributions are welcome:

1. Fork the repository
2. Create a branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to your branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

MIT

---

## 👤 Author: IvanTsxx

Created to demonstrate Cache Components in Next.js 16.

---

## 💡 What You’ll Learn

This project showcases advanced Next.js 16 patterns:

- Granular caching with `use cache`
- Proper Suspense boundaries
- Runtime data handling
- Selective tag-based revalidation
- Static shell + Streaming (PPR)

Use this repository as a reference for real-world implementations.
