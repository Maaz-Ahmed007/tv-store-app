"use client";

import { useState } from "react";

import OverlayPage from "@/components/OverlayPage";
import CustomerDetails from "@/components/CustomerDetails";

// ✅ Customer Validations Types
import { GetCustomerTypes } from "@/utils/validations";

interface Props {
	customers: GetCustomerTypes[];
}

export default function CustomerList({ customers }: Props) {
	const [selectedCustomer, setSelectedCustomer] =
		useState<GetCustomerTypes | null>(null);

	const handleCustomerClick = (customer: GetCustomerTypes) => {
		setSelectedCustomer(customer);
	};

	const handleCloseOverlay = () => {
		setSelectedCustomer(null);
	};

	return (
		<>
			<div className="space-y-4">
				{/* TODO: We will display customers in table with name, sales and balance amount */}
				{/* TODO: Create individual customer page that will open when user clicks on customers */}
				<table className="w-full">
					<thead>
						<tr className="bg-gray-100">
							<th className="p-2 text-left">Name</th>
							<th className="p-2 text-left">Sales</th>
							<th className="p-2 text-left">Balance</th>
						</tr>
					</thead>
					<tbody>
						{customers.map((customer) => (
							<tr
								key={customer.id}
								className="border-b cursor-pointer hover:bg-gray-50"
								onClick={() => handleCustomerClick(customer)}>
								<td className="p-2">{customer.name}</td>
								<td className="p-2">
									{customer.sales?.length || 0}
								</td>
								<td className="p-2">
									{customer.sales
										?.reduce(
											(total, sale) =>
												total + sale.totalAmount,
											0
										)
										.toFixed(2) || "0.00"}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{selectedCustomer && (
				<OverlayPage
					title="Customer Details"
					onClose={handleCloseOverlay}>
					<CustomerDetails customer={selectedCustomer} />
				</OverlayPage>
			)}
		</>
	);
}
