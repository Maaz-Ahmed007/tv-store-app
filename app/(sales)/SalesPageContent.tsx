"use client";

import { useState } from "react";

import CustomerList from "./CustomerList";

import { Input } from "@/components/ui/input";
import RefreshButton from "@/components/RefreshButton";
import AddCustomerButton from "@/components/AddCustomerButton";

import { GetCustomerTypes } from "@/utils/validations";

import { calculateTotalBalance } from "@/utils/calculations";

interface SalesPageContentProps {
	initialCustomers: GetCustomerTypes[];
}

export default function SalesPageContent({
	initialCustomers,
}: SalesPageContentProps) {
	const [customers, setCustomers] = useState(initialCustomers);
	const [searchTerm, setSearchTerm] = useState("");

	const totalBalance = calculateTotalBalance(customers);

	const filteredCustomers = customers.filter((customer) =>
		customer.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<div className="space-y-6">
			{/* <div className="p-4 border-b bg-blue-100">
				<header className="flex justify-between items-center">
					<h1 className="text-2xl font-bold">Sales</h1>
					<RefreshButton />
				</header>
			</div> */}

			<div className="px-4">
				{/* <div className="flex justify-between items-center mb-4">
					<Input
						type="text"
						placeholder="Search customers..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className="max-w-sm"
					/>
				</div> */}

				{/* <div className="bg-white p-4 rounded-lg shadow mb-6">
					<h2 className="text-xl font-semibold mb-2">
						Total Balance
					</h2>
					<p
						className={`text-2xl font-bold ${
							totalBalance >= 0
								? "text-green-600"
								: "text-red-600"
						}`}>
						${Math.abs(totalBalance).toFixed(2)}
					</p>
				</div> */}

				{/* <CustomerList customers={filteredCustomers} /> */}
			</div>

			{/* <AddCustomerButton /> */}
		</div>
	);
}
