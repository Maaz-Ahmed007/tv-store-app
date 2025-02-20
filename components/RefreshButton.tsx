"use client";

import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
	onRefresh: () => void;
}

export default function RefreshButton({ onRefresh }: Props) {
	return (
		<Button variant="ghost" size="icon" onClick={onRefresh}>
			<RefreshCw className="h-6 w-6" />
		</Button>
	);
}
