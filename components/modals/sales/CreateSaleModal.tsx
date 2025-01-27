"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	createSaleSchema,
	type SaleTypes,
} from "@/lib/validations/sale-validations";
import { createSale } from "@/actions/sale-actions";
import { getCustomers } from "@/actions/customer-actions";
import { getProducts } from "@/actions/product-actions";
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
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalTitle,
	ModalDescription,
	ModalFooter,
	ModalTrigger,
} from "@/components/ui/modal";
import { Plus } from "lucide-react";

interface CreateSaleModalProps {
	onSaleCreated: (newSale: SaleTypes) => void;
}

export default function CreateSaleModal({
	onSaleCreated,
}: CreateSaleModalProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [serverError, setServerError] = useState<string | null>(null);
	const [customers, setCustomers] = useState<any[]>([]);
	const [products, setProducts] = useState<any[]>([]);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
		watch,
		setValue,
	} = useForm({
		resolver: zodResolver(createSaleSchema),
	});

	useEffect(() => {
		async function fetchData() {
			const customersResult = await getCustomers();
			const productsResult = await getProducts();

			if (customersResult.success && customersResult.customers) {
				setCustomers(customersResult.customers);
			}

			if (productsResult.success && productsResult.products) {
				setProducts(productsResult.products);
			}
		}

		fetchData();
	}, []);

	const watchProductId = watch("productId");
	const watchQuantity = watch("quantity");

	useEffect(() => {
		if (watchProductId && watchQuantity) {
			const selectedProduct = products.find(
				(product) => product.id === watchProductId
			);
			if (selectedProduct) {
				const totalAmount = selectedProduct.price * watchQuantity;
				setValue("totalAmount", totalAmount);
			}
		}
	}, [watchProductId, watchQuantity, products, setValue]);

	const onSubmit = async (data: any) => {
		setServerError(null);
		const result = await createSale(data);

		if (result.success && result.sale) {
			onSaleCreated(result.sale);
			reset();
			setIsOpen(false);
		} else {
			setServerError(result.error || "Failed to create sale");
		}
	};

	return (
		<Modal open={isOpen} onOpenChange={setIsOpen}>
			<ModalTrigger asChild>
				<Button
					variant="blue"
					className="tracking-tight leading-none gap-1">
					<Plus className="w-4 h-4" />
					Add Sale
				</Button>
			</ModalTrigger>
			<ModalContent className="max-w-[345px] rounded-lg md:max-w-[450px]">
				<form onSubmit={handleSubmit(onSubmit)}>
					<ModalHeader>
						<ModalTitle>Add New Sale</ModalTitle>
						<ModalDescription>
							Enter the details of the new sale here.
						</ModalDescription>
					</ModalHeader>
					<div className="grid gap-4 py-4">
						{serverError && (
							<p className="text-red-500 text-center">
								{serverError}
							</p>
						)}
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="customerId" className="text-right">
								Customer
							</Label>
							<Select
								onValueChange={(value) =>
									setValue("customerId", value)
								}>
								<SelectTrigger className="col-span-3">
									<SelectValue placeholder="Select customer" />
								</SelectTrigger>
								<SelectContent>
									{customers.map((customer) => (
										<SelectItem
											key={customer.id}
											value={customer.id}>
											{customer.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							{errors.customerId && (
								<p className="col-span-3 col-start-2 text-red-500">
									{errors.customerId.message as string}
								</p>
							)}
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="productId" className="text-right">
								Product
							</Label>
							<Select
								onValueChange={(value) =>
									setValue("productId", value)
								}>
								<SelectTrigger className="col-span-3">
									<SelectValue placeholder="Select product" />
								</SelectTrigger>
								<SelectContent>
									{products.map((product) => (
										<SelectItem
											key={product.id}
											value={product.id}>
											{product.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							{errors.productId && (
								<p className="col-span-3 col-start-2 text-red-500">
									{errors.productId.message as string}
								</p>
							)}
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="quantity" className="text-right">
								Quantity
							</Label>
							<Input
								id="quantity"
								type="number"
								className="col-span-3"
								{...register("quantity", {
									valueAsNumber: true,
								})}
							/>
							{errors.quantity && (
								<p className="col-span-3 col-start-2 text-red-500">
									{errors.quantity.message as string}
								</p>
							)}
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="totalAmount" className="text-right">
								Total Amount
							</Label>
							<Input
								id="totalAmount"
								type="number"
								className="col-span-3"
								{...register("totalAmount", {
									valueAsNumber: true,
								})}
								readOnly
							/>
							{errors.totalAmount && (
								<p className="col-span-3 col-start-2 text-red-500">
									{errors.totalAmount.message as string}
								</p>
							)}
						</div>
					</div>
					<ModalFooter className="flex justify-end items-center">
						<Button
							type="submit"
							variant="blue"
							disabled={isSubmitting}>
							{isSubmitting ? "Creating..." : "Create Sale"}
						</Button>
					</ModalFooter>
				</form>
			</ModalContent>
		</Modal>
	);
}
