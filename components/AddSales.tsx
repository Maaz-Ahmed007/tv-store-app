"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { saleSchema, type SaleType } from "@/utils/validations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { addSale } from "@/actions/customers";
import { getProducts } from "@/actions/products";
import { useQuery } from "@tanstack/react-query";

interface Props {
	customerId: string;
	onClose: () => void;
}

export default function AddSale({ customerId, onClose }: Props) {
	const [isSubmitting, setIsSubmitting] = useState(false);

	const { data: productsData } = useQuery({
		queryKey: ["products"],
		queryFn: getProducts,
	});

	const {
		register,
		control,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<SaleType>({
		resolver: zodResolver(saleSchema),
		defaultValues: {
			customerId,
			items: [{ productId: "", quantity: 1, price: 0 }],
			totalAmount: 0,
		},
	});

	const { fields, append, remove } = useFieldArray({
		control,
		name: "items",
	});

	const onSubmit = async (data: SaleType) => {
		setIsSubmitting(true);
		const result = await addSale(data);
		setIsSubmitting(false);
		if (result.success) {
			onClose();
		} else {
			// Handle error
			console.error(result.error);
		}
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
			<div className="bg-white p-6 rounded-lg max-w-2xl w-full">
				<h2 className="text-2xl font-bold mb-4">Add Sale</h2>
				<form onSubmit={handleSubmit(onSubmit)}>
					{fields.map((field, index) => (
						<div
							key={field.id}
							className="mb-4 flex items-end space-x-2">
							<div className="flex-1">
								<Label htmlFor={`items.${index}.productId`}>
									Product
								</Label>
								<Select
									onValueChange={(value) => {
										const product =
											productsData?.products.find(
												(p) => p.id === value
											);
										if (product) {
											register(
												`items.${index}.price`
											).onChange({
												target: {
													value: product.price,
													name: `items.${index}.price`,
												},
											});
										}
									}}>
									<SelectTrigger>
										<SelectValue placeholder="Select a product" />
									</SelectTrigger>
									<SelectContent>
										{productsData?.products.map(
											(product) => (
												<SelectItem
													key={product.id}
													value={product.id}>
													{product.name} (Stock:{" "}
													{product.quantity})
												</SelectItem>
											)
										)}
									</SelectContent>
								</Select>
							</div>
							<div>
								<Label htmlFor={`items.${index}.quantity`}>
									Quantity
								</Label>
								<Input
									type="number"
									{...register(`items.${index}.quantity`, {
										valueAsNumber: true,
									})}
								/>
							</div>
							<div>
								<Label htmlFor={`items.${index}.price`}>
									Price
								</Label>
								<Input
									type="number"
									{...register(`items.${index}.price`, {
										valueAsNumber: true,
									})}
								/>
							</div>
							<Button type="button" onClick={() => remove(index)}>
								Remove
							</Button>
						</div>
					))}
					<Button
						type="button"
						onClick={() =>
							append({ productId: "", quantity: 1, price: 0 })
						}>
						Add Item
					</Button>
					<div className="mt-4">
						<Label htmlFor="totalAmount">Total Amount</Label>
						<Input
							type="number"
							{...register("totalAmount", {
								valueAsNumber: true,
							})}
						/>
					</div>
					<div className="mt-6 flex justify-end space-x-2">
						<Button type="button" onClick={onClose}>
							Cancel
						</Button>
						<Button type="submit" disabled={isSubmitting}>
							{isSubmitting ? "Adding..." : "Add Sale"}
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
}
