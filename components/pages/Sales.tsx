"use client";

import { useEffect, useState } from "react";
import { ChevronLeft } from "lucide-react";

import CustomerDetails from "../popups/CustomerDetails";
import ExitConfirmaModal from "../modals/ExitConformModal";

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

export default function SalesPage({
	customers,
	products,
}: {
	customers: Customer[];
	products: Product[];
}) {
	const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
		null
	);
	const [showExitConfirmation, setShowExitConfirmation] = useState(false);

	// Handle back button on main page
	useEffect(() => {
		// Only add the event listener if no customer is selected
		if (!selectedCustomer) {
			const handleBeforeUnload = (e: BeforeUnloadEvent) => {
				// Show confirmation dialog when user tries to leave the page
				e.preventDefault();
				e.returnValue = "";
				return "";
			};

			// Add event listener for page unload
			window.addEventListener("beforeunload", handleBeforeUnload);

			// Add event listener for back button
			const handlePopState = () => {
				// Prevent default navigation
				window.history.pushState(null, "", window.location.href);
				// Show our custom confirmation modal
				setShowExitConfirmation(true);
			};

			// Push initial state to prevent immediate back navigation
			window.history.pushState(null, "", window.location.href);
			window.addEventListener("popstate", handlePopState);

			return () => {
				window.removeEventListener("beforeunload", handleBeforeUnload);
				window.removeEventListener("popstate", handlePopState);
			};
		}
	}, [selectedCustomer]);

	// Handle exit confirmation
	const handleExitConfirm = () => {
		// Navigate away from the app
		window.location.href = "/"; // Or any other destination
	};

	const handleExitCancel = () => {
		setShowExitConfirmation(false);
		// Push state again to reset the history
		window.history.pushState(null, "", window.location.href);
	};

	return (
		<div className="p-4 space-y-4 pb-[90px]">
			{/* Customer List */}
			<div className="space-y-3">
				{customers.map((customer) => (
					<div
						key={customer.id}
						onClick={() => setSelectedCustomer(customer)}
						className="bg-white rounded-lg shadow-md p-4 flex justify-between items-center hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1">
						<div>
							<h3 className="font-semibold text-gray-800">
								{customer.name}
							</h3>
							<p className="text-sm text-gray-500">
								Remaining: ${customer.remainingBalance}
							</p>
						</div>
						<ChevronLeft className="text-gray-400" />
					</div>
				))}
			</div>

			{/* Customer Details Popup */}
			{selectedCustomer && (
				<CustomerDetails
					customer={selectedCustomer}
					products={products}
					onClose={() => setSelectedCustomer(null)}
				/>
			)}

			{/* Exit Confirmation Modal */}
			<ExitConfirmaModal
				isOpen={showExitConfirmation}
				onConfirm={handleExitConfirm}
				onCancel={handleExitCancel}
			/>
		</div>
	);
}
