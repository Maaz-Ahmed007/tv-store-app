"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * A hook that listens for browser back button events and calls the provided callback
 * @param callback Function to call when the back button is pressed
 */
export function useHistoryBack(callback: () => void) {
	const router = useRouter();

	useEffect(() => {
		// Save the current URL to detect back navigation
		const currentUrl = window.location.href;

		// Create a unique state object to push to history
		const historyState = { modalOpen: true, id: Date.now() };

		// Push current state to history stack
		window.history.pushState(historyState, "", currentUrl);

		// Handler for popstate event (triggered on back button)
		const handlePopState = (event: PopStateEvent) => {
			callback();
		};

		// Add event listener
		window.addEventListener("popstate", handlePopState);

		// Clean up
		return () => {
			window.removeEventListener("popstate", handlePopState);
		};
	}, [callback]);
}