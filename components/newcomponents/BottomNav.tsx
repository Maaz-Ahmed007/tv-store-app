"use client";

import { Package, DollarSign, PieChart, Settings } from "lucide-react";
import { useSwipeableViewsContext } from "./SwipeableViewsContext";

const navItems = [
	{ icon: DollarSign, label: "Sales" },
	{ icon: Package, label: "Products" },
	{ icon: PieChart, label: "Expenses" },
	{ icon: Settings, label: "Settings" },
];

export default function BottomNav() {
	const { activeIndex, setActiveIndex } = useSwipeableViewsContext();

	return (
		<nav className="bg-white border-t border-gray-200 fixed bottom-0 w-full max-w-md">
			<ul className="flex justify-around">
				{navItems.map(({ icon: Icon, label }, index) => (
					<li key={label}>
						<button
							onClick={() => setActiveIndex(index)}
							className={`flex flex-col items-center p-2 ${
								activeIndex === index
									? "text-blue-600"
									: "text-gray-600"
							}`}>
							<Icon className="w-6 h-6" />
							<span className="text-xs mt-1">{label}</span>
						</button>
					</li>
				))}
			</ul>
		</nav>
	);
}
