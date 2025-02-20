"use client";

import { useState } from "react";
import CustomerList from "./CustomerList";
import AddCustomerButton from "@/components/AddCustomerButton";
import RefreshButton from "@/components/RefreshButton";
import BalanceBox from "@/components/BalanceBox";
import { GetCustomerTypes } from "@/utils/validations";

interface SalesPageContentProps {
	initialCustomers: GetCustomerTypes[];
}

export default function SalesPageContent({
	initialCustomers,
}: SalesPageContentProps) {
	const [selectedBalanceType, setSelectedBalanceType] = useState<
		"credit" | "debit" | null
	>(null);
	const [customers, setCustomers] = useState(initialCustomers);

	const { totalCredit, totalDebit, filteredCustomers } = customers.reduce(
		(acc, customer) => {
			const balance =
				customer.sales.reduce(
					(sum, sale) => sum + sale.totalAmount,
					0
				) +
				customer.transactions.reduce(
					(sum, transaction) =>
						transaction.type === "credit"
							? sum + transaction.amount
							: sum - transaction.amount,
					0
				);

			if (balance > 0) {
				acc.totalCredit += balance;
			} else if (balance < 0) {
				acc.totalDebit += Math.abs(balance);
			}

			if (
				(selectedBalanceType === "credit" && balance > 0) ||
				(selectedBalanceType === "debit" && balance < 0) ||
				!selectedBalanceType
			) {
				acc.filteredCustomers.push(customer);
			}

			return acc;
		},
		{
			totalCredit: 0,
			totalDebit: 0,
			filteredCustomers: [] as GetCustomerTypes[],
		}
	);

	const handleBalanceToggle = (type: "credit" | "debit" | null) => {
		setSelectedBalanceType((prevType) => (prevType === type ? null : type));
	};

	const handleRefresh = async () => {
		const response = await fetch("/api/customers");
		const data = await response.json();
		setCustomers(data.customers);
	};

	return (
		<div>
			<div className="p-4 border-b bg-blue-100">
				<header className="flex justify-between items-center">
					<h1 className="text-2xl font-bold">Sales</h1>
					{/* TODO: Properly give functionality to refresh page */}
					<RefreshButton onRefresh={handleRefresh} />
				</header>
			</div>
		
			{/* TODO: We need to properly style balance boxes */}
			<div className="grid grid-cols-2 gap-4 p-4">
				<BalanceBox
					type="credit"
					amount={totalCredit}
					onToggle={handleBalanceToggle}
					isSelected={selectedBalanceType === "credit"}
				/>
				<BalanceBox
					type="debit"
					amount={totalDebit}
					onToggle={handleBalanceToggle}
					isSelected={selectedBalanceType === "debit"}
				/>
			</div>

			<CustomerList customers={filteredCustomers} />

			<AddCustomerButton onCustomerAdded={handleRefresh} />
		</div>
	);
}
