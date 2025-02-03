import { Suspense } from "react";

import DashboardWrapper from "@/components/DashboardWrapper";
import SalesHeader from "./components/SalesHeader";
import CustomerList from "./components/CustomerList";
import AddCustomerButton from "./components/AddCustomerButton";
import CustomerDetailsPopup from "./components/CustomerDetailsPopup";
// import AddCustomerPopup from "./components/add-customer-popup";

export default function SalesPage() {
	return (
		<DashboardWrapper>
			<div className="p-4">
				<SalesHeader />
				<Suspense fallback={<div>Loading...</div>}>
					<CustomerList />
				</Suspense>
				<AddCustomerButton />
			</div>
			<CustomerDetailsPopup />
			{/* <AddCustomerPopup /> */}
		</DashboardWrapper>
	);
}