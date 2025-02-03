import { RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

interface HeaderProps {
	title: string;
	showReload?: boolean;
	onReload?: () => void;
	children?: React.ReactNode;
}

export default function Header({
	title,
	showReload = false,
	onReload,
	children,
}: HeaderProps) {
	const handleReload = () => {
		if (onReload) {
			onReload();
		}
	};

	return (
		<header className="sticky top-0 bg-white z-10 shadow-sm">
			<div className="flex items-center justify-between p-4">
				<h1 className="text-2xl font-bold text-blue-600">{title}</h1>
				<div className="flex items-center space-x-2">
					{children}
					{showReload && (
						<motion.button
							onClick={handleReload}
							className="p-2 text-blue-600 hover:bg-blue-100 rounded-full"
							aria-label="Reload"
							whileTap={{ scale: 0.9 }}>
							<motion.div
								animate={{ rotate: 360 }}
								transition={{
									duration: 1,
									repeat: Number.POSITIVE_INFINITY,
									ease: "linear",
								}}>
								<RefreshCw className="w-6 h-6" />
							</motion.div>
						</motion.button>
					)}
				</div>
			</div>
		</header>
	);
}
