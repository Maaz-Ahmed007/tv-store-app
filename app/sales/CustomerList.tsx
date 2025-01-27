"use client";

import { useState, useEffect } from "react";
import { getCustomers } from "@/actions/customer-actions";
import type { CustomerTypes } from "@/lib/validations/customer-validations";

import CreateCustomerModal from "@/components/modals/customers/CreateCustomerModal";
import UpdateCustomerModal from "@/components/modals/customers/UpdateCustomerModal";
import DeleteCustomerModal from "@/components/modals/customers/DeleteCustomerModal";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Separator } from "@radix-ui/react-separator";

export default function CustomerList() {
	const [customers, setCustomers] = useState<CustomerTypes[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		fetchCustomers();
	}, []);

	async function fetchCustomers() {
		setIsLoading(true);
		setError(null);
		try {
			const result = await getCustomers();
			if (result.success && result.customers) {
				setCustomers(result.customers);
			} else {
				setError("Failed to fetch customers");
			}
		} catch (err) {
			setError("An unexpected error occurred");
			console.error(err);
		} finally {
			setIsLoading(false);
		}
	}

	const handleCustomerCreated = (newCustomer: CustomerTypes) => {
		setCustomers((prevCustomers) => [...prevCustomers, newCustomer]);
	};

	const handleCustomerUpdated = (updatedCustomer: CustomerTypes) => {
		setCustomers((prevCustomers) =>
			prevCustomers.map((customer) =>
				customer.id === updatedCustomer.id ? updatedCustomer : customer
			)
		);
	};

	const handleCustomerDeleted = (deletedCustomerId: string) => {
		setCustomers((prevCustomers) =>
			prevCustomers.filter(
				(customer) => customer.id !== deletedCustomerId
			)
		);
	};

	if (isLoading) return <div>Loading customers...</div>;
	if (error) return <div className="text-red-500">Error: {error}</div>;

	return (
		<div>
			<div className="flex justify-between items-center mb-4">
				<h2 className="text-xl font-semibold">Customers</h2>
				<CreateCustomerModal
					onCustomerCreated={handleCustomerCreated}
				/>
			</div>
			<Separator className="bg-blue-100 mb-4" />
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Name</TableHead>
						<TableHead>Phone</TableHead>
						<TableHead className="text-right">Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{customers.map((customer) => (
						<TableRow key={customer.id}>
							<TableCell className="font-medium">
								{customer.name}
							</TableCell>
							<TableCell>{customer.phone}</TableCell>
							<TableCell className="text-right flex items-center justify-end gap-1.5">
								<UpdateCustomerModal
									customer={customer}
									onCustomerUpdated={handleCustomerUpdated}
								/>
								<DeleteCustomerModal
									customerId={customer.id}
									customerName={customer.name}
									onCustomerDeleted={handleCustomerDeleted}
								/>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
