"use client";

import { useEffect, useRef } from "react";

// Keep track of open modals across the app
const modalStack: string[] = [];

/**
 * A hook that handles browser back button for multiple modal navigation
 * @param modalId - Unique identifier for the modal
 * @param onClose - Function to call when the modal should close
 */
export function useHistoryBack(modalId: string, onClose: () => void) {
	const isClosingRef = useRef(false);

	useEffect(() => {
		// Add this modal to the stack
		modalStack.push(modalId);

		// Push a new history state for this modal
		const state = { modalId, stackPosition: modalStack.length };
		window.history.pushState(state, "", window.location.href);

		const handlePopState = (event: PopStateEvent) => {
			// Only handle if this is the top-most modal
			if (
				modalStack[modalStack.length - 1] === modalId &&
				!isClosingRef.current
			) {
				isClosingRef.current = true;
				modalStack.pop();
				onClose();
			}
		};

		window.addEventListener("popstate", handlePopState);

		return () => {
			window.removeEventListener("popstate", handlePopState);

			// Clean up this modal from the stack when unmounted
			const index = modalStack.indexOf(modalId);
			if (index > -1) {
				modalStack.splice(index, 1);
			}

			isClosingRef.current = false;
		};
	}, [modalId, onClose]);
}
