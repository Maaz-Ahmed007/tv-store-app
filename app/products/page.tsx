"use client";

import { useState } from "react";
import { Search, Filter, Plus } from "lucide-react";

import Header from "@/components/newcomponents/Header";

export default function Products() {
	const [products, setProducts] = useState([
		{
			id: 1,
			name: "TV Model XYZ",
			description: '55" 4K Smart TV',
			price: 799,
			stock: 15,
		},
		{
			id: 2,
			name: "Soundbar ABC",
			description: "Wireless Soundbar",
			price: 299,
			stock: 25,
		},
		{
			id: 3,
			name: "Gaming Console 123",
			description: "Next-gen Gaming Console",
			price: 499,
			stock: 10,
		},
		{
			id: 4,
			name: "Streaming Device QWE",
			description: "4K Streaming Stick",
			price: 49,
			stock: 50,
		},
		{
			id: 5,
			name: "Blu-ray Player UIO",
			description: "4K Blu-ray Player",
			price: 199,
			stock: 20,
		},
	]);

	const handleReload = () => {
		// Implement reload logic here
		console.log("Reloading products...");
	};

	return (
		<div className="flex flex-col h-full">
			<Header title="Products" showReload onReload={handleReload}>
				<button
					className="p-2 text-blue-600 hover:bg-blue-100 rounded-full"
					aria-label="Search">
					<Search className="w-6 h-6" />
				</button>
				<button
					className="p-2 text-blue-600 hover:bg-blue-100 rounded-full"
					aria-label="Filter">
					<Filter className="w-6 h-6" />
				</button>
			</Header>
			<div className="flex-grow overflow-auto">
				<div className="p-4 space-y-4">
					{products.map((product) => (
						<div
							key={product.id}
							className="bg-white p-4 rounded-lg shadow">
							<h2 className="text-lg font-semibold mb-2">
								{product.name}
							</h2>
							<p className="text-gray-600 mb-2">
								{product.description}
							</p>
							<div className="flex justify-between items-center">
								<span className="text-blue-600 font-bold">
									${product.price}
								</span>
								<span className="text-gray-600">
									In Stock: {product.stock}
								</span>
							</div>
						</div>
					))}
				</div>
			</div>
			<button
				className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg flex items-center"
				style={{ zIndex: 1000 }}>
				<Plus className="w-5 h-5 mr-2" />
				Add Product
			</button>
		</div>
	);
}
