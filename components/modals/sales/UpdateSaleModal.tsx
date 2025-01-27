"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	updateSaleSchema,
	type SaleTypes,
} from "@/lib/validations/sale-validations";
import { updateSale } from "@/actions/sale-actions";
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
import { PencilIcon } from "lucide-react";

interface UpdateSaleModalProps {
	sale: SaleTypes;
	onSaleUpdated: (updatedSale: SaleTypes) => void;
}

export default function UpdateSaleModal({
	sale,
	onSaleUpdated,
}: UpdateSaleModalProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [serverError, setServerError] = useState<string | null>(null);
	const [customers, setCustomers] = useState<any[]>([]);
	const [products, setProducts] = useState<any[]>([]);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		watch,
		setValue,
	} = useForm({
		resolver: zodResolver(updateSaleSchema),
		defaultValues: {
			id: sale.id,
			customerId: sale.customerId,
			productId: sale.productId,
			quantity: sale.quantity,
			totalAmount: sale.totalAmount,
		},
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
		const result = await updateSale(data);

		if (result.success && result.sale) {
			onSaleUpdated(result.sale);
			setIsOpen(false);
		} else {
			setServerError(result.error || "Failed to update sale");
		}
	};

	return (
		<Modal open={isOpen} onOpenChange={setIsOpen}>
			<ModalTrigger asChild>
				<Button
					variant="blue"
					size="sm"
					className="h-8 px-2 lg:h-9 lg:px-3">
					<PencilIcon />
				</Button>
			</ModalTrigger>
			<ModalContent className="max-w-[345px] rounded-lg md:max-w-[450px]">
				<form onSubmit={handleSubmit(onSubmit)}>
					<ModalHeader>
						<ModalTitle>Update Sale</ModalTitle>
						<ModalDescription>
							Update the details of the sale here.
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
								}
								defaultValue={sale.customerId}>
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
								}
								defaultValue={sale.productId}>
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
							variant="default"
							disabled={isSubmitting}>
							{isSubmitting ? "Updating..." : "Update Sale"}
						</Button>
					</ModalFooter>
				</form>
			</ModalContent>
		</Modal>
	);
}
