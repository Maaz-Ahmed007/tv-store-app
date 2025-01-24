"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	productSchema,
	type ProductTypes,
	type FullProductTypes,
} from "@/lib/validations/product-validations";
import { createProduct } from "@/actions/product-actions";

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

interface CreateProductModalProps {
	onProductCreated: (newProduct: FullProductTypes) => void;
}

export default function CreateProductModal({
	onProductCreated,
}: CreateProductModalProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [serverError, setServerError] = useState<string | null>(null);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<ProductTypes>({
		resolver: zodResolver(productSchema),
		defaultValues: {
			name: "",
			description: "",
			size: "",
			panel: "",
			company: "",
			cost: 0,
			price: 0,
		},
	});

	const onSubmit = async (data: ProductTypes) => {
		setServerError(null);
		const result = await createProduct({
			...data
		});

		if (result.success && result.product) {
			onProductCreated(result.product);
			reset();
			setIsOpen(false);
		} else {
			setServerError(result.error || "Failed to create product");
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
					<span className="hidden md:flex">Add TV</span>
				</Button>
			</ModalTrigger>
			<ModalContent className="max-w-[345px] rounded-lg md:max-w-[450px]">
				<form onSubmit={handleSubmit(onSubmit)}>
					<ModalHeader>
						<ModalTitle>Add New TV</ModalTitle>
						<ModalDescription>
							Enter the details of the new TV product here.
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
							{isSubmitting ? "Creating..." : "Create Product"}
						</Button>
					</ModalFooter>
				</form>
			</ModalContent>
		</Modal>
	);
}
