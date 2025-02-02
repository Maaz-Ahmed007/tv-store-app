"use client";

import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import Sales from "@/app/sales/page";
import Products from "@/app/products/page";
import Expenses from "@/app/expenses/page";
import Settings from "@/app/settings/page";
import { useSwipeableViewsContext } from "./SwipeableViewsContext";

const views = [
	{ component: Sales, name: "Sales" },
	{ component: Products, name: "Products" },
	{ component: Expenses, name: "Expenses" },
	{ component: Settings, name: "Settings" },
];

export default function SwipeableViews() {
	const context = useSwipeableViewsContext();
	const [localActiveIndex, setLocalActiveIndex] = useState(0);

	const activeIndex = context ? context.activeIndex : localActiveIndex;
	const setActiveIndex = context
		? context.setActiveIndex
		: setLocalActiveIndex;

	const handlers = useSwipeable({
		onSwipedLeft: () =>
			setActiveIndex((prev) => Math.min(prev + 1, views.length - 1)),
		onSwipedRight: () => setActiveIndex((prev) => Math.max(prev - 1, 0)),
		trackMouse: true,
	});

	return (
		<div {...handlers} className="flex-grow overflow-hidden">
			<div
				className="flex transition-transform duration-300 ease-out h-full"
				style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
				{views.map(({ component: Component, name }) => (
					<div
						key={name}
						className="w-full flex-shrink-0 overflow-y-auto">
						<Component />
					</div>
				))}
			</div>
		</div>
	);
}