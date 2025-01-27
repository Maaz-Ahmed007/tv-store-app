"use client";

import { useState, useEffect } from "react";
import { getExpenses } from "@/actions/expense-actions";
import type { ExpenseTypes } from "@/lib/validations/expense-validations";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

// Modals

export default function ExpenseList() {
	const [expenses, setExpenses] = useState<ExpenseTypes[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		fetchExpenses();
	}, []);

	async function fetchExpenses() {
		setIsLoading(true);
		setError(null);
		try {
			const result = await getExpenses();
			if (result.success && result.expenses) {
				setExpenses(result.expenses);
			} else {
				setError("Failed to fetch expenses");
			}
		} catch (err) {
			setError("An unexpected error occurred");
			console.error(err);
		} finally {
			setIsLoading(false);
		}
	}

	const handleExpenseCreated = (newExpense: ExpenseTypes) => {
		setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
	};

	const handleExpenseUpdated = (updatedExpense: ExpenseTypes) => {
		setExpenses((prevExpenses) =>
			prevExpenses.map((expense) =>
				expense.id === updatedExpense.id ? updatedExpense : expense
			)
		);
	};

	const handleExpenseDeleted = (deletedExpenseId: string) => {
		setExpenses((prevExpenses) =>
			prevExpenses.filter((expense) => expense.id !== deletedExpenseId)
		);
	};

	if (isLoading) return <div>Loading expenses...</div>;
	if (error) return <div className="text-red-500">Error: {error}</div>;

	return (
		<div>
			<div className="flex justify-between items-center mb-4">
				<h2 className="text-xl font-semibold">Expenses</h2>
				{/* <CreateSaleModal onSaleCreated={handleSaleCreated} /> */}
			</div>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Details</TableHead>
						<TableHead>Date</TableHead>
						<TableHead>Amount</TableHead>
						<TableHead className="text-right">Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{expenses.map((expense) => (
						<TableRow key={expense.id}>
							<TableCell className="font-medium">
								{expense.details ? expense.details : "Expense"}
							</TableCell>
							<TableCell>
								{new Date(expense.date).toLocaleDateString()}
							</TableCell>
							<TableCell>${expense.amount.toFixed(2)}</TableCell>
							<TableCell className="text-right">
								{/* <UpdateCustomerModal
									customer={customer}
									onCustomerUpdated={handleCustomerUpdated}
								/>
								<DeleteCustomerModal
									customerId={customer.id}
									customerName={customer.name}
									onCustomerDeleted={handleCustomerDeleted}
								/> */}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
