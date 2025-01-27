import { Metadata } from "next";
import { Suspense } from "react";

import CustomerList from "./CustomerList";
import SaleList from "./SaleList";

import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
	title: "Sales | TV Store",
	description: "Manage your TV store inventory",
};

export default function SalesPage() {
	return (
		<div className="space-y-4">
			<div className="bg-white py-4 px-4 md:px-6 border border-blue-200 rounded-lg shadow-sm shadow-blue-200">
				<div className="flex justify-between items-center">
					<h1 className="text-2xl text-gray-800 font-semibold leading-none tracking-tight">
						Sales Page
					</h1>
				</div>
			</div>
			<div className="bg-white py-4 px-4 md:px-6 border border-blue-200 rounded-lg shadow-sm shadow-blue-200">
				<Suspense fallback={<div>Loading customers...</div>}>
					<CustomerList />
				</Suspense>
			</div>
			<div className="bg-white py-4 px-4 md:px-6 border border-blue-200 rounded-lg shadow-sm shadow-blue-200">
				<Suspense fallback={<div>Loading sales...</div>}>
					<SaleList />
				</Suspense>
			</div>
		</div>
	);
}
