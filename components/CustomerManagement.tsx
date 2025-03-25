"use client"

import { useEffect } from "react";
import { ChevronLeft } from "lucide-react";

import Button from "./Button";

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

const CustomerManagement = ({
	customer,
	onClose,
}: {
	customer: Customer;
	onClose: () => void;
}) => {
	// Handle browser back button
	useEffect(() => {
		console.log("useEffect initialized");
		const handlePopState = () => {
			console.log("useEffect function");
			// If the URL no longer has the manage parameter, close the management view
			if (!window.location.search.includes("manage=true")) {
				onClose();
			}
		};

		window.addEventListener("popstate", handlePopState);
		return () => window.removeEventListener("popstate", handlePopState);
	}, [onClose]);

	return (
		<div className="fixed inset-0 z-50 bg-white overflow-y-auto animate-slideIn">
			{/* Header */}
			<div className="sticky top-0 bg-white shadow-sm p-4 flex gap-4 items-center">
				<Button
					variant="secondary"
					size="sm"
					onClick={onClose}
					className="mr-4">
					<ChevronLeft />
				</Button>
				<h2 className="text-xl font-bold">Manage Customer</h2>
			</div>

			{/* Customer Management Form */}
			<div className="p-4 space-y-4">
				<div className="space-y-3">
					<div>
						<label className="block text-sm font-medium text-gray-700">
							Full Name
						</label>
						<input
							type="text"
							defaultValue={customer.name}
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700">
							Email
						</label>
						<input
							type="email"
							defaultValue={customer.email}
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700">
							Phone Number
						</label>
						<input
							type="tel"
							defaultValue={customer.phone}
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CustomerManagement;
