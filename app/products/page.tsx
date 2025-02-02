"use client";

import PullToRefresh from "@/components/newcomponents/PullToRefresh";
import { Plus } from "lucide-react";

export default function Products() {
	const handleRefresh = () => {
		// Implement refresh logic here
		console.log("Refreshing products...");
	};

	return (
		<PullToRefresh onRefresh={handleRefresh}>
			<div className="p-4">
				<h1 className="text-2xl font-bold text-blue-600 mb-4">
					Products
				</h1>
				<button className="bg-blue-600 text-white px-4 py-2 rounded-full mb-4 flex items-center">
					<Plus className="w-5 h-5 mr-2" />
					Add Product
				</button>
				<div className="space-y-4">
					{[1, 2, 3].map((product) => (
						<div
							key={product}
							className="bg-white p-4 rounded-lg shadow">
							<h2 className="text-lg font-semibold mb-2">
								TV Model XYZ
							</h2>
							<p className="text-gray-600 mb-2">
								55" 4K Smart TV
							</p>
							<div className="flex justify-between items-center">
								<span className="text-blue-600 font-bold">
									$799
								</span>
								<span className="text-gray-600">
									In Stock: 15
								</span>
							</div>
						</div>
					))}
				</div>
			</div>
		</PullToRefresh>
	);
}
