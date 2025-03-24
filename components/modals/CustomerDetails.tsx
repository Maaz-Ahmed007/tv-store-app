type Customer = {
	id: string;
	name: string;
	phone: string;
	totalPurchases: number;
	remainingPayment: number;
};

const CustomerDetailsModal = ({
	customer,
	onClose,
}: {
	customer: Customer;
	onClose: () => void;
}) => {
	return (
		<div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center p-4">
			<div className="bg-white rounded-lg w-full max-w-md max-h-[80vh] overflow-y-auto">
				<div className="p-4 border-b flex justify-between items-center">
					<h2 className="text-xl font-bold text-gray-700">{customer.name}</h2>
					<button onClick={onClose} className="text-gray-500">
						Close
					</button>
				</div>

				<div className="p-4">
					<div className="mb-4">
						<p className="text-gray-600">Phone: {customer.phone}</p>
						<p className="text-gray-600">
							Total Purchases: ${customer.totalPurchases}
						</p>
						<p className="text-red-500">
							Remaining Payment: ${customer.remainingPayment}
						</p>
					</div>

					{/* Transactions Section */}
					<h3 className="font-semibold mb-2 text-gray-800">Recent Transactions</h3>
					<div className="space-y-2">
						{/* Sample Transaction Items */}
						<div className="bg-gray-100 p-2 rounded flex justify-between text-gray-600">
							<span>TV Purchase</span>
							<span className="text-green-500">$1000</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CustomerDetailsModal;
