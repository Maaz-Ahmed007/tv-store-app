"use client";

import { useState } from "react";

import OverlayPage from "./OverlayPage";
import CustomerForm from "./forms/CustomerForm";

import { Button } from "@/components/ui/button";

export default function AddCustomerButton() {
	const [isAddingCustomer, setIsAddingCustomer] = useState(false);

	const handleAddCustomer = () => {
		setIsAddingCustomer(true);
	};

	const handleCloseOverlay = () => {
		setIsAddingCustomer(false);
	};

	return (
		<>
			<div className="fixed bottom-16 left-0 right-0 p-4 flex justify-center items-center">
				<Button variant="blue" onClick={handleAddCustomer}>
					Add Customer
				</Button>
			</div>

			{isAddingCustomer && (
				<OverlayPage title="Add Customer" onClose={handleCloseOverlay}>
					<CustomerForm onSuccess={handleCloseOverlay} />
				</OverlayPage>
			)}
		</>
	);
}
