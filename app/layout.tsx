import type { Metadata } from "next";
import "./globals.css";

import { Inter } from "next/font/google";

import DashboardWrapper from "@/app/dashboardWrapper";

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
			<body
				className={`${inter.className} relative bg-white antialiased hide-scrollbar`}>
				<DashboardWrapper>{children}</DashboardWrapper>
			</body>
		</html>
	);
}
