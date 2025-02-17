import { ArrowLeft } from "lucide-react";

import { Button } from "./ui/button";

interface Props {
	title: string;
	onClose: () => void;
	children: React.ReactNode;
}

export default function OverlayPage({ title, onClose, children }: Props) {
	return (
		<div className="fixed inset-0 bg-white z-50 overflow-auto">
			<div className="p-4 border-b">
				<div className="flex items-center">
					<Button variant="outlineIcon" size="icon" onClick={onClose}>
						<ArrowLeft />
					</Button>
				</div>
				<h1 className="text-2xl font-bold ml-4">{title}</h1>
			</div>
			<div className="p-4">{children}</div>
		</div>
	);
}