"use client";

import { useState } from "react";
import { Search, Filter } from "lucide-react";

import Header from "@/components/newcomponents/Header";

export default function Sales() {
	const [sales, setSales] = useState([
		{
			id: 1,
			orderNumber: "001",
			amount: 1299,
			customer: "John Doe",
			date: "May 1, 2023",
		},
		{
			id: 2,
			orderNumber: "002",
			amount: 999,
			customer: "Jane Smith",
			date: "May 2, 2023",
		},
		{
			id: 3,
			orderNumber: "003",
			amount: 1599,
			customer: "Bob Johnson",
			date: "May 3, 2023",
		},
		{
			id: 4,
			orderNumber: "004",
			amount: 799,
			customer: "Alice Brown",
			date: "May 4, 2023",
		},
		{
			id: 5,
			orderNumber: "005",
			amount: 2099,
			customer: "Charlie Davis",
			date: "May 5, 2023",
		},
	]);

	const handleReload = () => {
		// Simulate reloading data
		setTimeout(() => {
			setSales([...sales].sort(() => Math.random() - 0.5));
		}, 1000);
	};

	return (
		<div className="flex flex-col h-full">
			<Header title="Sales" showReload onReload={handleReload}>
				<button
					className="p-2 text-blue-600 hover:bg-blue-100 rounded-full"
					aria-label="Search">
					<Search className="w-6 h-6" />
				</button>
				<button
					className="p-2 text-blue-600 hover:bg-blue-100 rounded-full"
					aria-label="Filter">
					<Filter className="w-6 h-6" />
				</button>
			</Header>
			<div className="flex-grow overflow-auto">
				<div className="p-4 space-y-4">
					{sales.map((sale) => (
						<div
							key={sale.id}
							className="bg-white p-4 rounded-lg shadow">
							<div className="flex justify-between items-center mb-2">
								<h2 className="text-lg font-semibold">
									Order #{sale.orderNumber}
								</h2>
								<span className="text-green-600 font-bold">
									${sale.amount}
								</span>
							</div>
							<p className="text-gray-600 mb-2">
								Customer: {sale.customer}
							</p>
							<p className="text-gray-600">Date: {sale.date}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}