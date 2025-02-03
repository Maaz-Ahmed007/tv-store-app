import Link from "next/link";
import { Home, DollarSign, Box, Users, Menu } from "lucide-react";

export default function BottomNav() {
	return (
		<nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg">
			<div className="flex justify-around items-center h-16">
				<Link href="/" className="flex flex-col items-center">
					<Home size={24} />
					<span className="text-xs">Home</span>
				</Link>
				<Link href="/sales" className="flex flex-col items-center">
					<DollarSign size={24} />
					<span className="text-xs">Sales</span>
				</Link>
				<Link href="/inventory" className="flex flex-col items-center">
					<Box size={24} />
					<span className="text-xs">Inventory</span>
				</Link>
				<Link href="/customers" className="flex flex-col items-center">
					<Users size={24} />
					<span className="text-xs">Customers</span>
				</Link>
				<Link href="/more" className="flex flex-col items-center">
					<Menu size={24} />
					<span className="text-xs">More</span>
				</Link>
			</div>
		</nav>
	);
}