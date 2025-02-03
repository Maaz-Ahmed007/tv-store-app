import { User, Store, Bell, HelpCircle, LogOut } from "lucide-react";

import Header from "@/components/newcomponents/Header";

const settingsItems = [
	{ icon: User, label: "Account" },
	{ icon: Store, label: "Store Information" },
	{ icon: Bell, label: "Notifications" },
	{ icon: HelpCircle, label: "Help & Support" },
	{ icon: LogOut, label: "Log Out" },
];

export default function Settings() {
	return (
		<div className="flex flex-col h-full">
			<Header title="Settings" />
			<div className="flex-grow overflow-auto">
				<div className="p-4 space-y-4">
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
		</div>
	);
}
