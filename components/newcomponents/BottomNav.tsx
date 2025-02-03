"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Package, DollarSign, PieChart, Settings } from "lucide-react";

const navItems = [
	{ href: "/sales", icon: DollarSign, label: "Sales" },
	{ href: "/products", icon: Package, label: "Products" },
	{ href: "/expenses", icon: PieChart, label: "Expenses" },
	{ href: "/settings", icon: Settings, label: "Settings" },
];

export default function BottomNav() {
	const pathname = usePathname();

	return (
		<nav className="bg-white border-t border-gray-200 fixed bottom-0 w-full max-w-md">
			<ul className="flex justify-around">
				{navItems.map(({ href, icon: Icon, label }) => (
					<li key={href}>
						<Link
							href={href}
							className={`flex flex-col items-center p-2 ${
								pathname === href
									? "text-blue-600"
									: "text-gray-600"
							}`}>
							<Icon className="w-6 h-6" />
							<span className="text-xs mt-1">{label}</span>
						</Link>
					</li>
				))}
			</ul>
		</nav>
	);
}
