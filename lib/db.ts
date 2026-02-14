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
		id: "1",
		name: "Laptop Dell XPS 15",
		description:
			"Potente laptop con procesador Intel i7, 16GB RAM, 512GB SSD. Ideal para desarrollo y diseño.",
		price: 1299.99,
		stock: 15,
		lastUpdated: new Date().toISOString(),
	},
	"2": {
		id: "2",
		name: "iPhone 15 Pro",
		description:
			"Smartphone de última generación con cámara de 48MP, chip A17 Pro y pantalla Super Retina XDR.",
		price: 999.99,
		stock: 8,
		lastUpdated: new Date().toISOString(),
	},
	"3": {
		id: "3",
		name: "Sony WH-1000XM5",
		description:
			"Audífonos con cancelación de ruido líder en la industria. 30 horas de batería.",
		price: 399.99,
		stock: 23,
		lastUpdated: new Date().toISOString(),
	},
};

const simulateDelay = (ms: number) =>
	new Promise((resolve) => setTimeout(resolve, ms));

export const db = {
	async getProduct(productId: string): Promise<ProductPayload> {
		await simulateDelay(220);
		const product = products[productId];
		if (!product) throw new Error("Product not found");

		// Simula que el stock cambia
		const stockVariation = Math.floor(Math.random() * 5) - 2;
		const currentStock = Math.max(0, product.stock + stockVariation);

		console.log(
			`[DB Query] 🧩 getProduct (all fields) - Product ${productId} - Stock: ${currentStock}`,
		);

		return {
			id: product.id,
			name: product.name,
			description: product.description,
			price: product.price,
			stock: currentStock,
			lastChecked: new Date().toISOString(),
		};
	},

	async getProductText(productId: string) {
		await simulateDelay(100);
		const product = products[productId];
		if (!product) throw new Error("Product not found");

		console.log(`[DB Query] 📝 getProductText - Product ${productId}`);
		return {
			name: product.name,
			description: product.description,
		};
	},

	async getProductPrice(productId: string) {
		await simulateDelay(150);
		const product = products[productId];
		if (!product) throw new Error("Product not found");

		console.log(`[DB Query] 💰 getProductPrice - Product ${productId}`);
		return {
			price: product.price,
		};
	},

	async getProductStock(productId: string) {
		await simulateDelay(200);
		const product = products[productId];
		if (!product) throw new Error("Product not found");

		// Simula que el stock cambia
		const stockVariation = Math.floor(Math.random() * 5) - 2;
		const currentStock = Math.max(0, product.stock + stockVariation);

		console.log(
			`[DB Query] 📦 getProductStock - Product ${productId} - Stock: ${currentStock}`,
		);
		return {
			stock: currentStock,
			lastChecked: new Date().toISOString(),
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
