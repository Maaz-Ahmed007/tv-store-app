"use client";

import { useState, useEffect } from "react";
import { getProducts } from "@/actions/product-actions";
import type { FullProductTypes } from "@/lib/validations/product-validations";

import CreateProductModal from "@/components/modals/products/CreateProductModal";
import UpdateProductModal from "@/components/modals/products/UpdateProductModal";
import DeleteProductModal from "@/components/modals/products/DeleteProductModal";
import AddStockModal from "@/components/modals/products/AddStockModal";

export default function ProductList() {
	const [products, setProducts] = useState<FullProductTypes[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [filter, setFilter] = useState<"all" | "inStock" | "outOfStock">(
		"all"
	);

	useEffect(() => {
		fetchProducts();
	}, []);

	async function fetchProducts() {
		setIsLoading(true);
		setError(null);
		try {
			const result = await getProducts();
			if (result.success && result.products) {
				setProducts(result.products);
			} else {
				setError("Failed to fetch products");
			}
		} catch (err) {
			setError("An unexpected error occurred");
			console.error(err);
		} finally {
			setIsLoading(false);
		}
	}

	const handleProductCreated = (newProduct: FullProductTypes) => {
		setProducts((prevProducts) => [...prevProducts, newProduct]);
	};

	const handleProductUpdated = (updatedProduct: FullProductTypes) => {
		setProducts((prevProducts) =>
			prevProducts.map((product) =>
				product.id === updatedProduct.id ? updatedProduct : product
			)
		);
	};

	const handleProductDeleted = (deletedProductId: string) => {
		setProducts((prevProducts) =>
			prevProducts.filter((product) => product.id !== deletedProductId)
		);
	};

	const filteredProducts = products.filter((product) => {
		if (filter === "all") return true;
		if (filter === "inStock")
			return product.quantity ? product.quantity > 0 : false;
		if (filter === "outOfStock") return product.quantity === 0;
		return true;
	});

	if (isLoading) return <div>Loading products...</div>;
	if (error) return <div className="text-red-500">Error: {error}</div>;

	return (
		<div>
			<div className="flex justify-between items-center mb-4">
				<div className="flex gap-1">
					<span
						className={`text-sm font-medium py-1 px-3 rounded-md cursor-pointer hover:text-gray-700 hover:bg-gray-200 ${
							filter === "all"
								? "text-gray-600 bg-gray-100"
								: "text-gray-600"
						}`}
						onClick={() => setFilter("all")}>
						All
					</span>
					<span
						className={`text-sm font-medium py-1 px-3 rounded-md cursor-pointer hover:text-blue-700 hover:bg-blue-200 ${
							filter === "inStock"
								? "text-blue-600 bg-blue-100"
								: "text-gray-600"
						}`}
						onClick={() => setFilter("inStock")}>
						In Stock
					</span>
					<span
						className={`text-sm font-medium py-1 px-3 rounded-md cursor-pointer hover:text-red-700 hover:bg-red-200 ${
							filter === "outOfStock"
								? "text-red-600 bg-red-100"
								: "text-gray-600"
						}`}
						onClick={() => setFilter("outOfStock")}>
						Out of Stock
					</span>
				</div>
				<CreateProductModal onProductCreated={handleProductCreated} />
			</div>
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{filteredProducts.map((product) => (
					<div
						key={product.id}
						className={`bg-gradient-to-b ${
							product.quantity === 0
								? "from-red-50 to-red-100 border-gray-300"
								: "from-blue-50 to-blue-100 border-blue-200"
						} border rounded-lg shadow-sm p-4 space-y-2`}>
						<div className="flex justify-between items-center">
							<h2 className="text-base font-bold text-gray-800">
								{product.name}
							</h2>
							<AddStockModal
								productId={product.id}
								productName={product.name}
								currentStock={
									product.quantity ? product.quantity : 0
								}
								onStockUpdated={handleProductUpdated}
							/>
						</div>
						<div className="space-y-2">
							<p className="text-sm text-gray-600">
								{product.description}
							</p>
							<div className="flex items-center gap-4">
								<div className="text-gray-600 text-sm">
									<strong>Size:</strong> {product.size}
								</div>
								<div className="text-gray-600 text-sm">
									<strong>Panel:</strong> {product.panel}
								</div>
							</div>
							<div className="flex items-center gap-4">
								<div className="text-gray-600 text-sm">
									<strong>Company:</strong>{" "}
									{product.company || "N/A"}
								</div>
								<div className="text-gray-600 text-sm">
									<strong>Sold:</strong> {product.sold}
								</div>
							</div>
							<div className="flex items-center gap-4">
								<div className="text-gray-600 text-sm">
									<strong>Price:</strong> {product.price}
								</div>
								<div className="text-gray-600 text-sm">
									<strong>Cost:</strong> {product.cost}
								</div>
							</div>
						</div>
						<div className="flex justify-end pt-2 gap-2">
							<UpdateProductModal
								product={product}
								onProductUpdated={handleProductUpdated}
							/>
							<DeleteProductModal
								productId={product.id}
								productName={product.name}
								onProductDeleted={handleProductDeleted}
							/>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
