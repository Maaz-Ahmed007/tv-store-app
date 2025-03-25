"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
	ChevronLeft,
	CreditCard,
	DollarSign,
	FileText,
	MoreVertical,
	ShoppingCart,
} from "lucide-react";

import Button from "../Button";
import CustomerManagement from "../CustomerManagement";

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

const CustomerDetailsModal = ({
	customer,
	products,
	onClose,
}: {
	customer: Customer;
	products: Product[];
	onClose: () => void;
}) => {
	const router = useRouter();
	const searchParams = useSearchParams();

	// Check if manage customer view is active
	const showManageCustomer = searchParams.get("manage") === "true";

	// Function to open manage customer view
	const openManageCustomer = () => {
		const params = new URLSearchParams(searchParams.toString());
		params.set("manage", "true");
		router.push(`?${params.toString()}`);
	};

	// Function to close manage customer view
	const closeManageCustomer = () => {
		const params = new URLSearchParams(searchParams.toString());
		params.delete("manage");
		router.push(`?${params.toString()}`);
	};

	return (
		<div className="fixed inset-0 z-50 bg-white overflow-y-auto animate-slideIn">
			{/* Header */}
			<div className="sticky top-0 bg-white shadow-sm p-4 flex items-center justify-between">
				<Button
					variant="secondary"
					size="sm"
					onClick={onClose}
					className="mr-4">
					<ChevronLeft size={18} />
				</Button>
				<h2 className="text-xl font-bold">{customer.name}</h2>
				<Button
					variant="secondary"
					size="sm"
					onClick={openManageCustomer}
					className="ml-2">
					<MoreVertical size={18} />
				</Button>
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
						<p className="text-xs text-gray-600">Remaining</p>
						<p className="font-bold text-lg text-red-600">
							${customer.remainingBalance.toFixed(2)}
						</p>
					</div>
				</div>
			</div>

			{/* Transactions Section */}
			<div className="p-4">
				<h3 className="text-lg font-semibold mb-4 flex items-center">
					<FileText className="mr-2 text-gray-600" />
					Transactions History
				</h3>

				{customer.transactions.map((transaction) => (
					<div
						key={transaction.id}
						className="
              bg-white 
              border 
              rounded-lg 
              p-3 
              mb-3 
              shadow-sm 
              flex 
              items-center
            ">
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
									className={`
                    text-xs 
                    px-2 
                    py-1 
                    rounded 
                    ${
						transaction.type === "sale"
							? "bg-blue-100 text-blue-800"
							: transaction.type === "payment"
							? "bg-green-100 text-green-800"
							: "bg-red-100 text-red-800"
					}
                  `}>
									{transaction.date}
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
									className={`
                    font-bold 
                    ${
						transaction.type === "sale"
							? "text-red-600"
							: transaction.type === "payment"
							? "text-green-600"
							: "text-gray-600"
					}
                  `}>
									{transaction.type === "sale" ? "-" : "+"}$
									{transaction.amount.toFixed(2)}
								</span>
							</div>

							{transaction.installmentDetails && (
								<div className="mt-2 bg-gray-100 rounded p-2">
									<div className="flex justify-between text-xs">
										<span>Installments</span>
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
									<div className="mt-1 bg-gray-300 rounded-full h-2">
										<div
											className="bg-blue-500 rounded-full h-2"
											style={{
												width: `${
													(transaction
														.installmentDetails
														.paidInstallments /
														transaction
															.installmentDetails
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
				))}
			</div>

			{/* Quick Actions */}
			<div className="p-4 grid grid-cols-3 gap-3">
				<Button
					variant="secondary"
					className="flex flex-col items-center py-3">
					<CreditCard className="mb-1" />
					<span className="text-xs">New Payment</span>
				</Button>
				<Button
					variant="secondary"
					className="flex flex-col items-center py-3">
					<ShoppingCart className="mb-1" />
					<span className="text-xs">New Sale</span>
				</Button>
				<Button
					variant="secondary"
					className="flex flex-col items-center py-3">
					<DollarSign className="mb-1" />
					<span className="text-xs">Installment Plan</span>
				</Button>
			</div>

			{/* Customer Management Popup */}
			{showManageCustomer && (
				<CustomerManagement
					customer={customer}
					onClose={closeManageCustomer}
				/>
			)}
		</div>
	);
};

export default CustomerDetailsModal;
