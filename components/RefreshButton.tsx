"use client";

import { useState } from "react";
import { RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

export default function RefreshButton() {
	const router = useRouter();
	const [isRefreshing, setIsRefreshing] = useState(false);

	const handleRefresh = async () => {
		setIsRefreshing(true);
		router.prefetch("/");
		router.refresh();
		setTimeout(() => setIsRefreshing(false), 3000);
	};

	return (
		<Button
			variant="outlineIcon"
			size="icon"
			onClick={handleRefresh}
			disabled={isRefreshing}>
			<RefreshCw className={`${isRefreshing ? "animate-spin" : ""}`} />
		</Button>
	);
}