export default function LoadingSpinner() {
	return (
		<div className="flex justify-center items-center h-80">
			<div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-700"></div>
		</div>
	);
}