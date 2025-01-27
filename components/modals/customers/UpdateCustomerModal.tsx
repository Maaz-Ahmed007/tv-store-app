"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	updateCustomerSchema,
	type CustomerTypes,
} from "@/lib/validations/customer-validations";
import { updateCustomer } from "@/actions/customer-actions";
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
import { PencilIcon } from "lucide-react";

interface UpdateCustomerModalProps {
	customer: CustomerTypes;
	onCustomerUpdated: (updatedCustomer: CustomerTypes) => void;
}

export default function UpdateCustomerModal({
	customer,
	onCustomerUpdated,
}: UpdateCustomerModalProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [serverError, setServerError] = useState<string | null>(null);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: zodResolver(updateCustomerSchema),
		defaultValues: {
			id: customer.id,
			name: customer.name,
			phone: customer.phone,
		},
	});

	const onSubmit = async (data: any) => {
		setServerError(null);
		const result = await updateCustomer(data);

		if (result.success && result.customer) {
			onCustomerUpdated(result.customer);
			setIsOpen(false);
		} else {
			setServerError(result.error || "Failed to update customer");
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
						<ModalTitle>Update Customer</ModalTitle>
						<ModalDescription>
							Update the details of the customer here.
						</ModalDescription>
					</ModalHeader>
					<div className="grid gap-4 py-4">
						{serverError && (
							<p className="text-red-500 text-center">
								{serverError}
							</p>
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
									{errors.name.message as string}
								</p>
							)}
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="phone" className="text-right">
								Phone
							</Label>
							<Input
								id="phone"
								className="col-span-3"
								{...register("phone")}
							/>
							{errors.phone && (
								<p className="col-span-3 col-start-2 text-red-500">
									{errors.phone.message as string}
								</p>
							)}
						</div>
					</div>
					<ModalFooter className="flex justify-end items-center">
						<Button
							type="submit"
							variant="default"
							disabled={isSubmitting}>
							{isSubmitting ? "Updating..." : "Update Customer"}
						</Button>
					</ModalFooter>
				</form>
			</ModalContent>
		</Modal>
	);
}
