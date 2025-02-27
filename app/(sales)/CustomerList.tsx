"use client";

import { useState } from "react";

import OverlayPage from "@/components/OverlayPage";
import CustomerSales from "@/components/CustomerSales";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

// ✅ Customer Validations Types
import { GetCustomerTypes } from "@/utils/validations";

// ✅ Calculations
import { calculateCustomerFinalBalance } from "@/utils/calculations";

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
			<Table>
				<TableHeader>
					<TableRow>
						{/* TODO: Only display names and fetch and calculate final balance of each customer */}
						{/* TODO: We don't need heading in customer list */}
						{/* TODO: Style the table to look more better and mobile styled */}
						{/* TODO: Add search bar for customer names */}
						{/* TODO: Sorting panel for customer list */}
						<TableHead>Name</TableHead>
						<TableHead>Balance</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{customers.map((customer) => {
						const balance = calculateCustomerFinalBalance(customer);

						return (
							<TableRow
								key={customer.id}
								className="cursor-pointer hover:bg-gray-50"
								onClick={() => handleCustomerClick(customer)}>
								<TableCell>{customer.name}</TableCell>
								<TableCell
									className={
										balance >= 0
											? "text-green-600"
											: "text-red-600"
									}>
									Rs. {Math.abs(balance)}
								</TableCell>
							</TableRow>
						);
					})}
				</TableBody>
			</Table>

			{selectedCustomer && (
				<OverlayPage
					title={selectedCustomer.name}
					onClose={handleCloseOverlay}>
					<CustomerSales customer={selectedCustomer || []} />
				</OverlayPage>
			)}
		</>
	);
}
