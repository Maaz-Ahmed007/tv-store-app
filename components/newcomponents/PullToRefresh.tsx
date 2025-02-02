"use client";

import { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import { ArrowDownCircle } from "lucide-react";
import type React from "react";

export default function PullToRefresh({
	onRefresh,
	children,
}: {
	onRefresh: () => void;
	children: React.ReactNode;
}) {
	const [pullDistance, setPullDistance] = useState(0);
	const [refreshing, setRefreshing] = useState(false);
	const threshold = 100;

	const handlers = useSwipeable({
		onSwiping: (event) => {
			if (event.deltaY > 0 && window.scrollY === 0) {
				setPullDistance(event.deltaY);
			}
		},
		onSwiped: () => {
			if (pullDistance > threshold) {
				setRefreshing(true);
				onRefresh();
			}
			setPullDistance(0);
		},
	});

	useEffect(() => {
		if (refreshing) {
			const timer = setTimeout(() => setRefreshing(false), 2000);
			return () => clearTimeout(timer);
		}
	}, [refreshing]);

	return (
		<div {...handlers} className="min-h-full relative">
			{pullDistance > 0 && (
				<div
					className="absolute top-0 left-0 right-0 flex justify-center items-center transition-all duration-300 ease-out"
					style={{
						height: `${Math.min(pullDistance, threshold)}px`,
					}}>
					{refreshing ? (
						<ArrowDownCircle className="animate-spin text-blue-600" />
					) : (
						<ArrowDownCircle
							className="text-blue-600 transition-transform duration-300 ease-out"
							style={{
								transform: `rotate(${Math.min(
									(pullDistance / threshold) * 180,
									180
								)}deg)`,
							}}
						/>
					)}
				</div>
			)}
			{children}
		</div>
	);
}
