"use client";

import { useState } from "react";
import { ShoppingCart, Settings, Smartphone, RefreshCw } from "lucide-react";

import generateMockData from "@/components/GenerateMockData";
import Button from "@/components/Button";

import SalesPage from "../components/pages/Sales";
import ProductsPage from "../components/pages/Products";
import SettingsPage from "../components/pages/Settings";

export default function Page() {
	const [currentPage, setCurrentPage] = useState<
		"sales" | "products" | "settings"
	>("sales");
	const [data, setData] = useState(generateMockData());
	const [isLoading, setIsLoading] = useState(false);

	// Simulated data refresh function
	const refreshData = () => {
		setIsLoading(true);
		// Simulate API call
		setTimeout(() => {
			setData(generateMockData());
			setIsLoading(false);
		}, 1000);
	};

	return (
		<div className="flex flex-col h-screen bg-gray-100">
			{/* Page Header */}
			<header className="bg-white shadow-sm p-4 flex justify-between items-center">
				<h1 className="text-xl font-bold text-gray-800">
					{currentPage === "sales"
						? "Customer Sales updated 2"
						: currentPage === "products"
						? "Product Inventory"
						: "App Settings"}
				</h1>
				<Button variant="secondary" size="sm" onClick={refreshData}>
					<RefreshCw
						size={18}
						className={`${isLoading ? "animate-spin" : ""}`}
					/>
				</Button>
			</header>

			{/* Main Content Area */}
			<div
				className="flex-grow overflow-y-auto overscroll-contain touch-pan-y"
				style={{
					// Prevent pull-to-refresh and bouncy scrolling on iOS
					WebkitOverflowScrolling: "touch",
					overscrollBehavior: "contain",
				}}>
				{currentPage === "sales" && (
					<SalesPage
						customers={data.customers}
						products={data.products}
					/>
				)}
				{currentPage === "products" && (
					<ProductsPage products={data.products} />
				)}
				{currentPage === "settings" && <SettingsPage />}
			</div>

			{/* Bottom Navigation */}
			<nav className="bg-white border-t border-gray-200 flex justify-around py-3 sticky">
				{[
					{ page: "sales", icon: ShoppingCart, label: "Sales" },
					{ page: "products", icon: Smartphone, label: "Products" },
					{ page: "settings", icon: Settings, label: "Settings" },
				].map(({ page, icon: Icon, label }) => (
					<button
						key={page}
						onClick={() =>
							setCurrentPage(
								page as "sales" | "products" | "settings"
							)
						}
						className={`flex flex-col items-center transform transition-all duration-300 ${
							currentPage === page
								? "text-blue-600 scale-110"
								: "text-gray-500 hover:text-blue-400"
						}`}>
						<Icon />
						<span className="text-xs mt-1">{label}</span>
					</button>
				))}
			</nav>
		</div>
	);
}
