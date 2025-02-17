import CustomerList from "./CustomerList";

import RefreshButton from "@/components/RefreshButton";
import DashboardWrapper from "@/components/DashboardWrapper";
import AddCustomerButton from "@/components/AddCustomerButton";

// ✅ Actions
import { getCustomers } from "@/actions/customers";

export default async function SalesPage() {
	const { customers, error } = await getCustomers();

	return (
		<DashboardWrapper>
			<div>
				<div className="p-4 border-b bg-blue-100">
					<header className="flex justify-between items-center">
						<h1 className="text-2xl font-bold">Sales</h1>
						<RefreshButton />
					</header>
				</div>

				{error ? (
					<p className="p-4 text-red-500">{error.general}</p>
				) : (
					<CustomerList customers={customers || []} />
				)}

				<AddCustomerButton />
			</div>
		</DashboardWrapper>
	);
}
