"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// ✅ Actions
import { saveCustomer } from "@/actions/customers";

// ✅ TODO: Toast

// ✅ Customer Schema and types
import { customerSchema, CustomerTypes } from "@/utils/validations";

interface Props {
	existingCustomer?: CustomerTypes & { id: string };
	onClose: () => void;
}

export default function CustomerForm({ existingCustomer, onClose }: Props) {
	const [serverError, setServerError] = useState<string | null>(null);

	const {
		register,
		handleSubmit,
		reset,
		setError,
		formState: { errors, isSubmitting },
	} = useForm<CustomerTypes>({
		resolver: zodResolver(customerSchema),
		defaultValues: existingCustomer || {
			name: "",
			phone: "",
		},
		mode: "onChange",
	});

	async function onSubmit(data: CustomerTypes) {
		setServerError(null);
		const response = await saveCustomer(existingCustomer?.id || null, data);

		if (response.error) {
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
				<Input
					id="name"
					{...register("name")}
					className="w-full mt-1 text-sm"
				/>
				{errors.name && (
					<p className="text-red-500 text-sm">
						{errors.name?.message}
					</p>
				)}
			</div>

			<div className="mb-4">
				<Label htmlFor="phone">Phone</Label>
				<Input
					id="phone"
					{...register("phone")}
					className="w-full mt-1 text-sm"
				/>
				{errors.phone && (
					<p className="text-red-500 text-sm">
						{errors.phone?.message}
					</p>
				)}
			</div>

			{/* TODO: Fix the button at the bottom of the page */}
			<div className="flex justify-end space-x-2">
				<Button type="button" variant="outline" onClick={onClose}>
					Cancel
				</Button>
				<Button variant="blue" type="submit" disabled={isSubmitting}>
					{isSubmitting
						? "Saving..."
						: existingCustomer
						? "Update Customer"
						: "Add Customer"}
				</Button>
			</div>
		</form>
	);
}
