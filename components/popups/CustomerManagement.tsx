import { ChevronLeft } from "lucide-react";

import Button from "../Button";
import { useHistoryBack } from "@/hooks/useHistoryBack";

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
	useHistoryBack(`customer-management-${customer.id}`, onClose);

	return (
		<div className="fixed inset-0 z-50 bg-white overflow-y-auto animate-slideIn">
			{/* Header */}
			<div className="sticky top-0 bg-white shadow-sm p-4 flex gap-4 items-center">
				<Button
					variant="secondary"
					size="sm"
					onClick={onClose}
					className="mr-4">
					<ChevronLeft size={18} />
				</Button>
				<h2 className="text-xl font-bold">Manage Customer</h2>
			</div>

			{/* Customer Management Form */}
			<div className="p-4 space-y-4">
				<div className="space-y-3">
					<div>
						<h2 className="block text-sm font-medium text-gray-700">
							Full Name
						</h2>
						<label>{customer.name}</label>
					</div>
					<div>
						<h2 className="block text-sm font-medium text-gray-700">
							Email
						</h2>
						<label>{customer.email}</label>
					</div>
					<div>
						<h2 className="block text-sm font-medium text-gray-700">
							Phone Number
						</h2>
						<label>{customer.phone}</label>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CustomerManagement;
