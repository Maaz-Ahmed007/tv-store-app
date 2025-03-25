const PopupMenu = ({
	onClose,
	options,
}: {
	onClose: () => void;
	options: Array<{
		label: string;
		icon: React.ElementType;
		onClick: () => void;
	}>;
}) => {
	return (
		<div
			className="fixed inset-0 bg-black/50 bg-opacity-50 z-50 flex items-center justify-center"
			onClick={onClose}>
			<div
				className="bg-white rounded-lg w-64 shadow-xl overflow-hidden animate-fadeIn"
				onClick={(e) => e.stopPropagation()}>
				{options.map((option, index) => (
					<button
						key={index}
						onClick={() => {
							option.onClick();
							onClose();
						}}
						className="w-full flex items-center p-4 hover:bg-gray-100 transition-colors border-b last:border-b-0">
						<option.icon className="mr-3 text-gray-600" size={20} />
						<span>{option.label}</span>
					</button>
				))}
			</div>
		</div>
	);
};

export default PopupMenu;
