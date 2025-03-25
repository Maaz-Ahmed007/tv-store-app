import { Suspense } from "react";

import SalesPageClient from "../SalesPageClient";

type Customer = {
	id: string;
	name: string;
	email: string;
	phone: string;
	totalPurchases: number;
	totalPaid: number;
	remainingBalance: number;
	transactions: Transaction[];
};

type Transaction = {
	id: string;
	type: "sale" | "payment" | "refund";
	date: string;
	amount: number;
	productId?: string;
	paymentMethod?: "cash" | "credit" | "installment";
	installmentDetails?: {
		totalInstallments: number;
		paidInstallments: number;
		remainingBalance: number;
	};
};

type Product = {
	id: string;
	name: string;
	brand: string;
	model: string;
	price: number;
	stock: number;
	imageUrl: string;
};

export default function SalesPage({
	customers,
	products,
}: {
	customers: Customer[];
	products: Product[];
}) {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<SalesPageClient customers={customers} products={products} />
		</Suspense>
	);
}
