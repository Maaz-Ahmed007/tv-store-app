"use client";

import { useState } from "react";

import CustomerDetailsModal from "../modals/CustomerDetails";

type Customer = {
	id: string;
	name: string;
	phone: string;
	totalPurchases: number;
	remainingPayment: number;
};

export default function SalesPage() {
	const [customers] = useState<Customer[]>([
		{
			id: "1",
			name: "John Doe",
			phone: "123-456-7890",
			totalPurchases: 5000,
			remainingPayment: 1500,
		},
		// More sample customers...
	]);

	const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
		null
	);

	return (
		<div>
			<h1 className="text-2xl font-bold mb-4 text-black">
				Customer Sales
			</h1>

			{/* Customer List */}
			<div className="space-y-2">
				{customers.map((customer) => (
					<div
						key={customer.id}
						onClick={() => setSelectedCustomer(customer)}
						className="bg-white p-3 rounded-lg shadow-sm flex justify-between items-center">
						<div>
							<h3 className="font-semibold text-gray-700">
								{customer.name}
							</h3>
							<p className="text-sm text-gray-500">
								Remaining: ${customer.remainingPayment}
							</p>
						</div>
						<span className="text-blue-500">Details</span>
					</div>
				))}
			</div>

			{/* Customer Details Modal */}
			{selectedCustomer && (
				<CustomerDetailsModal
					customer={selectedCustomer}
					onClose={() => setSelectedCustomer(null)}
				/>
			)}
		</div>
	);
}
