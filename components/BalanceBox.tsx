import { Button } from "./ui/button";

interface Props {
	type: "credit" | "debit";
	amount: number;
	onToggle: (type: "credit" | "debit" | null) => void;
	isSelected: boolean;
}

export default function BalanceBox({
	type,
	amount,
	onToggle,
	isSelected,
}: Props) {
	const handleClick = () => {
		onToggle(isSelected ? null : type);
	};

	return (
		<Button
			className={`w-full h-24 text-left p-4 rounded-lg transition-all ${
				type === "credit"
					? isSelected
						? "bg-green-600 text-white"
						: "bg-green-100 text-green-700 hover:bg-green-200"
					: isSelected
					? "bg-red-600 text-white"
					: "bg-red-100 text-red-700 hover:bg-red-200"
			}`}
			onClick={handleClick}>
			<div className="font-semibold text-lg">
				{type === "credit" ? "Credit" : "Debit"}
			</div>
			<div className="text-2xl font-bold">${amount}</div>
		</Button>
	);
}
