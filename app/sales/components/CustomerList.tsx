"use client";

import { useState } from "react";
import { SlidersHorizontal, Printer } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

// Mock data for customers
const customers = [
	{ id: 1, name: "John Doe", balance: 1500 },
	{ id: 2, name: "Jane Smith", balance: -500 },
	{ id: 3, name: "Bob Johnson", balance: 0 },
];

export default function CustomerList() {
	const [searchTerm, setSearchTerm] = useState("");

	const filteredCustomers = customers.filter((customer) =>
		customer.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<div>
			<div className="flex items-center mb-4">
				<Input
					type="text"
					placeholder="Search customers"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className="flex-grow mr-2"
				/>
				<Button variant="outlineIcon" size="sm">
					<SlidersHorizontal className="h-4 w-4" />
				</Button>
				<Button variant="outlineIcon" size="sm" className="ml-2">
					<Printer className="h-4 w-4" />
				</Button>
			</div>
			<Table>
				<TableBody>
					{filteredCustomers.map((customer) => (
						<TableRow key={customer.id} className="flex justify-between py-2 cursor-pointer">
							<TableCell className="font-medium">
								{customer.name}
							</TableCell>
							<TableCell
								className={`text-right ${
									customer.balance >= 0
										? "text-green-600"
										: "text-red-600"
								}`}>
								Rs. {customer.balance.toFixed(2)}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
