"use client";

import { useState } from "react";
import { ChevronLeft, DollarSign, FileText, ShoppingCart } from "lucide-react";

import { useHistoryBack } from "@/hooks/useHistoryBack";

import { Button } from "../Button";
import CustomerManagement from "./CustomerManagement";
import DebitTransaction from "./DebitTransaction";
import CreditTransaction from "./CreditTransaction";
import TransactionDetails from "./TransactionDetails";

type Customer = {
	id: string;
	name: string;
	email: string;
	phone: string;
	totalPurchases: number;
	totalPaid: number;
	remainingBalance: number;
	transactions: Transaction[];
};

type Transaction = {
	id: string;
	type: "sale" | "payment" | "refund";
	date: string;
	amount: number;
	productId?: string;
	paymentMethod?: "cash" | "credit" | "installment";
	installmentDetails?: {
		totalInstallments: number;
		paidInstallments: number;
		remainingBalance: number;
	};
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

const CustomerDetails = ({
	customer,
	products,
	onClose,
}: {
	customer: Customer;
	products: Product[];
	onClose: () => void;
}) => {
	const [showManageCustomer, setShowManageCustomer] = useState(false);
	const [showDebitTransaction, setShowDebitTransaction] = useState(false);
	const [showCreditTransaction, setShowCreditTransaction] = useState(false);
	const [selectedTransaction, setSelectedTransaction] =
		useState<Transaction | null>(null);

	useHistoryBack(`customer-details-${customer.id}`, onClose);

	const handleAddTransaction = (transaction: Transaction) => {
		// In a real app, this would be an API call
		// For now, we'll simulate adding the transaction
		const newTransaction = {
			...transaction,
			id: `t${customer.transactions.length + 1}`,
		};

		// Update customer's financial details
		const updatedCustomer = {
			...customer,
			transactions: [...customer.transactions, newTransaction],
			totalPurchases:
				transaction.type === "sale"
					? customer.totalPurchases + transaction.amount
					: customer.totalPurchases,
			totalPaid:
				transaction.type === "payment"
					? customer.totalPaid + transaction.amount
					: customer.totalPaid,
			remainingBalance:
				transaction.type === "sale"
					? customer.remainingBalance + transaction.amount
					: transaction.type === "payment"
					? customer.remainingBalance - transaction.amount
					: customer.remainingBalance,
		};

		// Reset transaction popups
		setShowDebitTransaction(false);
		setShowCreditTransaction(false);

		// In a real app, you would update the customer in the database
		console.log("Updated Customer:", updatedCustomer);
	};

	return (
		<div className="fixed inset-0 z-50 bg-white overflow-y-auto animate-slideIn">
			{/* Header */}
			<div className="sticky top-0 bg-white shadow-sm p-4 flex items-center gap-4">
				<Button
					variant="secondary"
					size="sm"
					onClick={onClose}
					className="mr-4">
					<ChevronLeft size={18} />
				</Button>
				<h2
					className="text-xl font-bold cursor-pointer"
					onClick={() => setShowManageCustomer(true)}>
					{customer.name}
				</h2>
			</div>

			{/* Financial Summary */}
			<div className="p-4 bg-gray-100">
				<div className="grid grid-cols-3 gap-2 text-center">
					<div>
						<p className="text-xs text-gray-600">Total Purchases</p>
						<p className="font-bold text-lg">
							${customer.totalPurchases.toFixed(2)}
						</p>
					</div>
					<div>
						<p className="text-xs text-gray-600">Total Paid</p>
						<p className="font-bold text-lg text-green-600">
							${customer.totalPaid.toFixed(2)}
						</p>
					</div>
					<div>
						<p className="text-xs text-gray-600">
							Remaining Balance
						</p>
						<p className="font-bold text-lg text-red-600">
							${customer.remainingBalance.toFixed(2)}
						</p>
					</div>
				</div>
			</div>

			{/* Transactions Section */}
			<div
				className="p-4 pb-20 flex-grow overflow-y-auto overscroll-contain touch-pan-y"
				style={{
					// Prevent pull-to-refresh and bouncy scrolling on iOS
					WebkitOverflowScrolling: "touch",
					overscrollBehavior: "contain",
				}}>
				<h3 className="text-lg font-semibold mb-4 flex items-center">
					<FileText className="mr-2 text-gray-600" />
					Transactions History
				</h3>

				{customer.transactions.map((transaction) => (
					<div
						key={transaction.id}
						onClick={() => setSelectedTransaction(transaction)}
						className="bg-white border rounded-lg p-3 mb-3 shadow-sm flex items-center cursor-pointer hover:bg-gray-50">
						<div className="flex-grow">
							<div className="flex justify-between">
								<span className="font-medium">
									{transaction.type === "sale" &&
										"Product Sale"}
									{transaction.type === "payment" &&
										"Payment Received"}
									{transaction.type === "refund" && "Refund"}
								</span>
								<span
									className={`text-xs px-2 py-1 rounded ${
										transaction.type === "sale"
											? "bg-blue-100 text-blue-800"
											: transaction.type === "payment"
											? "bg-green-100 text-green-800"
											: "bg-red-100 text-red-800"
									}`}>
									{new Date(
										transaction.date
									).toLocaleDateString()}
								</span>
							</div>

							<div className="mt-2 flex justify-between items-center">
								<div>
									{transaction.productId && (
										<p className="text-sm text-gray-600">
											{
												products.find(
													(p) =>
														p.id ===
														transaction.productId
												)?.name
											}
										</p>
									)}
									{transaction.paymentMethod && (
										<p className="text-xs text-gray-500 capitalize">
											{transaction.paymentMethod}
										</p>
									)}
								</div>
								<span
									className={`font-bold ${
										transaction.type === "sale"
											? "text-red-600"
											: transaction.type === "payment"
											? "text-green-600"
											: "text-gray-600"
									}`}>
									{transaction.type === "sale" ? "-" : "+"}$
									{transaction.amount.toFixed(2)}
								</span>
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Quick Actions */}
			<div className="fixed bottom-0 left-0 right-0 px-8 py-4 flex justify-center items-center gap-4">
				<Button
					variant="purchase"
					size="lg"
					className="flex justify-center items-center gap-1 w-full"
					onClick={() => setShowDebitTransaction(true)}>
					<ShoppingCart size={20} className="mb-1" />
					<span className="text-sm font-semibold">Purchase</span>
				</Button>
				<Button
					variant="payment"
					size="lg"
					className="flex justify-center items-center gap-1 w-full"
					onClick={() => setShowCreditTransaction(true)}>
					<DollarSign size={20} className="mb-1" />
					<span className="text-sm font-semibold">Payment</span>
				</Button>
			</div>

			{/* Popups */}
			{showManageCustomer && (
				<CustomerManagement
					customer={customer}
					onClose={() => setShowManageCustomer(false)}
				/>
			)}

			{showDebitTransaction && (
				<DebitTransaction
					customer={customer}
					products={products}
					onClose={() => setShowDebitTransaction(false)}
					onSubmit={handleAddTransaction}
				/>
			)}

			{showCreditTransaction && (
				<CreditTransaction
					customer={customer}
					onClose={() => setShowCreditTransaction(false)}
					onSubmit={handleAddTransaction}
				/>
			)}

			{selectedTransaction && (
				<TransactionDetails
					transaction={selectedTransaction}
					customer={customer}
					products={products}
					onClose={() => setSelectedTransaction(null)}
				/>
			)}
		</div>
	);
};

export default CustomerDetails;
