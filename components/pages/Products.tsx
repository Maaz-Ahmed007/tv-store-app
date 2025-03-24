import { Edit, Plus, Trash2 } from "lucide-react";

import Button from "../Button";

type Product = {
	id: string;
	name: string;
	brand: string;
	model: string;
	price: number;
	stock: number;
	imageUrl: string;
};

export default function ProductsPage({ products }: { products: Product[] }) {
	return (
		<div className="p-4 space-y-4">
			{/* Add Product Button */}
			<Button
				variant="primary"
				className="w-full flex items-center justify-center">
				<Plus className="mr-2" /> Add New Product
			</Button>

			<div className="space-y-3">
				{products.map((product) => (
					<div
						key={product.id}
						className="bg-white rounded-lg shadow-md p-4 flex items-center space-x-4 hover:shadow-lg transition-all duration-300">
						<img
							src={product.imageUrl}
							alt={product.name}
							className="w-20 h-16 object-cover rounded-md"
						/>
						<div className="flex-grow">
							<h3 className="font-semibold text-gray-800">
								{product.name}
							</h3>
							<p className="text-sm text-gray-500">
								{product.brand} | {product.model}
							</p>
							<div className="flex justify-between mt-2">
								<span className="text-gray-600">
									Stock: {product.stock}
								</span>
								<span className="font-semibold">
									${product.price}
								</span>
							</div>
						</div>
						<div className="flex space-x-2">
							<Button variant="secondary" size="sm">
								<Edit size={16} />
							</Button>
							<Button variant="danger" size="sm">
								<Trash2 size={16} />
							</Button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
