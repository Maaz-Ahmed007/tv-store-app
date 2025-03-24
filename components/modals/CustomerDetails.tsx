import { ChevronLeft } from "lucide-react";
import Button from "../Button";

type Customer = {
	id: string;
	name: string;
	email: string;
	phone: string;
	totalPurchases: number;
	remainingPayment: number;
	transactions: Transaction[];
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

type Transaction = {
	id: string;
	customerId: string;
	productId: string;
	date: string;
	amount: number;
	isPaid: boolean;
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
	return (
		<div className="fixed inset-0 z-50 bg-white overflow-y-auto animate-slideIn">
			{/* Header */}
			<div className="sticky top-0 bg-white shadow-sm p-4 flex items-center gap-4">
				<Button
					variant="secondary"
					size="sm"
					onClick={onClose}
					className="mr-4">
					<ChevronLeft />
				</Button>
				<h2 className="text-xl font-bold">{customer.name}</h2>
			</div>

			{/* Customer Details */}
			<div className="p-4 space-y-4">
				<div className="bg-gray-100 rounded-lg p-4">
					<div className="flex justify-between mb-2">
						<span className="text-gray-600">Phone</span>
						<span className="font-semibold">{customer.phone}</span>
					</div>
					<div className="flex justify-between mb-2">
						<span className="text-gray-600">Email</span>
						<span className="font-semibold">{customer.email}</span>
					</div>
					<div className="flex justify-between">
						<span className="text-gray-600">Total Purchases</span>
						<span className="font-semibold">
							${customer.totalPurchases}
						</span>
					</div>
				</div>

				{/* Transactions */}
				<div>
					<h3 className="text-lg font-semibold mb-3">Transactions</h3>
					{customer.transactions.map((transaction) => (
						<div
							key={transaction.id}
							className="bg-white rounded-lg shadow-md p-3 mb-3 flex justify-between items-center">
							<div>
								<p className="font-semibold">
									{
										products.find(
											(p) =>
												p.id === transaction.productId
										)?.name
									}
								</p>
								<p className="text-sm text-gray-500">
									{transaction.date}
								</p>
							</div>
							<span
								className={`px-2 py-1 rounded-full text-xs ${
									transaction.isPaid
										? "bg-green-100 text-green-800"
										: "bg-red-100 text-red-800"
								}`}>
								{transaction.isPaid ? "Paid" : "Pending"}
							</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default CustomerDetailsModal;
