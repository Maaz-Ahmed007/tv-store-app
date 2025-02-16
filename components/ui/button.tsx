import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
	"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
	{
		variants: {
			variant: {
				default:
					"bg-primary text-primary-foreground hover:bg-primary/90",
				blue: "bg-gradient-to-r from-blue-500 to-blue-600 text-white dark:text-gray-200 shadow-lg hover:from-blue-500 hover:to-blue-400 dark:from-blue-600 dark:to-blue-700 dark:hover:from-blue-600 dark:hover:to-blue-500 focus-visible:outline-blue-400",
				red: "bg-gradient-to-r from-red-500 to-red-600 text-white dark:text-gray-200 shadow-lg hover:from-red-500 hover:to-red-400 dark:from-red-600 dark:to-red-700 dark:hover:from-red-600 dark:hover:to-red-500 focus-visible:outline-red-400",
				outline:
					"border-2 border-blue-500 bg-transparent text-blue-500 hover:border-blue-500 hover:bg-gradient-to-r hover:from-transparent hover:to-blue-200 hover:text-blue-600 dark:bg-transparent dark:border-blue-800 dark:text-gray-200 dark:hover:bg-gradient-to-r dark:hover:from-transparent dark:hover:to-blue-600 hover:dark:border-blue-600 dark:hover:text-blue-400 focus-visible:outline-blue-200",
				blueIcon:
					"bg-gradient-to-r from-blue-500 to-blue-600 text-white dark:text-gray-200 shadow-lg hover:from-blue-500 hover:to-blue-400 dark:from-blue-600 dark:to-blue-700 dark:hover:from-blue-600 dark:hover:to-blue-500 focus-visible:outline-blue-400",
				redIcon:
					"bg-gradient-to-r from-red-500 to-red-600 text-white dark:text-gray-200 shadow-lg hover:from-red-500 hover:to-red-400 dark:from-red-600 dark:to-red-700 dark:hover:from-red-600 dark:hover:to-red-500 focus-visible:outline-red-400",
				outlineIcon:
					"border bg-white text-blue-500 hover:border-blue-500 hover:bg-blue-200 hover:text-blue-600 dark:bg-transparent dark:border-blue-950 dark:text-gray-200 dark:hover:bg-gradient-to-r dark:hover:bg-blue-800 hover:dark:border-blue-600 dark:hover:text-blue-400 focus-visible:outline-blue-200",
				ghost: "bg-transparent text-blue-600 hover:bg-blue-50 hover:text-blue-700 dark:text-blue-400 dark:hover:bg-blue-950 dark:hover:text-blue-300",
			},
			size: {
				default: "h-10 px-4 py-2",
				sm: "h-9 rounded-md px-2",
				lg: "h-11 rounded-md px-8",
				icon: "h-10 w-10",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	}
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : "button";
		return (
			<Comp
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref}
				{...props}
			/>
		);
	}
);
Button.displayName = "Button";

export { Button, buttonVariants };