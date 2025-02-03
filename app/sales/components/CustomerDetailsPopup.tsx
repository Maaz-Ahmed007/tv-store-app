"use client";

import { useState } from "react";
import { ArrowLeft, Settings, Send, Printer } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function CustomerDetailsPopup() {
	const [isOpen, setIsOpen] = useState(false);

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-white z-50 overflow-y-auto">
			<header className="flex justify-between items-center p-4 border-b">
				<Button
					variant="ghost"
					size="icon"
					onClick={() => setIsOpen(false)}>
					<ArrowLeft className="h-6 w-6" />
				</Button>
				<h2 className="text-xl font-bold">Customer Name</h2>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" size="icon">
							<Settings className="h-6 w-6" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem>Customer Details</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</header>
			<div className="p-4">
				<div className="text-2xl font-bold mb-4">
					Balance: Rs. 1500.00
				</div>
				<div className="flex justify-around mb-4">
					<Button variant="outline" size="sm">
						<Send className="h-4 w-4 mr-2" />
						SMS
					</Button>
					<Button variant="outline" size="sm">
						<Send className="h-4 w-4 mr-2" />
						WhatsApp
					</Button>
					<Button variant="outline" size="sm">
						<Printer className="h-4 w-4 mr-2" />
						Print
					</Button>
				</div>
				{/* Transaction list would go here */}
				<div className="flex justify-between mt-4">
					<Button variant="outline" className="w-[48%]">
						Add Debit
					</Button>
					<Button variant="outline" className="w-[48%]">
						Add Credit
					</Button>
				</div>
			</div>
		</div>
	);
}
