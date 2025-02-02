"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	createExpenseSchema,
	type CreateExpenseTypes,
	type ExpenseTypes,
} from "@/lib/validations/expense-validations";
import { createExpense } from "@/actions/expense-actions";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalTitle,
	ModalDescription,
	ModalFooter,
	ModalTrigger,
} from "@/components/ui/modal";

interface CreateExpenseModalProps {
	onExpenseCreated: (newExpense: ExpenseTypes) => void;
}

export default function CreateExpenseModal({
	onExpenseCreated,
}: CreateExpenseModalProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [serverError, setServerError] = useState<string | null>(null);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<ExpenseTypes>({
		resolver: zodResolver(createExpenseSchema),
		defaultValues: {
			details: "",
			date: new Date(),
			amount: 0,
		},
	});

	const onSubmit = async (data: CreateExpenseTypes) => {
		setServerError(null);
		const result = await createExpense(data);

		if (result.success && result.expense) {
			onExpenseCreated(result.expense);
			reset();
			setIsOpen(false);
		} else {
			setServerError(result.error || "Failed to create expense");
		}
	};

	return (
		<Modal open={isOpen} onOpenChange={setIsOpen}>
			<ModalTrigger asChild>
				<Button
					variant="blue"
					size="sm"
					className="tracking-tight leading-none gap-1">
					<Plus />
					<span className="hidden md:flex">Add Expense</span>
				</Button>
			</ModalTrigger>
			<ModalContent className="max-w-[345px] rounded-lg md:max-w-[450px]">
				<form onSubmit={handleSubmit(onSubmit)}>
					<ModalHeader>
						<ModalTitle>Add New Expense</ModalTitle>
						<ModalDescription>
							Enter the details of the new expenses here.
						</ModalDescription>
					</ModalHeader>
					<div className="flex flex-col space-y-4 py-4">
						{serverError && (
							<p className="text-red-500">{serverError}</p>
						)}
						<div className="flex justify-center items-center relative gap-4">
							<Label
								htmlFor="details"
								className="text-start w-24">
								Details
							</Label>
							<Input
								id="details"
								className={`${
									errors.details
										? "border-red-200 focus-visible:outline-red-400"
										: ""
								} text-sm`}
								{...register("details")}
							/>
							{errors.details && (
								<p className="absolute right-2 text-red-500">
									{errors.details.message}
								</p>
							)}
						</div>
						<div className="flex justify-center items-center relative gap-4">
							<Label htmlFor="date" className="text-start w-24">
								Date
							</Label>
							<Input
								id="date"
								type="date"
								className={`${
									errors.date
										? "border-red-200 focus-visible:outline-red-400"
										: ""
								} text-sm`}
								{...register("date")}
							/>
							{errors.date && (
								<p className="absolute right-2 text-red-500">
									{errors.date.message}
								</p>
							)}
						</div>
						<div className="flex justify-center items-center relative gap-4">
							<Label htmlFor="amount" className="text-start w-24">
								Amount
							</Label>
							<Input
								id="amount"
								type="number"
								className={`${
									errors.amount
										? "border-red-200 focus-visible:outline-red-400"
										: ""
								} text-sm`}
								{...register("amount", { valueAsNumber: true })}
							/>
							{errors.amount && (
								<p className="absolute right-2 text-red-500">
									{errors.amount.message}
								</p>
							)}
						</div>
					</div>
					<ModalFooter className="flex justify-end items-center">
						<Button
							type="submit"
							variant="blue"
							disabled={isSubmitting}>
							{isSubmitting ? "Creating..." : "Create Expense"}
						</Button>
					</ModalFooter>
				</form>
			</ModalContent>
		</Modal>
	);
}
