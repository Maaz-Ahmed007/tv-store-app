"use client";

import type React from "react";
import { createContext, useContext, useState } from "react";

type SwipeableViewsContextType = {
	activeIndex: number;
	setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
};

const SwipeableViewsContext = createContext<
	SwipeableViewsContextType | undefined
>(undefined);

export function SwipeableViewsProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [activeIndex, setActiveIndex] = useState(0);

	return (
		<SwipeableViewsContext.Provider value={{ activeIndex, setActiveIndex }}>
			{children}
		</SwipeableViewsContext.Provider>
	);
}

export function useSwipeableViewsContext() {
	const context = useContext(SwipeableViewsContext);
	if (context === undefined) {
		throw new Error(
			"useSwipeableViewsContext must be used within a SwipeableViewsProvider"
		);
	}
	return context;
}
