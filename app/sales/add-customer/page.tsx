"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

export default function AddCustomerPage() {
	const [name, setName] = useState("");
	const router = useRouter();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Handle form submission
		console.log("Customer added:", name);
		router.back();
	};

	return (
		<div className="fixed inset-0 bg-white z-50 overflow-y-auto">
			<header className="flex items-center p-4 border-b">
				<Button
					variant="ghost"
					size="icon"
					onClick={() => router.back()}>
					<ArrowLeft className="h-6 w-6" />
				</Button>
				<h2 className="text-xl font-bold ml-4">Add Customer</h2>
			</header>
			<form onSubmit={handleSubmit} className="p-4">
				<div className="mb-4">
					<Label htmlFor="name">Name</Label>
					<Input
						id="name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						className="w-full mt-1"
					/>
				</div>
				{/* Add more form fields as needed */}
				<Button type="submit" className="w-full mt-4">
					Add
				</Button>
			</form>
		</div>
	);
}
