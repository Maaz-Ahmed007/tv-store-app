"use client";

import { useState } from "react";
import { Trash } from "lucide-react";
import { deleteProduct } from "@/actions/product-actions";

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

interface DeleteProductModalProps {
	productId: string;
	productName: string;
	onProductDeleted: (id: string) => void;
}

export default function DeleteProductModal({
	productId,
	productName,
	onProductDeleted,
}: DeleteProductModalProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [serverError, setServerError] = useState<string | null>(null);

	async function handleDelete() {
		setIsLoading(true);
		setServerError(null);
		const result = await deleteProduct(productId);
		setIsLoading(false);

		if (result.success) {
            onProductDeleted(productId)
            setIsOpen(false)
          } else {
            setServerError(result.error || "Failed to delete product")
          }
	}

	return (
		<Modal open={isOpen} onOpenChange={setIsOpen}>
			<ModalTrigger asChild>
				<Button
					variant="red"
                    size="sm"
					className="tracking-tight leading-none gap-1">
					<Trash />
					Delete
				</Button>
			</ModalTrigger>
			<ModalContent className="max-w-[345px] rounded-lg md:max-w-[450px]">
				<ModalHeader>
					<ModalTitle>Delete Product</ModalTitle>
					<ModalDescription>
						Are you sure you want to delete {productName}?
					</ModalDescription>
				</ModalHeader>
				<div>
					
					{serverError && (
						<p className="text-center text-red-500 mt-2">
							{serverError}
						</p>
					)}
				</div>
				<ModalFooter className="flex justify-end items-center">
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
