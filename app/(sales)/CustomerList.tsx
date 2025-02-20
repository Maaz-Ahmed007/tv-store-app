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
						<TableHead>Phone</TableHead>
						<TableHead>Sales</TableHead>
						<TableHead>Balance</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{customers.map((customer) => {
						const totalBalance =
							customer?.sales.reduce(
								(acc, sale) => acc + sale.totalAmount,
								0
							) +
							customer.transactions.reduce((acc, transaction) => {
								return transaction.type === "credit"
									? acc + transaction.amount
									: acc - transaction.amount;
							}, 0);

						return (
							<TableRow
								key={customer.id}
								className="cursor-pointer hover:bg-gray-50"
								onClick={() => handleCustomerClick(customer)}>
								<TableCell>{customer.name}</TableCell>
								<TableCell>{customer.phone || "N/A"}</TableCell>
								<TableCell>{customer.sales.length}</TableCell>
								<TableCell
									className={
										totalBalance >= 0
											? "text-green-500"
											: "text-red-500"
									}>
									{totalBalance >= 0 ? "+" : "-"}$
									{Math.abs(totalBalance).toFixed(2)}
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
					<CustomerSales customer={selectedCustomer} />
				</OverlayPage>
			)}
		</>
	);
}
