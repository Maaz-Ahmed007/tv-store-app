export default function SettingsPage() {
	return (
		<div>
			<h1 className="text-2xl font-bold mb-4">App Settings</h1>

			<div className="space-y-4">
				{/* Account Settings Section */}
				<section className="bg-white rounded-lg p-4 shadow-sm">
					<h2 className="font-semibold mb-2">Account</h2>
					<div className="space-y-2">
						<div className="flex justify-between items-center">
							<span>Name</span>
							<button className="text-blue-500">Edit</button>
						</div>
						<div className="flex justify-between items-center">
							<span>Email</span>
							<button className="text-blue-500">Edit</button>
						</div>
					</div>
				</section>

				{/* App Preferences Section */}
				<section className="bg-white rounded-lg p-4 shadow-sm">
					<h2 className="font-semibold mb-2">App Preferences</h2>
					<div className="space-y-2">
						<div className="flex justify-between items-center">
							<span>Dark Mode</span>
							<input type="checkbox" className="form-checkbox" />
						</div>
						<div className="flex justify-between items-center">
							<span>Notifications</span>
							<input type="checkbox" className="form-checkbox" />
						</div>
					</div>
				</section>

				{/* Logout Button */}
				<button className="w-full bg-red-500 text-white py-2 rounded">
					Logout
				</button>
			</div>
		</div>
	);
}
