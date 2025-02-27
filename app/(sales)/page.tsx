import CustomerList from "./CustomerList";

import RefreshButton from "@/components/RefreshButton";
import DashboardWrapper from "@/components/DashboardWrapper";
import AddCustomerButton from "@/components/AddCustomerButton";

// ✅ Actions
import { getCustomers } from "@/actions/customers";

// ✅ Calcutions for total combined balance of all customers
import { calculateTotalBalance } from "@/utils/calculations";

export default async function SalesPage() {
	const { customers, error } = await getCustomers();

	const totalBalance = calculateTotalBalance(customers || []);

	return (
		<DashboardWrapper>
			<div className="p-4 border-b bg-blue-100">
				<header className="flex justify-between items-center">
					<h1 className="text-2xl font-bold">Sales</h1>
					<RefreshButton />
				</header>
			</div>
			{/* TODO: Total Balance */}
			<div className="flex items-center justify-center">
				Total Balance: Rs. {totalBalance}
			</div>
			{/* TOOD: PDF/share to whatsapp button */}
			{/* TODO: Sorting customer list */}
			{/* TODO: Searchbox component for searching customer names and sorting customer list accordingly */}
			{error ? (
				<p className="text-red-500 p-4">{error.general}</p>
			) : (
				<CustomerList customers={customers} />
			)}

			<AddCustomerButton />
		</DashboardWrapper>
	);
}
