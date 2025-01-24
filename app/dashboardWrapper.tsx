"use client";

import { useState, useEffect } from "react";

import Navbar from "@/components/my-components/Navbar";
import Sidebar from "@/components/my-components/Sidebar";

const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
	const [isMobile, setIsMobile] = useState(false);
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const checkMobile = () => {
			const isMobileView = window.innerWidth < 768;
			setIsMobile(isMobileView);
			setIsLoading(false);
		};
		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	return (
		<div className="min-h-screen bg-blue-50">
			<Navbar />
			<div className="flex pt-16">
				{!isLoading && (
					<>
						{!isMobile && (
							<div
								className={`transition-all duration-300 ease-in-out ${
									isSidebarOpen ? "w-64" : "w-20"
								}`}>
								<Sidebar
									isOpen={isSidebarOpen}
									setIsOpen={setIsSidebarOpen}
								/>
							</div>
						)}
						{isMobile && (
							<Sidebar
								isOpen={isSidebarOpen}
								setIsOpen={setIsSidebarOpen}
							/>
						)}
					</>
				)}
				<div className="flex-1 transition-all duration-300 ease-in-out">
					<main className="p-6 pb-20 md:pb-6 px-4 md:px-6">
						{children}
					</main>
				</div>
			</div>
			{isMobile && (
				<Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
			)}
		</div>
	);
};

export default DashboardWrapper;
