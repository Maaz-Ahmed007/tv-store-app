"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createExpense } from "@/actions/expense-actions";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalTitle,
	ModalDescription,
	ModalFooter,
	ModalTrigger,
} from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ExpenseForm() {
	const [open, setOpen] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const router = useRouter();

	async function handleSubmit(formData: FormData) {
		const result = await createExpense(formData);
		if (result.message === "Expense created successfully.") {
			setOpen(false);
			router.refresh();
		} else {
			setError(result.message || "An error occurred");
		}
	}

	return (
		<Modal open={open} onOpenChange={setOpen}>
			<ModalTrigger asChild>
				<Button variant="blue">Add Expense</Button>
			</ModalTrigger>
			<ModalContent className="max-w-[345px] rounded-lg md:max-w-[450px] bg-white">
				<form action={handleSubmit} className="space-y-4">
					<ModalHeader>
						<ModalTitle>Add New Expense</ModalTitle>
						<ModalDescription>
							Enter the details of the new expense here.
						</ModalDescription>
					</ModalHeader>
					<div>
						<Label htmlFor="details">Details</Label>
						<Input id="details" name="details" />
					</div>
					<div>
						<Label htmlFor="amount">Amount</Label>
						<Input
							id="amount"
							name="amount"
							type="number"
							step="0.01"
							required
						/>
					</div>
					<div>
						<Label htmlFor="date">Date</Label>
						<Input id="date" name="date" type="date" required />
					</div>
					{error && <p className="text-red-500">{error}</p>}
					<ModalFooter className="flex justify-end items-center">
						<Button type="submit" variant="blue" className="w-full">
							Add Expense
						</Button>
					</ModalFooter>
				</form>
			</ModalContent>
		</Modal>
	);
}
