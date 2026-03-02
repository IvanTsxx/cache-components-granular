import { setTimeout as simulateDelay } from "node:timers/promises";

// Mock database con datos de productos
// En una app real, esto sería PostgreSQL, MySQL, etc.

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  lastUpdated: string;
}

export interface ProductPayload {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  lastChecked: string;
}

const products: Record<string, Product> = {
  "1": {
    description:
      "Potente laptop con procesador Intel i7, 16GB RAM, 512GB SSD. Ideal para desarrollo y diseño.",
    id: "1",
    lastUpdated: new Date().toISOString(),
    name: "Laptop Dell XPS 15",
    price: 1299.99,
    stock: 15,
  },
  "2": {
    description:
      "Smartphone de última generación con cámara de 48MP, chip A17 Pro y pantalla Super Retina XDR.",
    id: "2",
    lastUpdated: new Date().toISOString(),
    name: "iPhone 15 Pro",
    price: 999.99,
    stock: 8,
  },
  "3": {
    description:
      "Audífonos con cancelación de ruido líder en la industria. 30 horas de batería.",
    id: "3",
    lastUpdated: new Date().toISOString(),
    name: "Sony WH-1000XM5",
    price: 399.99,
    stock: 23,
  },
};

export const db = {
  async getProduct(productId: string): Promise<ProductPayload> {
    await simulateDelay(220);
    const product = products[productId];
    if (!product) {
      throw new Error("Product not found");
    }

    // Simula que el stock cambia
    const stockVariation = Math.floor(Math.random() * 5) - 2;
    const currentStock = Math.max(0, product.stock + stockVariation);

    console.log(
      `[DB Query] 🧩 getProduct (all fields) - Product ${productId} - Stock: ${currentStock}`
    );

    return {
      description: product.description,
      id: product.id,
      lastChecked: new Date().toISOString(),
      name: product.name,
      price: product.price,
      stock: currentStock,
    };
  },

  async getProductPrice(productId: string) {
    await simulateDelay(150);
    const product = products[productId];
    if (!product) {
      throw new Error("Product not found");
    }

    console.log(`[DB Query] 💰 getProductPrice - Product ${productId}`);
    return {
      price: product.price,
    };
  },

  async getProductStock(productId: string) {
    await simulateDelay(200);
    const product = products[productId];
    if (!product) {
      throw new Error("Product not found");
    }

    // Simula que el stock cambia
    const stockVariation = Math.floor(Math.random() * 5) - 2;
    const currentStock = Math.max(0, product.stock + stockVariation);

    console.log(
      `[DB Query] 📦 getProductStock - Product ${productId} - Stock: ${currentStock}`
    );
    return {
      lastChecked: new Date().toISOString(),
      stock: currentStock,
    };
  },

  async getProductText(productId: string) {
    await simulateDelay(100);
    const product = products[productId];
    if (!product) {
      throw new Error("Product not found");
    }

    console.log(`[DB Query] 📝 getProductText - Product ${productId}`);
    return {
      description: product.description,
      name: product.name,
    };
  },

  async listProducts() {
    await simulateDelay(100);
    console.log("[DB Query] 📋 listProducts");
    return Object.values(products).map((p) => ({
      id: p.id,
      name: p.name,
    }));
  },
};
