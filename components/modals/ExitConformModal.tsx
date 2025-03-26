"use client";
import { AlertTriangle } from "lucide-react";
import Button from "../Button";

interface ExitConfirmationModalProps {
	onConfirm: () => void;
	onCancel: () => void;
	isOpen: boolean;
}

export default function ExitConfirmaModal({
	onConfirm,
	onCancel,
	isOpen,
}: ExitConfirmationModalProps) {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4">
			<div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-4 animate-fadeIn">
				<div className="flex items-center gap-3 mb-4">
					<AlertTriangle className="text-amber-500" size={24} />
					<h3 className="text-lg font-semibold">Exit Application?</h3>
				</div>

				<p className="text-gray-600 mb-6">
					Are you sure you want to exit the application? Any unsaved
					changes will be lost.
				</p>

				<div className="flex gap-3 justify-end">
					<Button variant="secondary" onClick={onCancel}>
						Cancel
					</Button>
					<Button variant="primary" onClick={onConfirm}>
						Exit
					</Button>
				</div>
			</div>
		</div>
	);
}
