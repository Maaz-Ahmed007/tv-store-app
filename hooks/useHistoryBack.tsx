"use client";

import { useEffect, useRef } from "react";

/**
 * A hook that listens for browser back button events and calls the provided callback
 * @param callback Function to call when the back button is pressed
 * @param modalId Unique identifier for this modal to track in history state
 * @param isActive Whether this modal is currently active/visible
 */
export function useHistoryBack(
	callback: () => void,
	modalId: string,
	isActive = true
) {
	// Keep track of whether we've pushed state for this modal
	const hasAddedHistoryEntry = useRef(false);

	useEffect(() => {
		// Only add history entry if the modal is active and we haven't already added one
		if (isActive && !hasAddedHistoryEntry.current) {
			// Create a unique state object with an identifier for this specific modal
			const historyState = {
				modalOpen: true,
				modalId: modalId,
				timestamp: Date.now(),
			};

			// Push current state to history stack
			window.history.pushState(historyState, "", window.location.href);
			hasAddedHistoryEntry.current = true;
		}

		// Handler for popstate event (triggered on back button)
		const handlePopState = (event: PopStateEvent) => {
			// Check if this is our modal's popstate event
			if (
				isActive &&
				(!event.state ||
					event.state.modalId === modalId ||
					!event.state.modalId)
			) {
				callback();
			}
		};

		// Add event listener only if the modal is active
		if (isActive) {
			window.addEventListener("popstate", handlePopState);
		}

		// Clean up
		return () => {
			window.removeEventListener("popstate", handlePopState);

			// If component is unmounting and we added a history entry, we need to
			// make sure we don't leave the history in a bad state
			if (!isActive && hasAddedHistoryEntry.current) {
				hasAddedHistoryEntry.current = false;
			}
		};
	}, [callback, modalId, isActive]);
}
