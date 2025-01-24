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
					<div className="flex flex-col space-y-4 py-4">
						{serverError && (
							<p className="text-red-500">{serverError}</p>
						)}
						<div className="flex justify-center items-center gap-4">
							<Label htmlFor="name" className="text-start w-24">
								Name
							</Label>
							<Input
								id="name"
								className="text-sm"
								{...register("name")}
							/>
							{errors.name && (
								<p className="col-span-3 col-start-2 text-red-500">
									{errors.name.message}
								</p>
							)}
						</div>
						<div className="flex justify-center items-center gap-4">
							<Label
								htmlFor="description"
								className="text-start w-24">
								Details
							</Label>
							<Input
								id="description"
								className="text-sm"
								{...register("description")}
							/>
							{errors.name && (
								<p className="col-span-3 col-start-2 text-red-500">
									{errors.description?.message}
								</p>
							)}
						</div>
						<div className="flex justify-center items-center gap-4">
							<Label htmlFor="size" className="text-start w-24">
								Size
							</Label>
							<Input
								id="size"
								className="text-sm"
								{...register("size")}
							/>
							{errors.size && (
								<p className="col-span-3 col-start-2 text-red-500">
									{errors.size.message}
								</p>
							)}
						</div>
						<div className="flex justify-center items-center gap-4">
							<Label htmlFor="panel" className="text-start w-24">
								Panel
							</Label>
							<Input
								id="panel"
								className="text-sm"
								{...register("panel")}
							/>
							{errors.panel && (
								<p className="col-span-3 col-start-2 text-red-500">
									{errors.panel.message}
								</p>
							)}
						</div>
						<div className="flex justify-center items-center gap-4">
							<Label
								htmlFor="company"
								className="text-start w-24">
								Company
							</Label>
							<Input
								id="company"
								className="text-sm"
								{...register("company")}
							/>
							{errors.company && (
								<p className="col-span-3 col-start-2 text-red-500">
									{errors.company?.message}
								</p>
							)}
						</div>
						<div className="flex justify-center items-center gap-4">
							<Label htmlFor="price" className="text-start w-24">
								Price
							</Label>
							<Input
								id="price"
								type="number"
								className="text-sm"
								{...register("price", { valueAsNumber: true })}
							/>
							{errors.price && (
								<p className="col-span-3 col-start-2 text-red-500">
									{errors.price.message}
								</p>
							)}
						</div>
						<div className="flex justify-center items-center gap-4">
							<Label htmlFor="cost" className="text-start w-24">
								Cost
							</Label>
							<Input
								id="cost"
								type="number"
								className="text-sm"
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
