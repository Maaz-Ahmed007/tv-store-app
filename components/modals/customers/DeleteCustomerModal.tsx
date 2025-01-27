"use client";

import { useState } from "react";
import { deleteCustomer } from "@/actions/customer-actions";
import { Button } from "@/components/ui/button";
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalTitle,
	ModalDescription,
	ModalFooter,
	ModalTrigger,
} from "@/components/ui/modal";
import { Trash2 } from "lucide-react";

interface DeleteCustomerModalProps {
	customerId: string;
	customerName: string;
	onCustomerDeleted: (id: string) => void;
}

export default function DeleteCustomerModal({
	customerId,
	customerName,
	onCustomerDeleted,
}: DeleteCustomerModalProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [serverError, setServerError] = useState<string | null>(null);

	async function handleDelete() {
		setIsLoading(true);
		setServerError(null);
		const result = await deleteCustomer(customerId);
		setIsLoading(false);

		if (result.success) {
			onCustomerDeleted(customerId);
			setIsOpen(false);
		} else {
			setServerError(result.error || "Failed to delete customer");
		}
	}

	return (
		<Modal open={isOpen} onOpenChange={setIsOpen}>
			<ModalTrigger asChild>
				<Button
					variant="red"
					size="sm"
					className="h-8 px-2 lg:h-9 lg:px-3">
					<Trash2 />
				</Button>
			</ModalTrigger>
			<ModalContent className="max-w-[345px] rounded-lg md:max-w-[450px]">
				<ModalHeader>
					<ModalTitle>Delete Customer</ModalTitle>
					<ModalDescription>
						Are you sure you want to delete this customer? This
						action cannot be undone.
					</ModalDescription>
				</ModalHeader>
				<div className="py-4">
					<p className="text-center text-lg font-semibold">
						{customerName}
					</p>
					{serverError && (
						<p className="text-center text-red-500 mt-2">
							{serverError}
						</p>
					)}
				</div>
				<ModalFooter className="flex justify-end items-center gap-2">
					<Button variant="outline" onClick={() => setIsOpen(false)}>
						Cancel
					</Button>
					<Button
						variant="red"
						onClick={handleDelete}
						disabled={isLoading}>
						{isLoading ? "Deleting..." : "Delete"}
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}
