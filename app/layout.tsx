import type { Metadata } from "next";
import "./globals.css";

import { Inter } from "next/font/google";

import BottomNav from "@/components/newcomponents/BottomNav";
import SwipeableViews from "@/components/newcomponents/SwipeableViews";
import { SwipeableViewsProvider } from "@/components/newcomponents/SwipeableViewsContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "TV Store",
	description: "Inventory management system for a TV store",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${inter.className} bg-gray-100 text-gray-900`}>
				<SwipeableViewsProvider>
					<div className="max-w-md mx-auto min-h-screen flex flex-col">
						<SwipeableViews />
						<BottomNav />
					</div>
				</SwipeableViewsProvider>
			</body>
		</html>
	);
}
