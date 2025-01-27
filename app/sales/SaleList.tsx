"use client";

import { useState, useEffect } from "react";
import { getSales } from "@/actions/sale-actions";
import type { SaleTypes } from "@/lib/validations/sale-validations";

import CreateSaleModal from "@/components/modals/sales/CreateSaleModal";
import UpdateSaleModal from "@/components/modals/sales/UpdateSaleModal";
import DeleteSaleModal from "@/components/modals/sales/DeleteSaleModal";

export default function SaleTypes() {
	const [sales, setSales] = useState<SaleTypes[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		fetchSales();
	}, []);

	async function fetchSales() {
		setIsLoading(true);
		setError(null);
		try {
			const result = await getSales();
			if (result.success && result.sales) {
				setSales(result.sales);
			} else {
				setError("Failed to fetch sales");
			}
		} catch (err) {
			setError("An unexpected error occurred");
			console.error(err);
		} finally {
			setIsLoading(false);
		}
	}

	const handleSaleCreated = (newSale: SaleTypes) => {
		setSales((prevSales) => [...prevSales, newSale]);
	};

	const handleSaleUpdated = (updatedSale: SaleTypes) => {
		setSales((prevSales) =>
			prevSales.map((sale) =>
				sale.id === updatedSale.id ? updatedSale : sale
			)
		);
	};

	const handleSaleDeleted = (deletedSaleId: string) => {
		setSales((prevSales) =>
			prevSales.filter((sale) => sale.id !== deletedSaleId)
		);
	};

	if (isLoading) return <div>Loading sales...</div>;
	if (error) return <div className="text-red-500">Error: {error}</div>;

	return (
		<div>
			<div className="flex justify-between items-center mb-4">
				<h2 className="text-xl font-semibold">Sales</h2>
				<CreateSaleModal onSaleCreated={handleSaleCreated} />
			</div>
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				{sales.map((sale) => (
					<div
						key={sale.id}
						className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 space-y-2">
						<div className="flex justify-between items-center">
							<h3 className="text-lg font-semibold">
								Sale #{sale.id.slice(0, 8)}
							</h3>
						</div>
						<p className="text-gray-600">
							Customer: {sale.customer.name}
						</p>
						<p className="text-gray-600">
							Product: {sale.product.name}
						</p>
						<p className="text-gray-600">
							Quantity: {sale.quantity}
						</p>
						<p className="text-gray-600">
							Total Amount: ${sale.totalAmount.toFixed(2)}
						</p>
						<p className="text-gray-600">
							Date:{" "}
							{new Date(sale.createdAt).toLocaleDateString()}
						</p>
						<div className="flex justify-end items-center pt-2 gap-2">
							<UpdateSaleModal
								sale={sale}
								onSaleUpdated={handleSaleUpdated}
							/>
							<DeleteSaleModal
								saleId={sale.id}
								onSaleDeleted={handleSaleDeleted}
							/>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
