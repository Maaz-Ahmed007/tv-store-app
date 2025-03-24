import Button from "../Button";

export default function SettingsPage() {
	return (
		<div className="p-4 space-y-4">
			<div className="bg-white rounded-lg shadow-md p-4">
				<h2 className="text-lg font-semibold mb-3">Account Settings</h2>
				<div className="space-y-3">
					<div className="flex justify-between items-center">
						<span className="text-gray-600">Name</span>
						<Button variant="secondary" size="sm">
							Edit
						</Button>
					</div>
					<div className="flex justify-between items-center">
						<span className="text-gray-600">Email</span>
						<Button variant="secondary" size="sm">
							Edit
						</Button>
					</div>
				</div>
			</div>

			<div className="bg-white rounded-lg shadow-md p-4">
				<h2 className="text-lg font-semibold mb-3">App Preferences</h2>
				<div className="space-y-3">
					<div className="flex justify-between items-center">
						<span className="text-gray-600">Dark Mode</span>
						<input
							type="checkbox"
							className="form-checkbox h-5 w-5 text-blue-600"
						/>
					</div>
					<div className="flex justify-between items-center">
						<span className="text-gray-600">Notifications</span>
						<input
							type="checkbox"
							className="form-checkbox h-5 w-5 text-blue-600"
						/>
					</div>
				</div>
			</div>

			<Button variant="danger" className="w-full">
				Logout
			</Button>
		</div>
	);
}
