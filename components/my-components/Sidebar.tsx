"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useParams, usePathname } from "next/navigation";
import {
	Home,
	Box,
	Users,
	DollarSign,
	BarChart2,
	ChevronLeft,
	ChevronRight,
	Tv,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const Sidebar = ({
	isOpen,
	setIsOpen,
}: {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
}) => {
	const [isMobile, setIsMobile] = useState(false);
	const [activeItem, setActiveItem] = useState("Dashboard");

	const params = useParams();
	const pathname = usePathname();

	const routes = [
		{
			href: `/`,
			icon: Home,
			label: "Dashboard",
			active: pathname === `/`,
		},
		{
			href: `/products`,
			icon: Tv,
			label: "Products",
			active: pathname === `/products`,
		},
		{
			href: `/sales`,
			icon: DollarSign,
			label: "Sales",
			active: pathname === `/sales`,
		},
		{
			href: `/expenses`,
			icon: BarChart2,
			label: "Expenses",
			active: pathname === `/expenses`,
		},
	];

	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 768);
		};
		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	return (
		<>
			{/* Desktop and Tablet Sidebar */}
			{!isMobile && (
				<aside
					className={cn(
						"fixed top-16 left-0 z-20 bg-white border-r border-blue-200",
						"transition-all duration-300 ease-in-out",
						isOpen ? "w-64" : "w-20",
						"h-[calc(100vh-4rem)] overflow-y-auto overflow-x-hidden"
					)}>
					<div className="h-full flex flex-col justify-between py-4">
						<ul className="space-y-2 font-medium px-3">
							{routes.map((route) => (
								<li key={route.href}>
									<Link
										href={route.href}
										className={cn(
											"flex items-center p-2 rounded-r-lg group relative overflow-hidden bg-gradient-to-r",
											"",
											route.active
												? "text-white from-blue-500 to-blue-400"
												: "text-gray-500 hover:text-gray-700 hover:from-blue-300 hover:to-blue-200"
										)}>
										<div className="flex items-center w-full">
											<route.icon
												className={cn(
													"w-6 h-6",
													isOpen ? "mr-3" : "mx-auto"
												)}
											/>
											<span
												className={cn(
													"",
													isOpen
														? "opacity-100"
														: "opacity-0 absolute"
												)}>
												{route.label}
											</span>
										</div>
										<span
											className={cn(
												"absolute inset-y-0 left-0 w-1 bg-blue-600",
												route.active
													? "opacity-100"
													: "opacity-0"
											)}
										/>
									</Link>
								</li>
							))}
						</ul>
						<div className="px-3">
							<Button
								variant="outlineIcon"
								size="icon"
								className="w-full justify-center"
								onClick={() => setIsOpen(!isOpen)}>
								<motion.div
									key={isOpen ? "open" : "closed"}
									initial={{ opacity: 0, rotate: -180 }}
									animate={{ opacity: 1, rotate: 0 }}
									exit={{ opacity: 0, rotate: 180 }}
									transition={{ duration: 0.3 }}>
									{isOpen ? (
										<ChevronLeft className="h-6 w-6" />
									) : (
										<ChevronRight className="h-6 w-6" />
									)}
								</motion.div>
							</Button>
						</div>
					</div>
				</aside>
			)}

			{/* Mobile Bottom Menu */}
			{isMobile && (
				<div className="fixed bottom-0 z-20 w-full bg-white border-t border-blue-200">
					<div className="grid grid-cols-4">
						{routes.map((route) => (
							<Link
								key={route.href}
								href={route.href}
								className={cn(
									"flex flex-col items-center justify-center py-2 bg-gradient-to-t",
									"transition-colors duration-200",
									route.active
										? "text-white from-blue-500 to-blue-400 border-t-4 border-blue-500"
										: "text-gray-500 hover:bg-blue-50"
								)}>
								<route.icon
									className={cn(
										"w-6 h-6 mb-1",
										route.active ? "text-white" : ""
									)}
								/>
								<span className="text-xs">{route.label}</span>
							</Link>
						))}
					</div>
				</div>
			)}
		</>
	);
};

export default Sidebar;
