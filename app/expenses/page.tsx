"use client";

import PullToRefresh from "@/components/newcomponents/PullToRefresh";
import { Plus } from "lucide-react";

export default function Expenses() {
	const handleRefresh = () => {
		// Implement refresh logic here
		console.log("Refreshing expenses...");
	};

	return (
		<PullToRefresh onRefresh={handleRefresh}>
			<div className="p-4">
				<h1 className="text-2xl font-bold text-blue-600 mb-4">
					Expenses
				</h1>
				<button className="bg-blue-600 text-white px-4 py-2 rounded-full mb-4 flex items-center">
					<Plus className="w-5 h-5 mr-2" />
					Add Expense
				</button>
				<div className="space-y-4">
					{[1, 2, 3].map((expense) => (
						<div
							key={expense}
							className="bg-white p-4 rounded-lg shadow">
							<div className="flex justify-between items-center mb-2">
								<h2 className="text-lg font-semibold">Rent</h2>
								<span className="text-red-600 font-bold">
									$2,000
								</span>
							</div>
							<p className="text-gray-600">Date: May 1, 2023</p>
						</div>
					))}
				</div>
			</div>
		</PullToRefresh>
	);
}
