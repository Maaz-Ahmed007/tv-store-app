import { Metadata } from "next";
import { Suspense } from "react";

import ExpenseList from "./ExpenseList";

import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
	title: "Expenses | TV Store",
	description: "Manage your TV store inventory",
};

export default function ExpensesPage() {
	return (
		<div className="space-y-4">
			<div className="bg-white py-4 px-4 md:px-6 border border-blue-200 rounded-lg shadow-sm shadow-blue-200">
				<div className="flex justify-center md:justify-between items-center pb-2">
					<h1 className="text-2xl text-gray-800 font-semibold leading-none tracking-tight">
						Expenses Page
					</h1>
				</div>

				<Separator className="bg-blue-100 mb-4" />

				<Suspense
					fallback={<div className="pt-4">Loading expenses...</div>}>
					<ExpenseList />
				</Suspense>
			</div>
		</div>
	);
}
