const Button = ({
	children,
	variant = "primary",
	size = "md",
	className = "",
	onClick,
}: {
	children: React.ReactNode;
	variant?: "primary" | "secondary" | "danger";
	size?: "sm" | "md" | "lg";
	className?: string;
	onClick?: () => void;
}) => {
	const variantStyles = {
		primary: "bg-blue-600 text-white hover:bg-blue-700",
		secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
		danger: "bg-red-500 text-white hover:bg-red-600",
	};

	const sizeStyles = {
		sm: "px-2 py-2 text-xs",
		md: "px-4 py-2 text-sm",
		lg: "px-6 py-3 text-base",
	};

	return (
		<button
			onClick={onClick}
			className={`${variantStyles[variant]} ${sizeStyles[size]} rounded-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500${className}`}>
			{children}
		</button>
	);
};

export default Button;
