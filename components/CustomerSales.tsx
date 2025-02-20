"use client";

import { useState } from "react";
import { format } from "date-fns";

import AddSale from "./AddSales";
import AddTransaction from "./AddTransaction";

import { Button } from "@/components/ui/button";
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
	customer: GetCustomerTypes;
}

export default function CustomerSales({ customer }: Props) {
	const [isAddingSale, setIsAddingSale] = useState(false);
	const [isAddingCredit, setIsAddingCredit] = useState(false);
	const [isAddingDebit, setIsAddingDebit] = useState(false);

	// Calculate total balance
	// TODO: We need a proper and correct way to calculate final balance without any errors
	const totalBalance =
		customer.sales.reduce((acc, sale) => acc + sale.totalAmount, 0) +
		customer.transactions.reduce((acc, transaction) => {
			return transaction.type === "credit"
				? acc + transaction.amount
				: acc - transaction.amount;
		}, 0);

	const isCredit = totalBalance >= 0;

	return (
		<div className="space-y-6">
			<div
				className={`flex items-center justify-center text-2xl font-bold`}>
				Balance:
				<span
					className={`${
						isCredit ? "text-green-500" : "text-red-500"
					}`}>
					{Math.abs(totalBalance)}
				</span>
			</div>

			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Date</TableHead>
						<TableHead>Type</TableHead>
						<TableHead>Details</TableHead>
						<TableHead>Credit</TableHead>
						<TableHead>Debit</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{/* TODO: For empty row we won't use "-" but leave it empty */}
					{/* TODO: We don't need type column */}
					{/* TODO: Same styled used for balance box we will display balance here without the sorting functionality */}
					{/* TODO: We will add PDF that will collect and download all the data for a customer */}
					{/* TODO: We will add a whatsapp sharing button that will take number from customer and directly send data to that whatsapp contact */}
					{/* TODO: We will display date column, details, balance, debit and then credit column in order */}
					{/* TODO: Make sure correct types are fetched and correct data is displayed */}
					{/* TODO: Add cursor pointer to each entry and when clicked individual transaction overlay page should open */}
					{/* TODO: Create transaction overlay page */}
					{/* TODO: Use this date format for all website: {format( new Date(item.createdAt), "dd/MM/yyyy" )} */}
					{[...customer.sales, ...customer.transactions]
						.sort(
							(a, b) =>
								new Date(b.createdAt).getTime() -
								new Date(a.createdAt).getTime()
						)
						.map((item) => (
							<TableRow key={item.id}>
								<TableCell>
									{format(
										new Date(item.createdAt),
										"dd/MM/yyyy"
									)}
								</TableCell>
								<TableCell>
									{"type" in item ? item.type : "Sale"}
								</TableCell>
								<TableCell>
									{"items" in item
										? `${item.items.length} product(s)`
										: item.description || "-"}
								</TableCell>
								<TableCell>
									{"type" in item && item.type === "credit"
										? `$${item.amount.toFixed(2)}`
										: "totalAmount" in item
										? `$${item.totalAmount.toFixed(2)}`
										: "-"}
								</TableCell>
								<TableCell>
									{"type" in item && item.type === "debit"
										? `$${item.amount.toFixed(2)}`
										: "-"}
								</TableCell>
							</TableRow>
						))}
				</TableBody>
			</Table>

			<div className="fixed bottom-10 left-0 right-0 p-4 flex justify-center items-center space-x-4">
				{/* TODO: Add sale will open AddSale Overlay page. */}
				<Button variant="blue" onClick={() => setIsAddingSale(true)}>
					Add Sale
				</Button>
				{/* TODO: Add Credit will open AddTransaction Overlay page. */}
				<Button
					variant="outlineIcon"
					onClick={() => setIsAddingCredit(true)}>
					Add Credit
				</Button>
				{/* TODO: Add Debit will open AddTransaction Overlay page. */}
				<Button variant="red" onClick={() => setIsAddingDebit(true)}>
					Add Debit
				</Button>
			</div>

			{isAddingSale && (
				<AddSale
					customerId={customer.id}
					onClose={() => setIsAddingSale(false)}
				/>
			)}

			{isAddingCredit && (
				<AddTransaction
					customerId={customer.id}
					type="credit"
					onClose={() => setIsAddingCredit(false)}
				/>
			)}

			{isAddingDebit && (
				<AddTransaction
					customerId={customer.id}
					type="debit"
					onClose={() => setIsAddingDebit(false)}
				/>
			)}
		</div>
	);
}
