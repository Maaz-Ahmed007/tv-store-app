"use client";

import { useState } from "react";
import { ShoppingCart, Settings, Smartphone } from "lucide-react";

import SalesPage from "../components/pages/Sales";
import ProductsPage from "../components/pages/Products";
import SettingsPage from "../components/pages/Settings";

export default function Page() {
	const [currentPage, setCurrentPage] = useState<
		"sales" | "products" | "settings"
	>("sales");

	return (
		<div className="flex flex-col h-screen bg-gray-100">
			{/* Main Content Area */}
			<div className="flex-grow overflow-y-auto p-4">
				{currentPage === "sales" && <SalesPage />}
				{currentPage === "products" && <ProductsPage />}
				{currentPage === "settings" && <SettingsPage />}
			</div>

			{/* Bottom Navigation */}
			<nav className="bg-white border-t border-gray-200 flex justify-around py-3">
				<button
					onClick={() => setCurrentPage("sales")}
					className={`flex flex-col items-center ${
						currentPage === "sales"
							? "text-blue-600"
							: "text-gray-500"
					}`}>
					<ShoppingCart />
					<span className="text-xs">Sales</span>
				</button>
				<button
					onClick={() => setCurrentPage("products")}
					className={`flex flex-col items-center ${
						currentPage === "products"
							? "text-blue-600"
							: "text-gray-500"
					}`}>
					<Smartphone />
					<span className="text-xs">Products</span>
				</button>
				<button
					onClick={() => setCurrentPage("settings")}
					className={`flex flex-col items-center ${
						currentPage === "settings"
							? "text-blue-600"
							: "text-gray-500"
					}`}>
					<Settings />
					<span className="text-xs">Settings</span>
				</button>
			</nav>
		</div>
	);
}
