"use client";

import { useState } from "react";
import { ChevronLeft } from "lucide-react";

import { useHistoryBack } from "@/hooks/useHistoryBack";

import { Button } from "../Button";

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

type Props = {
	customer: Customer;
	onClose: () => void;
	onSubmit: (transaction: Transaction) => void;
};

const CreditTransaction = ({ customer, onClose }: Props) => {
	const [amount, setAmount] = useState("");
	const [paymentMethod, setPaymentMethod] = useState<
		"cash" | "credit" | "installment"
	>("cash");

	const handleSubmit = () => {
		const numericAmount = parseFloat(amount);
		if (isNaN(numericAmount) || numericAmount <= 0) return;
	};

	useHistoryBack(`credit-transaction-${customer.id}`, onClose);

	return (
		<div className="fixed inset-0 z-50 bg-white overflow-y-auto">
			<div className="sticky top-0 bg-white shadow-sm p-4 flex items-center gap-4">
				<Button variant="secondary" size="sm" onClick={onClose}>
					<ChevronLeft size={18} />
				</Button>
				<h2 className="text-xl font-bold">Receive Payment</h2>
			</div>

			<div className="p-4 space-y-4">
				{/* Payment Amount */}
				<div>
					<label className="block text-sm font-medium text-gray-700">
						Payment Amount
					</label>
					<input
						type="number"
						value={amount}
						onChange={(e) => setAmount(e.target.value)}
						placeholder="Enter payment amount"
						className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
					/>
				</div>

				{/* Payment Method */}
				<div>
					<label className="block text-sm font-medium text-gray-700">
						Payment Method
					</label>
					<select
						value={paymentMethod}
						onChange={(e) =>
							setPaymentMethod(
								e.target.value as
									| "cash"
									| "credit"
									| "installment"
							)
						}
						className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
						<option value="cash">Cash</option>
						<option value="bank">Bank Transfer</option>
						<option value="online">Online Payment</option>
					</select>
				</div>

				{/* Submit Button */}
				<Button
					variant="primary"
					className="w-full"
					onClick={handleSubmit}
					disabled={!amount || parseFloat(amount) <= 0}>
					Record Payment
				</Button>
			</div>
		</div>
	);
};

export default CreditTransaction;
