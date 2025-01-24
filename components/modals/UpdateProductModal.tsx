"use client";

import { useState } from "react";
import { PencilRuler } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	updateProductSchema,
	type UpdateProductTypes,
	type FullProductTypes,
} from "@/lib/validations/product-validations";
import { updateProduct } from "@/actions/product-actions";

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

interface UpdateProductModalProps {
	product: FullProductTypes;
	onProductUpdated: (updatedProduct: FullProductTypes) => void;
}

export default function UpdateProductModal({
	product,
	onProductUpdated,
}: UpdateProductModalProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [serverError, setServerError] = useState<string | null>(null);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<UpdateProductTypes>({
		resolver: zodResolver(updateProductSchema),
		defaultValues: {
			id: product.id,
			name: product.name,
			description: product.description ?? "",
			size: product.size,
			panel: product.panel,
			company: product.company ?? "",
			cost: product.cost,
			price: product.price,
		},
	});

	const onSubmit = async (data: UpdateProductTypes) => {
		setServerError(null);
		const result = await updateProduct(data);

		if (result.success && result.product) {
			onProductUpdated(result.product);
			setIsOpen(false);
		} else {
			setServerError(result.error || "Failed to update product");
		}
	};

	return (
		<Modal open={isOpen} onOpenChange={setIsOpen}>
			<ModalTrigger asChild>
				<Button
					variant="blue"
                    size="sm"
					className="tracking-tight leading-none gap-1">
					<PencilRuler />
					Edit
				</Button>
			</ModalTrigger>
			<ModalContent className="max-w-[345px] rounded-lg md:max-w-[450px]">
				<form onSubmit={handleSubmit(onSubmit)}>
					<ModalHeader>
						<ModalTitle>Update TV</ModalTitle>
						<ModalDescription>
							Update the details of the new TV product here.
						</ModalDescription>
					</ModalHeader>
					<div className="grid gap-4 py-4">
						{serverError && (
							<p className="text-red-500">{serverError}</p>
						)}
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="name" className="text-right">
								Name
							</Label>
							<Input
								id="name"
								className="col-span-3"
								{...register("name")}
							/>
							{errors.name && (
								<p className="col-span-3 col-start-2 text-red-500">
									{errors.name.message}
								</p>
							)}
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="description" className="text-right">
								Description
							</Label>
							<Input
								id="description"
								className="col-span-3"
								{...register("description")}
							/>
							{errors.name && (
								<p className="col-span-3 col-start-2 text-red-500">
									{errors.description?.message}
								</p>
							)}
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="size" className="text-right">
								Size
							</Label>
							<Input
								id="size"
								className="col-span-3"
								{...register("size")}
							/>
							{errors.size && (
								<p className="col-span-3 col-start-2 text-red-500">
									{errors.size.message}
								</p>
							)}
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="panel" className="text-right">
								Panel
							</Label>
							<Input
								id="panel"
								className="col-span-3"
								{...register("panel")}
							/>
							{errors.panel && (
								<p className="col-span-3 col-start-2 text-red-500">
									{errors.panel.message}
								</p>
							)}
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="company" className="text-right">
								Company
							</Label>
							<Input
								id="company"
								className="col-span-3"
								{...register("company")}
							/>
							{errors.company && (
								<p className="col-span-3 col-start-2 text-red-500">
									{errors.company?.message}
								</p>
							)}
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="price" className="text-right">
								Price
							</Label>
							<Input
								id="price"
								type="number"
								className="col-span-3"
								{...register("price", { valueAsNumber: true })}
							/>
							{errors.price && (
								<p className="col-span-3 col-start-2 text-red-500">
									{errors.price.message}
								</p>
							)}
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="cost" className="text-right">
								Cost
							</Label>
							<Input
								id="cost"
								type="number"
								className="col-span-3"
								{...register("cost", { valueAsNumber: true })}
							/>
							{errors.cost && (
								<p className="col-span-3 col-start-2 text-red-500">
									{errors.cost.message}
								</p>
							)}
						</div>
					</div>
					<ModalFooter className="flex justify-end items-center">
						<Button
							type="submit"
							variant="blue"
							disabled={isSubmitting}>
							{isSubmitting ? "Updating..." : "Update Product"}
						</Button>
					</ModalFooter>
				</form>
			</ModalContent>
		</Modal>
	);
}
