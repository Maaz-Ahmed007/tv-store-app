"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";

interface Customer {
	id: number;
	name: string;
	balance: number;
}

interface SortingPanelProps {
	onClose: () => void;
	onApply: (sortBy: keyof Customer, sortOrder: "asc" | "desc") => void;
	isOpen: boolean;
}

export default function SortingPanel({
	onClose,
	onApply,
	isOpen,
}: SortingPanelProps) {
	const [sortBy, setSortBy] = useState("name");
	const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

	return (
		<Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
			<SheetContent side="bottom" className="h-[400px] bg-white">
				<SheetHeader>
					<SheetTitle>Sort Customers</SheetTitle>
				</SheetHeader>
				<div className="py-4">
					<RadioGroup
						value={sortBy}
						onValueChange={setSortBy}
						className="mb-4">
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="name" id="name" />
							<Label htmlFor="name">Sort by Name</Label>
						</div>
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="balance" id="balance" />
							<Label htmlFor="balance">Sort by Balance</Label>
						</div>
					</RadioGroup>
					<div className="flex items-center justify-between mb-6">
						<Label htmlFor="sort-order">Ascending Order</Label>
						<Switch
							id="sort-order"
							checked={sortOrder === "asc"}
							onCheckedChange={(checked) =>
								setSortOrder(checked ? "asc" : "desc")
							}
						/>
					</div>
					<Button
						onClick={() => {
							onApply(sortBy, sortOrder);
							onClose();
						}}
						variant="blue"
						className="w-full">
						Apply
					</Button>
				</div>
			</SheetContent>
		</Sheet>
	);
}
