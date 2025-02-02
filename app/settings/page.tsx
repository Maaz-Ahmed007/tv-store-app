"use client";

import PullToRefresh from "@/components/newcomponents/PullToRefresh";
import { User, Store, Bell, HelpCircle, LogOut } from "lucide-react";

export default function Settings() {
	const handleRefresh = () => {
		// Implement refresh logic here
		console.log("Refreshing settings...");
	};

	const settingsItems = [
		{ icon: User, label: "Account" },
		{ icon: Store, label: "Store Information" },
		{ icon: Bell, label: "Notifications" },
		{ icon: HelpCircle, label: "Help & Support" },
		{ icon: LogOut, label: "Log Out" },
	];

	return (
		<PullToRefresh onRefresh={handleRefresh}>
			<div className="p-4">
				<h1 className="text-2xl font-bold text-blue-600 mb-4">
					Settings
				</h1>
				<div className="space-y-4">
					{settingsItems.map(({ icon: Icon, label }) => (
						<div
							key={label}
							className="bg-white p-4 rounded-lg shadow flex items-center">
							<Icon className="w-6 h-6 text-blue-600 mr-4" />
							<span className="text-lg">{label}</span>
						</div>
					))}
				</div>
			</div>
		</PullToRefresh>
	);
}
