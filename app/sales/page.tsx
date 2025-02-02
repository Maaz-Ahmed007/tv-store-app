"use client";

import PullToRefresh from "@/components/newcomponents/PullToRefresh";

export default function Sales() {
	const handleRefresh = () => {
		// Implement refresh logic here
		console.log("Refreshing sales...");
	};

	return (
		<PullToRefresh onRefresh={handleRefresh}>
			<div className="p-4">
				<h1 className="text-2xl font-bold text-blue-600 mb-4">Sales</h1>
				<div className="space-y-4">
					{[1, 2, 3, 4, 5].map((sale) => (
						<div
							key={sale}
							className="bg-white p-4 rounded-lg shadow">
							<div className="flex justify-between items-center mb-2">
								<h2 className="text-lg font-semibold">
									Order #{sale}001
								</h2>
								<span className="text-green-600 font-bold">
									$1,299
								</span>
							</div>
							<p className="text-gray-600 mb-2">
								Customer: John Doe
							</p>
							<p className="text-gray-600">Date: May 1, 2023</p>
						</div>
					))}
				</div>
			</div>
		</PullToRefresh>
	);
}
