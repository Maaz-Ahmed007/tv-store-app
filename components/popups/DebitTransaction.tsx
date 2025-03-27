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
	customer: Customer;
	products: Product[];
	onClose: () => void;
	onSubmit: (transaction: Transaction) => void;
};

const DebitTransaction = ({ customer, products, onClose }: Props) => {
	const [selectedProduct, setSelectedProduct] = useState<Product | null>(
		null
	);
	const [quantity, setQuantity] = useState(1);
	const [paymentMethod, setPaymentMethod] = useState<
		"cash" | "credit" | "installment"
	>("cash");
	const [installmentDetails, setInstallmentDetails] = useState({
		totalInstallments: 1,
		initialPayment: 0,
	});

	const handleSubmit = () => {
		if (!selectedProduct) return;
	};

	useHistoryBack(`debit-transaction-${customer.id}`, onClose);

	return (
		<div className="fixed inset-0 z-50 bg-white overflow-y-auto">
			<div className="sticky top-0 bg-white shadow-sm p-4 flex items-center gap-4">
				<Button variant="secondary" size="sm" onClick={onClose}>
					<ChevronLeft size={18} />
				</Button>
				<h2 className="text-xl font-bold">New Sale</h2>
			</div>

			<div className="p-4 space-y-4">
				{/* Product Selection */}
				<div>
					<label className="block text-sm font-medium text-gray-700">
						Select Product
					</label>
					<select
						value={selectedProduct?.id || ""}
						onChange={(e) => {
							const product = products.find(
								(p) => p.id === e.target.value
							);
							setSelectedProduct(product || null);
						}}
						className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
						<option value="">Select a Product</option>
						{products.map((product) => (
							<option key={product.id} value={product.id}>
								{product.name} - ${product.price}
							</option>
						))}
					</select>
				</div>

				{/* Quantity */}
				<div>
					<label className="block text-sm font-medium text-gray-700">
						Quantity
					</label>
					<input
						type="number"
						value={quantity}
						onChange={(e) => setQuantity(Number(e.target.value))}
						min="1"
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
							setPaymentMethod(e.target.value as any)
						}
						className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
						<option value="cash">Cash</option>
						<option value="credit">Credit</option>
						<option value="installment">Installment</option>
					</select>
				</div>

				{/* Installment Details */}
				{paymentMethod === "installment" && (
					<div className="space-y-2">
						<div>
							<label className="block text-sm font-medium text-gray-700">
								Total Installments
							</label>
							<input
								type="number"
								value={installmentDetails.totalInstallments}
								onChange={(e) =>
									setInstallmentDetails((prev) => ({
										...prev,
										totalInstallments: Number(
											e.target.value
										),
									}))
								}
								min="1"
								className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700">
								Initial Payment
							</label>
							<input
								type="number"
								value={installmentDetails.initialPayment}
								onChange={(e) =>
									setInstallmentDetails((prev) => ({
										...prev,
										initialPayment: Number(e.target.value),
									}))
								}
								min="0"
								className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
							/>
						</div>
					</div>
				)}

				{/* Submit Button */}
				<Button
					variant="primary"
					className="w-full"
					onClick={handleSubmit}
					disabled={!selectedProduct}>
					Record Sale
				</Button>
			</div>
		</div>
	);
};

export default DebitTransaction;
