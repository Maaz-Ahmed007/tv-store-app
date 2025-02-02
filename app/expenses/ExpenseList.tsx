import prisma from "@/lib/prisma";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { PencilRuler, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function ExpenseList() {
	const expenses = await prisma.expense.findMany({
		orderBy: { date: "desc" },
	});

	return (
		<Table className="min-w-[371px] text-sm text-left text-gray-500">
			<TableHeader className="text-xs text-gray-700 uppercase bg-gray-50">
				<TableRow>
					<TableHead scope="col" className="px-2 py-3">
						Date
					</TableHead>
					<TableHead scope="col" className="px-2 py-3">
						Details
					</TableHead>
					<TableHead scope="col" className="px-2 py-3">
						Amount
					</TableHead>
					<TableHead scope="col" className="px-2 py-3">
						Actions
					</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{expenses.map((expense) => (
					<TableRow key={expense.id} className="bg-white border-b">
						<TableCell className="px-2 py-4">
							{expense.date.toISOString().split("T")[0]}
						</TableCell>
						<TableCell className="px-2 py-4">
							{expense.details}
						</TableCell>
						<TableCell className="px-2 py-4">
							{expense.amount.toFixed(2)}
						</TableCell>
						<TableCell className="px-2 py-2">
							<div className="flex items-center gap-1.5">
								<Button
									variant="blue"
									size="sm"
									className="h-8 px-2 lg:h-9 lg:px-3">
									<PencilRuler />
								</Button>
								<Button
									variant="red"
									size="sm"
									className="h-8 px-2 lg:h-9 lg:px-3">
									<Trash2 />
								</Button>
							</div>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
