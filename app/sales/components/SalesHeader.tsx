import { RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function SalesHeader() {
	return (
		<header className="flex justify-between items-center mb-4">
			<h1 className="text-2xl font-bold">Sales</h1>
			<Button variant="outlineIcon" size="icon">
				<RefreshCw className="h-6 w-6" />
			</Button>
		</header>
	);
}