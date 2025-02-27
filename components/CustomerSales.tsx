import { format } from "date-fns";

import AddSale from "./AddSales";

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

import { calculateCustomerBalance } from "@/utils/calculations";

interface Props {
	customer: GetCustomerTypes;
}

type TransactionType = {
	date: Date;
	type: "sale" | "payment";
	details: string;
	credit: number;
	debit: number;
};

export default function CustomerSales({ customer }: Props) {
	const balance = calculateCustomerBalance(customer);

	//Combine and sort sales and payments
	const transactions: TransactionType[] = [
		...(customer.sales?.map((sale) => ({
			date: new Date(sale.createdAt ?? ""),
			type: "sale" as const,
			details: `Sale #${sale.id.slice(0, 8)}`,
			credit: sale.totalAmount,
			debit: 0,
		})) ?? []),
		...(customer.payments?.map((payment) => ({
			date: new Date(payment.createdAt ?? ""),
			type: "payment" as const,
			details:
				payment.description ?? `Payment #${payment.id.slice(0, 8)}`,
			credit: 0,
			debit: payment.amount,
		})) ?? []),
	].sort((a, b) => b.date.getTime() - a.date.getTime());

	// Calculate running balance
	let runningBalance = 0;
	const transactionWithBalance = transactions
		.reverse()
		.map((transaction) => {
			runningBalance += transaction.credit - transaction.debit;
			return { ...transaction, balance: runningBalance };
		})
		.reverse();

	return (
		<div className="space-y-6">
			<div
				className={`flex items-center justify-center text-2xl font-bold ${
					balance > 0
						? "text-red-600"
						: balance < 0
						? "text-green-600"
						: "text-gray-600"
				}`}>
				Balance: Rs. {balance.toLocaleString()}
			</div>

			<div className="rounded-md border">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[180px]">Date</TableHead>
							<TableHead>Details</TableHead>
							<TableHead className="text-right">Credit</TableHead>
							<TableHead className="text-right">Debit</TableHead>
							<TableHead className="text-right">
								Balance
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{transactionWithBalance.map((transaction, index) => (
							<TableRow key={index}>
								<TableCell className="font-medium">
									{format(transaction.date, "PPP")}
								</TableCell>
								<TableCell>{transaction.details}</TableCell>
								<TableCell className="text-right text-red-600">
									{transaction.credit > 0
										? `Rs. ${transaction.credit.toLocaleString()}`
										: "-"}
								</TableCell>
								<TableCell className="text-right text-green-600">
									{transaction.debit > 0
										? `Rs. ${transaction.debit.toLocaleString()}`
										: "-"}
								</TableCell>
								<TableCell
									className={`text-right font-medium ${
										transaction.balance > 0
											? "text-red-600"
											: transaction.balance < 0
											? "text-green-600"
											: "text-gray-600"
									}`}>
									Rs. {transaction.balance.toLocaleString()}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>

			<div className="fixed bottom-10 left-0 right-0 p-4 flex justify-center items-center space-x-4">
				{/* TODO: Add sale will open AddSale Overlay page. */}
				{/* <Button variant="blue" onClick={() => setIsAddingSale(true)}>
					Add Sale
				</Button> */}
			</div>

			{/* {isAddingSale && (
				<AddSale
					customerId={customer.id}
					onClose={() => setIsAddingSale(false)}
				/>
			)} */}
		</div>
	);
}
