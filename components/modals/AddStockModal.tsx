"use client";

import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	addStockSchema,
	type AddStockTypes,
	type FullProductTypes,
} from "@/lib/validations/product-validations";
import { updateStock } from "@/actions/product-actions";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalTitle,
	ModalDescription,
	ModalFooter,
	ModalTrigger,
} from "@/components/ui/modal";

interface AddStockModalProps {
	productId: string;
	productName: string;
	currentStock: number;
	onStockUpdated: (updatedProduct: FullProductTypes) => void;
}

export default function AddStockModal({
	productId,
	productName,
	currentStock,
	onStockUpdated,
}: AddStockModalProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [serverError, setServerError] = useState<string | null>(null);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		watch,
		setValue,
	} = useForm<AddStockTypes>({
		resolver: zodResolver(addStockSchema),
		defaultValues: {
			id: productId,
			quantity: currentStock,
		},
	});

	const handleQuantityChange = useCallback(
		(change: number) => {
			const currentValue = Number(watch("quantity")) || 0;
			const newValue = Math.max(0, currentValue + change);
			setValue("quantity", newValue);
		},
		[watch, setValue]
	);

	const onSubmit = async (data: AddStockTypes) => {
		setServerError(null);
		const result = await updateStock(data);

		if (result.success && result.product) {
			onStockUpdated(result.product);
			setIsOpen(false);
		} else {
			setServerError(result.error || "Failed to update stock");
		}
	};

	return (
		<Modal open={isOpen} onOpenChange={setIsOpen}>
			<ModalTrigger asChild>
				<span className="cursor-pointer">
					{currentStock > 0 ? (
						<span className="text-xs font-medium text-blue-600 bg-blue-100 py-1 px-2 rounded-full">
							{currentStock} In Stock
						</span>
					) : (
						<span className="text-xs font-medium text-red-600 bg-red-100 py-1 px-2 rounded-full">
							Out of Stock
						</span>
					)}
				</span>
			</ModalTrigger>
			<ModalContent className="max-w-[345px] rounded-lg md:max-w-[450px]">
				<form onSubmit={handleSubmit(onSubmit)}>
					<ModalHeader>
						<ModalTitle>Update Stock</ModalTitle>
						<ModalDescription>
							Update the stock quantity for {productName}.
						</ModalDescription>
					</ModalHeader>
					<div className="grid gap-4 py-4">
						{serverError && (
							<p className="text-red-500">{serverError}</p>
						)}
						<div className="flex justify-center items-center">
							<div className="col-span-3 flex items-center gap-2">
								<Button
									type="button"
									variant="outlineIcon"
									className="h-10 w-10 flex justify-center items-center text-lg font-bold"
									onClick={() => handleQuantityChange(-1)}>
									-
								</Button>
								<Input
									id="quantity"
									type="number"
									className="w-20 text-center text-sm"
									{...register("quantity", {
										valueAsNumber: true,
									})}
									disabled
								/>
								<Button
									type="button"
									variant="outlineIcon"
									className="h-10 w-10 flex justify-center items-center text-lg font-bold"
									onClick={() => handleQuantityChange(1)}>
									+
								</Button>
							</div>
							{errors.quantity && (
								<p className="col-span-3 col-start-2 text-red-500">
									{errors.quantity.message}
								</p>
							)}
						</div>
					</div>
					<ModalFooter>
						<Button
							type="submit"
							variant="blue"
							disabled={isSubmitting}>
							{isSubmitting ? "Updating..." : "Update Stock"}
						</Button>
					</ModalFooter>
				</form>
			</ModalContent>
		</Modal>
	);
}
