"use client";

import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import OverlayPage from "@/components/OverlayPage";

// ✅ Actions
import { addSale } from "@/actions/customers";
import { getProducts } from "@/actions/products";

// ✅ TODO: Toast

// ✅ Schema and types
import { saleSchema, SaleTypes, getProductTypes } from "@/utils/validations";

interface Props {
	customerId: string;
	onClose: () => void;
}

export default function AddSale({ customerId, onClose }: Props) {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [products, setProducts] = useState<getProductTypes[]>([]);

	useEffect(() => {
		const fetchProducts = async () => {
			const result = await getProducts();
			if (result.success) {
				setProducts(result.products);
			}
		};
		fetchProducts();
	}, []);

	const {
		register,
		control,
		handleSubmit,
		watch,
		setValue,
		formState: { errors },
	} = useForm<SaleTypes>({
		resolver: zodResolver(saleSchema),
		defaultValues: {
			customerId,
			items: [{ productId: "", quantity: 1, price: 0 }],
		},
	});

	const { fields, append, remove } = useFieldArray({
		control,
		name: "items",
	});

	const watchItems = watch("items");

	useEffect(() => {
		const totalAmount = watchItems.reduce(
			(sum, item) => sum + item.quantity * item.price,
			0
		);
		setValue("totalAmount", totalAmount);
	}, [watchItems, setValue]);

	const onSubmit = async (data: SaleTypes) => {
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
		<OverlayPage title="Add Sale" onClose={onClose}>
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
				{fields.map((field, index) => (
					<div key={field.id} className="flex items-end space-x-2">
						<div className="flex-1">
							<Label htmlFor={`items.${index}.productId`}>
								Product
							</Label>
							<Select
								onValueChange={(value) => {
									const product = products.find(
										(p) => p.id === value
									);
									if (product) {
										setValue(
											`items.${index}.productId`,
											value
										);
										setValue(
											`items.${index}.price`,
											product.price
										);
									}
								}}>
								<SelectTrigger>
									<SelectValue placeholder="Select a product" />
								</SelectTrigger>
								<SelectContent>
									{products.map((product) => (
										<SelectItem
											key={product.id}
											value={product.id}>
											{product.name} (Stock:{" "}
											{product.quantity})
										</SelectItem>
									))}
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
								readOnly
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
				<div>
					<Label htmlFor="totalAmount">Total Amount</Label>
					<Input
						type="number"
						{...register("totalAmount", { valueAsNumber: true })}
						readOnly
					/>
				</div>
				<div className="flex justify-end space-x-2">
					<Button type="button" onClick={onClose}>
						Cancel
					</Button>
					<Button type="submit" disabled={isSubmitting}>
						{isSubmitting ? "Adding..." : "Add Sale"}
					</Button>
				</div>
			</form>
		</OverlayPage>
	);
}
