"use client";

import { Button } from "@/components/ui/button";

// ✅ Actions
import { deleteProduct } from "@/actions/products";

// ✅ Product Validations Types
import { getProductTypes } from "@/utils/validations";

interface Props {
	products: getProductTypes[];
}

export default function ProductList({ products }: Props) {
	async function onSubmit(id: string) {
		const response = await deleteProduct(id);

		if (response.error) {
			return;
			// Toast error
		}

		// Toast success
	}

	return (
		<div className="p-4">
			<h2 className="text-xl font-semibold mb-4">Product List</h2>
			<div className="grid gap-4">
				{products.map((product) => (
					<div key={product.id} className="border p-4 rounded-lg">
						<h3 className="font-bold">{product.name}</h3>
						<p className="text-sm text-gray-600">
							{product.description}
						</p>
						<p className="mt-2">
							Price:{" "}
							<span className="text-green-500">
								Rs. {product.price}
							</span>{" "}
							| Cost:{" "}
							<span className="text-green-500">
								Rs.
								{product.cost}
							</span>
						</p>
						<p className="mt-2">
							Quantity:{" "}
							<span className="text-red-500">
								Rs. {product.quantity}
							</span>
						</p>
						<p className="mt-4 flex items-center justify-end gap-3">
							Created Date:{" "}
							{product?.createdAt
								? new Date(
										product.createdAt
								  ).toLocaleDateString()
								: "N/A"}
							<Button
								variant="red"
								onClick={() => onSubmit(product.id)}>
								Delete
							</Button>
						</p>
					</div>
				))}
			</div>
		</div>
	);
}
