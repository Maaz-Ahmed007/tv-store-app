"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// ✅ Actions
import { addSale } from "@/actions/customers";

// ✅ TODO: Toast

// ✅ Customer Schema and types
import { saleSchema, SaleTypes } from "@/utils/validations";

interface Props {
	existingSales?: SaleTypes & { id: string };
	onSuccess: () => void;
}

export default function SaleForm({ existingSales, onSuccess }: Props) {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SaleTypes>({
		resolver: zodResolver(saleSchema),
		defaultValues: existingSales || {
			
		},
		mode: "onChange",
	});

	async function onSubmit(data: SaleTypes) {
		setIsSubmitting(true);
		setError(null);
		const response = await addSale();

		if (response.error) {
			setError("Failed to save sale");
		} else {
			router.refresh();
			onSuccess();
		}
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="flex-grow flex flex-col p-4">
			{error && <p className="text-red-500">{error}</p>}
			<div className="mb-4">
				
            </div>
			{/* TODO: Fix the button at the bottom of the page */}
			<Button variant="blue" type="submit" disabled={isSubmitting}>
				{isSubmitting
					? "Saving..."
					: existingSales
					? "Update Customer"
					: "Add Customer"}
			</Button>
		</form>
	);
}
