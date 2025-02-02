"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Settings, Maximize, Minimize } from "lucide-react";

import { Button } from "@/components/ui/button";

const Navbar = () => {
	const [isFullScreen, setIsFullScreen] = useState(false);

	const toggleFullScreen = () => {
		if (!document.fullscreenElement) {
			document.documentElement.requestFullscreen();
			setIsFullScreen(true);
		} else {
			if (document.exitFullscreen) {
				document.exitFullscreen();
				setIsFullScreen(false);
			}
		}
	};

	useEffect(() => {
		const handleFullScreenChange = () => {
			setIsFullScreen(!!document.fullscreenElement);
		};

		const handleKeyPress = (event: KeyboardEvent) => {
			if (event.ctrlKey && event.key === "f") {
				event.preventDefault();
				toggleFullScreen();
			}
		};

		document.addEventListener("fullscreenchange", handleFullScreenChange);
		document.addEventListener("keydown", handleKeyPress);

		return () => {
			document.removeEventListener(
				"fullscreenchange",
				handleFullScreenChange
			);
			document.removeEventListener("keydown", handleKeyPress);
		};
	}, []);

	return (
		<nav className="bg-white border-b border-blue-200 fixed top-0 w-full z-30 shadow-sm">
			<div className="flex justify-between items-center h-16 px-4 sm:px-6 lg:px-8">
				{/* Logo on the left */}
				<div className="flex-shrink-0 flex items-center">
					<Link href="/" className="text-2xl font-bold text-gray-900">
						Olive<span className="text-blue-600">AI</span>
					</Link>
				</div>

				{/* Buttons on the right */}
				<div className="flex items-center space-x-2">
					<Button
						variant="outlineIcon"
						size="icon"
						className="text-gray-500 hover:text-blue-600 transition-colors duration-200 hidden md:flex"
						onClick={toggleFullScreen}
						title="Toggle Full Screen (Ctrl + F)">
						{isFullScreen ? (
							<Minimize className="h-5 w-5" />
						) : (
							<Maximize className="h-5 w-5" />
						)}
					</Button>
					<Button
						variant="outlineIcon"
						size="icon"
						className="text-gray-500 hover:text-blue-600 transition-colors duration-200">
						<Settings className="h-5 w-5" />
					</Button>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
