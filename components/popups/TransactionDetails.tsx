import { ChevronLeft } from "lucide-react";

import { useHistoryBack } from "@/hooks/useHistoryBack";

import {Button} from "../Button";

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

type Props = {
	transaction: Transaction;
	customer: Customer;
	products: Product[];
	onClose: () => void;
};

const TransactionDetails = ({
	transaction,
	customer,
	products,
	onClose,
}: Props) => {
	const product = transaction.productId
		? products.find((p) => p.id === transaction.productId)
		: null;

	useHistoryBack(`transaction-details-${customer.id}`, onClose);

	return (
		<div className="fixed inset-0 z-50 bg-white overflow-y-auto">
			<div className="sticky top-0 bg-white shadow-sm p-4 flex items-center gap-4">
				<Button variant="secondary" size="sm" onClick={onClose}>
					<ChevronLeft size={18} />
				</Button>
				<h2 className="text-xl font-bold">Transaction Details</h2>
			</div>

			<div className="p-4 space-y-4">
				<div className="bg-gray-100 p-4 rounded-lg">
					<div className="flex justify-between mb-2">
						<span className="font-medium">Transaction Type</span>
						<span
							className={`capitalize ${
								transaction.type === "sale"
									? "text-red-600"
									: "text-green-600"
							}`}>
							{transaction.type}
						</span>
					</div>
					<div className="flex justify-between mb-2">
						<span className="font-medium">Date</span>
						<span>
							{new Date(transaction.date).toLocaleDateString()}
						</span>
					</div>
					<div className="flex justify-between mb-2">
						<span className="font-medium">Amount</span>
						<span
							className={
								transaction.type === "sale"
									? "text-red-600"
									: "text-green-600"
							}>
							{transaction.type === "sale" ? "-" : "+"}$
							{transaction.amount.toFixed(2)}
						</span>
					</div>
					{product && (
						<div className="flex justify-between mb-2">
							<span className="font-medium">Product</span>
							<span>{product.name}</span>
						</div>
					)}
					{transaction.paymentMethod && (
						<div className="flex justify-between mb-2">
							<span className="font-medium">Payment Method</span>
							<span className="capitalize">
								{transaction.paymentMethod}
							</span>
						</div>
					)}
					{transaction.installmentDetails && (
						<div>
							<div className="flex justify-between mb-2">
								<span className="font-medium">
									Installment Plan
								</span>
								<span>
									{
										transaction.installmentDetails
											.paidInstallments
									}{" "}
									/
									{
										transaction.installmentDetails
											.totalInstallments
									}
								</span>
							</div>
							<div className="bg-gray-300 rounded-full h-2 mt-1">
								<div
									className="bg-blue-500 rounded-full h-2"
									style={{
										width: `${
											(transaction.installmentDetails
												.paidInstallments /
												transaction.installmentDetails
													.totalInstallments) *
											100
										}%`,
									}}
								/>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default TransactionDetails;
