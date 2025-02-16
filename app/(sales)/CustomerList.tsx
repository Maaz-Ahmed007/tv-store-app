// ✅ Customer Validations Types
import { GetCustomerTypes } from "@/utils/validations";
import Link from "next/link";

interface Props {
	customers: GetCustomerTypes[];
}

export default function CustomerList({ customers }: Props) {
	return (
		<div className="space-y-4">
			{/* TODO: We will display customers in table with name and balance amount only. */}
			{/* TODO: Create individual customer page that will open when user clicks on customers */}
			{customers.map((customer) => (
				<Link key={customer.id} href={`/sales/customers/${customer.id}`} passHref>
					<div
						className="border p-4 rounded-lg flex flex-row justify-between items-center cursor-pointer">
						{/* TODO: each row of table will have columns for name, sales and balance */}
						<h3 className="font-bold">{customer.name}</h3>
						<p className="text-sm text-gray-600">
							Total Sales: {customer.sales?.length || 0}
						</p>
						{/* TODO: Fetch proper final balance of each customer */}
						<p className="text-sm text-gray-600">
							Total Balance: 0
						</p>
					</div>
				</Link>
			))}
		</div>
	);
}
