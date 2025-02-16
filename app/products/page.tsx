import { RefreshCw } from "lucide-react";

import ProductList from "./ProductList";
import ProductForm from "@/components/forms/ProductForm";

import { Button } from "@/components/ui/button";
import DashboardWrapper from "@/components/DashboardWrapper";

// ✅ Actions
import { getProducts } from "@/actions/products";

export default async function ProductPage() {
	const { products, error } = await getProducts();

	return (
		<DashboardWrapper>
			<div className="p-4 border-b bg-blue-100">
				<header className="flex justify-between items-center">
					<h1 className="text-2xl font-bold">Products</h1>
					<Button variant="ghost" size="icon">
						<RefreshCw className="h-6 w-6" />
					</Button>
				</header>
			</div>

			<div className="flex flex-col md:flex-row">
				<div className="w-full md:w-1/3">
					<ProductForm />
				</div>
				<div className="w-full md:w-2/3">
					{error ? (
						<p className="text-red-500 p-4">{error.general}</p>
					) : (
						<ProductList products={products} />
					)}
				</div>
			</div>
		</DashboardWrapper>
	);
}
