"use client";

import { useState } from "react";

type Product = {
	id: string;
	name: string;
	brand: string;
	model: string;
	price: number;
	stock: number;
};

export default function ProductsPage() {
	const [products] = useState<Product[]>([
		{
			id: "1",
			name: "Samsung QLED",
			brand: "Samsung",
			model: "Q80A",
			price: 1299,
			stock: 5,
		},
		// More sample products...
	]);

	return (
		<div>
			<h1 className="text-2xl font-bold mb-4 text-black">
				Product Inventory
			</h1>

			{/* Add Product Button */}
			<button className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
				Add New Product
			</button>

			{/* Product List */}
			<div className="space-y-2">
				{products.map((product) => (
					<div
						key={product.id}
						className="bg-white p-3 rounded-lg shadow-sm flex justify-between items-center">
						<div>
							<h3 className="font-semibold text-gray-700">
								{product.name}
							</h3>
							<p className="text-sm text-gray-500">
								Stock: {product.stock} | ${product.price}
							</p>
						</div>
						<div className="flex space-x-2">
							<button className="text-blue-500">Edit</button>
							<button className="text-red-500">Delete</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
