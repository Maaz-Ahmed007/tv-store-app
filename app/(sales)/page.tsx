import Link from "next/link";
import { RefreshCw } from "lucide-react";

import CustomerList from "./CustomerList";

import { Button } from "@/components/ui/button";
import DashboardWrapper from "@/components/DashboardWrapper";

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
						<Button variant="ghost" size="icon">
							{/* TODO: Add refetching and animation to refresh button within this server component */}
							<RefreshCw />
						</Button>
					</header>
				</div>

				{error ? (
					<p className="p-4 text-red-500">{error.general}</p>
				) : (
					<CustomerList customers={customers} />
				)}

				{/* Display button above bottom nav component and over the customer list */}
				<Link href="/customers/new" passHref>
					<div className="p-4 flex justify-center items-center">
						<Button variant="blue">
							Add Customer
						</Button>
					</div>
				</Link>
			</div>
		</DashboardWrapper>
	);
}
