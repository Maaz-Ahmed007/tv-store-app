import Link from "next/link";
import { DollarSign, 
	FileText, User, BarChart2, ShoppingBag } from "lucide-react";

export default function BottomNav() {
	return (
		<nav className="fixed bottom-0 left-0 right-0 bg-blue-50 border-t border-blue-900 shadow-lg">
			<div className="flex justify-around items-center h-20">
				{" "}
				<Link
					href="/"
					className="flex flex-col items-center justify-center gap-2">
					<DollarSign size={26} />
					<span className="text-xs font-semibold">Sales</span>
				</Link>
				<Link
					href="/products"
					className="flex flex-col items-center justify-center gap-2">
					<ShoppingBag size={26} />
					<span className="text-xs font-semibold">Products</span>
				</Link>
				<Link
					href="/"
					className="flex flex-col items-center justify-center gap-2">
					<BarChart2 size={26} />
					<span className="text-xs font-semibold">Expenses</span>
				</Link>
				<Link
					href="/"
					className="flex flex-col items-center justify-center gap-2">
					<FileText size={26} />
					<span className="text-xs font-semibold">Invoices</span>
				</Link>
				<Link
					href="/"
					className="flex flex-col items-center justify-center gap-2">
					<User size={26} />
					<span className="text-xs font-semibold">Settings</span>
				</Link>
			</div>
		</nav>
	);
}
