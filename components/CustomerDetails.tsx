import { Button } from "@/components/ui/button";

import { GetCustomerTypes } from "@/utils/validations";

interface Props {
	customer: GetCustomerTypes;
}

export default function CustomerDetails({ customer }: Props) {
	return (
		<div className="space-y-4">
			<h2 className="text-xl font-semibold">{customer.name}</h2>
			<p>Phone: {customer.phone || "N/A"}</p>
			<h3 className="text-lg font-semibold mt-4">Sales</h3>
			<table className="w-full">
				<thead>
					<tr className="bg-gray-100">
						<th className="p-2 text-left">Date</th>
						<th className="p-2 text-left">Amount</th>
					</tr>
				</thead>
				<tbody>
					{customer.sales?.map((sale) => (
						<tr key={sale.id} className="border-b">
							<td className="p-2">
								{new Date(sale.createdAt).toLocaleDateString()}
							</td>
							<td className="p-2">
								{sale.totalAmount.toFixed(2)}
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<div className="mt-4">
				<Button variant="blue">Add Sale</Button>
			</div>
		</div>
	);
}
