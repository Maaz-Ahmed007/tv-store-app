import SalesPageContent from "./SalesPageContent";

import DashboardWrapper from "@/components/DashboardWrapper";

// ✅ Actions
import { getCustomers } from "@/actions/customers";

// TODO: Properly implement and finish the sales page and keep it server component
export default async function SalesPage() {
	const { customers, error } = await getCustomers();

	if (error) {
		return <div className="p-4 text-red-500">{error.general}</div>;
	}

	return (
		<DashboardWrapper>
			<SalesPageContent initialCustomers={customers || []} />
		</DashboardWrapper>
	);
}
