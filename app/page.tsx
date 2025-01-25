import { Separator } from "@/components/ui/separator";

export default function DashboardPage() {
	return (
		<div className="space-y-4">
			<div className="bg-white py-4 px-4 md:px-6 border border-blue-200 rounded-lg shadow-sm shadow-blue-200">
				<div className="flex justify-center md:justify-between items-center pb-2">
					<h1 className="text-2xl text-gray-800 font-semibold leading-none tracking-tight">
						Dashboard
					</h1>
				</div>

				<Separator className="bg-blue-100 mb-4" />
			</div>
		</div>
	);
}