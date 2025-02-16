import BottomNav from "./BottomNav";

interface DashboardWrapperProps {
	children: React.ReactNode;
}

export default function DashboardWrapper({ children }: DashboardWrapperProps) {
	return (
		<div className="flex flex-col min-h-screen bg-gray-50">
			<main className="flex-grow pb-16">{children}</main>
			<BottomNav />
		</div>
	);
}