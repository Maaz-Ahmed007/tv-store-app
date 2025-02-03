"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

export default function AddCustomerButton() {
	const router = useRouter();

	const handleAddCustomer = () => {
		router.push("/sales/add-customer");
	};

	return (
		<Button
			className="fixed bottom-20 left-4 right-4 z-10"
			onClick={handleAddCustomer}>
			Add Customer
		</Button>
	);
}