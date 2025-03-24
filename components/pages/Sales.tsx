"use client";

import { useState } from "react";
import { ChevronLeft } from "lucide-react";

import CustomerDetailsModal from "../modals/CustomerDetails";

type Customer = {
	id: string;
	name: string;
	email: string;
	phone: string;
	totalPurchases: number;
	remainingPayment: number;
	transactions: Transaction[];
};

type Product = {
	id: string;
	name: string;
	brand: string;
	model: string;
	price: number;
	stock: number;
	imageUrl: string;
};

type Transaction = {
	id: string;
	customerId: string;
	productId: string;
	date: string;
	amount: number;
	isPaid: boolean;
};

export default function SalesPage({
	customers,
	products,
}: {
	customers: Customer[];
	products: Product[];
}) {
	const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
		null
	);

	return (
		<div className="p-4 space-y-4">
			{/* Customer List */}
			<div className="space-y-3">
				{customers.map((customer) => (
					<div
						key={customer.id}
						onClick={() => setSelectedCustomer(customer)}
						className="bg-white rounded-lg shadow-md p-4 flex justify-between items-center hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1">
						<div>
							<h3 className="font-semibold text-gray-800">
								{customer.name}
							</h3>
							<p className="text-sm text-gray-500">
								Remaining: ${customer.remainingPayment}
							</p>
						</div>
						<ChevronLeft className="text-gray-400" />
					</div>
				))}
			</div>

			{/* Customer Details Modal */}
			{selectedCustomer && (
				<CustomerDetailsModal
					customer={selectedCustomer}
					products={products}
					onClose={() => setSelectedCustomer(null)}
				/>
			)}
		</div>
	);
}
