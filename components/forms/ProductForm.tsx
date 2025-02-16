"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// ✅ Actions
import { saveProduct } from "@/actions/products";

// ✅ TODO: Toast

// ✅ Product Schema and types
import { productSchema, ProductTypes } from "@/utils/validations";

interface Props {
	existingProduct?: ProductTypes & { id: string };
}

export default function ProductForm({ existingProduct }: Props) {

	const {
		register,
		handleSubmit,
		reset,
		setError,
		formState: { errors, isSubmitting },
	} = useForm<ProductTypes>({
		resolver: zodResolver(productSchema),
		defaultValues: existingProduct || {
			name: "",
			description: "",
		},
		mode: "onChange",
	});

	async function onSubmit(data: ProductTypes) {
		const response = await saveProduct(existingProduct?.id || null, data);

		if (response.error) {
			if (response.error.name) {
				setError("name", {
					type: "manual",
					message: "A product with this name already exists.",
				});
			}
			return;
			// Toast error
		}

		// Toast success
		reset();
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="flex-grow flex flex-col p-4">
			<div className="mb-4">
				<Label htmlFor="name">Name</Label>
				<Input id="name" {...register("name")} className="w-full mt-1 text-sm" />
				{errors.name && (
					<p className="text-red-500 text-sm">
						{errors.name?.message}
					</p>
				)}
			</div>

			<div className="mb-4">
				{/* TODO: htmlFor and id for form items */}
				<Label>Description</Label>
				<Input
					{...register("description")}
					className="w-full mt-1 text-sm"
				/>
			</div>

			<div className="mb-4">
				<Label>Cost</Label>
				<Input
					type="number"
					{...register("cost", { valueAsNumber: true })}
					className="w-full mt-1 text-sm"
				/>
				{errors.cost && (
					<p className="text-red-500 text-sm">
						{errors.cost?.message}
					</p>
				)}
			</div>

			<div className="mb-4">
				<Label>Price</Label>
				<Input
					type="number"
					{...register("price", { valueAsNumber: true })}
					className="w-full mt-1 text-sm"
				/>
				{errors.price && (
					<p className="text-red-500 text-sm">
						{errors.price?.message}
					</p>
				)}
			</div>

			{/* TODO: Fix the button at the bottom of the page */}
			<Button
				variant="blue"
				type="submit"
				disabled={isSubmitting}
				className="">
				{isSubmitting
					? "Saving..."
					: existingProduct
					? "Update Product"
					: "Add Product"}
			</Button>
		</form>
	);
}
