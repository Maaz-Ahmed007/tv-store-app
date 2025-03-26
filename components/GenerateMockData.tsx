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

const generateMockData = () => {
	const customers: Customer[] = [
		{
			id: "1",
			name: "John Doe",
			email: "john.doe@example.com",
			phone: "123-456-7890",
			totalPurchases: 5000,
			totalPaid: 3500,
			remainingBalance: 1500,
			transactions: [
				{
					id: "t1",
					type: "sale",
					date: "2024-03-15",
					amount: 1200,
					productId: "p1",
					paymentMethod: "cash",
				},
			],
		},
		{
			id: "2",
			name: "Jane Smith",
			email: "jane.smith@example.com",
			phone: "987-654-3210",
			totalPurchases: 5000,
			totalPaid: 3500,
			remainingBalance: 1500,
			transactions: [
				{
					id: "t1",
					type: "sale",
					date: "2024-03-15",
					amount: 1200,
					productId: "p1",
					paymentMethod: "cash",
				},
			],
		},
		{
			id: "3",
			name: "Jane Smith",
			email: "jane.smith@example.com",
			phone: "987-654-3210",
			totalPurchases: 5000,
			totalPaid: 3500,
			remainingBalance: 1500,
			transactions: [
				{
					id: "t1",
					type: "sale",
					date: "2024-03-15",
					amount: 1200,
					productId: "p1",
					paymentMethod: "cash",
				},
			],
		},
		{
			id: "4",
			name: "Jane Smith",
			email: "jane.smith@example.com",
			phone: "987-654-3210",
			totalPurchases: 5000,
			totalPaid: 3500,
			remainingBalance: 1500,
			transactions: [
				{
					id: "t1",
					type: "sale",
					date: "2024-03-15",
					amount: 1200,
					productId: "p1",
					paymentMethod: "cash",
				},
			],
		},
		{
			id: "5",
			name: "Jane Smith",
			email: "jane.smith@example.com",
			phone: "987-654-3210",
			totalPurchases: 5000,
			totalPaid: 3500,
			remainingBalance: 1500,
			transactions: [
				{
					id: "t1",
					type: "sale",
					date: "2024-03-15",
					amount: 1200,
					productId: "p1",
					paymentMethod: "cash",
				},
			],
		},
		{
			id: "6",
			name: "Jane Smith",
			email: "jane.smith@example.com",
			phone: "987-654-3210",
			totalPurchases: 5000,
			totalPaid: 3500,
			remainingBalance: 1500,
			transactions: [
				{
					id: "t1",
					type: "sale",
					date: "2024-03-15",
					amount: 1200,
					productId: "p1",
					paymentMethod: "cash",
				},
			],
		},
		{
			id: "7",
			name: "Jane Smith",
			email: "jane.smith@example.com",
			phone: "987-654-3210",
			totalPurchases: 5000,
			totalPaid: 3500,
			remainingBalance: 1500,
			transactions: [
				{
					id: "t1",
					type: "sale",
					date: "2024-03-15",
					amount: 1200,
					productId: "p1",
					paymentMethod: "cash",
				},
			],
		},
		{
			id: "8",
			name: "Jane Smith",
			email: "jane.smith@example.com",
			phone: "987-654-3210",
			totalPurchases: 5000,
			totalPaid: 3500,
			remainingBalance: 1500,
			transactions: [
				{
					id: "t1",
					type: "sale",
					date: "2024-03-15",
					amount: 1200,
					productId: "p1",
					paymentMethod: "cash",
				},
			],
		},
		{
			id: "9",
			name: "Jane Smith",
			email: "jane.smith@example.com",
			phone: "987-654-3210",
			totalPurchases: 5000,
			totalPaid: 3500,
			remainingBalance: 1500,
			transactions: [
				{
					id: "t1",
					type: "sale",
					date: "2024-03-15",
					amount: 1200,
					productId: "p1",
					paymentMethod: "cash",
				},
			],
		},
		{
			id: "10",
			name: "Jane Smith",
			email: "jane.smith@example.com",
			phone: "987-654-3210",
			totalPurchases: 5000,
			totalPaid: 3500,
			remainingBalance: 1500,
			transactions: [
				{
					id: "t1",
					type: "sale",
					date: "2024-03-15",
					amount: 1200,
					productId: "p1",
					paymentMethod: "cash",
				},
			],
		},
		{
			id: "11",
			name: "Jane Smith",
			email: "jane.smith@example.com",
			phone: "987-654-3210",
			totalPurchases: 5000,
			totalPaid: 3500,
			remainingBalance: 1500,
			transactions: [
				{
					id: "t1",
					type: "sale",
					date: "2024-03-15",
					amount: 1200,
					productId: "p1",
					paymentMethod: "cash",
				},
			],
		},
	];

	const products: Product[] = [
		{
			id: "p1",
			name: "Samsung QLED 4K",
			brand: "Samsung",
			model: "Q80A",
			price: 1299,
			stock: 5,
			imageUrl: "/api/placeholder/300/200",
		},
		{
			id: "p2",
			name: "LG OLED TV",
			brand: "LG",
			model: "C1 Series",
			price: 1599,
			stock: 3,
			imageUrl: "/api/placeholder/300/200",
		},
		{
			id: "p3",
			name: "Samsung QLED 4K",
			brand: "Samsung",
			model: "Q80A",
			price: 1299,
			stock: 5,
			imageUrl: "/api/placeholder/300/200",
		},
		{
			id: "p4",
			name: "LG OLED TV",
			brand: "LG",
			model: "C1 Series",
			price: 1599,
			stock: 3,
			imageUrl: "/api/placeholder/300/200",
		},
		{
			id: "p5",
			name: "Samsung QLED 4K",
			brand: "Samsung",
			model: "Q80A",
			price: 1299,
			stock: 5,
			imageUrl: "/api/placeholder/300/200",
		},
		{
			id: "p6",
			name: "LG OLED TV",
			brand: "LG",
			model: "C1 Series",
			price: 1599,
			stock: 3,
			imageUrl: "/api/placeholder/300/200",
		},
		{
			id: "p7",
			name: "Samsung QLED 4K",
			brand: "Samsung",
			model: "Q80A",
			price: 1299,
			stock: 5,
			imageUrl: "/api/placeholder/300/200",
		},
		{
			id: "p8",
			name: "LG OLED TV",
			brand: "LG",
			model: "C1 Series",
			price: 1599,
			stock: 3,
			imageUrl: "/api/placeholder/300/200",
		},
		{
			id: "p9",
			name: "Samsung QLED 4K",
			brand: "Samsung",
			model: "Q80A",
			price: 1299,
			stock: 5,
			imageUrl: "/api/placeholder/300/200",
		},
		{
			id: "p10",
			name: "LG OLED TV",
			brand: "LG",
			model: "C1 Series",
			price: 1599,
			stock: 3,
			imageUrl: "/api/placeholder/300/200",
		},
		{
			id: "p11",
			name: "Samsung QLED 4K",
			brand: "Samsung",
			model: "Q80A",
			price: 1299,
			stock: 5,
			imageUrl: "/api/placeholder/300/200",
		},
		{
			id: "p12",
			name: "LG OLED TV",
			brand: "LG",
			model: "C1 Series",
			price: 1599,
			stock: 3,
			imageUrl: "/api/placeholder/300/200",
		},
		{
			id: "p13",
			name: "Samsung QLED 4K",
			brand: "Samsung",
			model: "Q80A",
			price: 1299,
			stock: 5,
			imageUrl: "/api/placeholder/300/200",
		},
		{
			id: "p14",
			name: "LG OLED TV",
			brand: "LG",
			model: "C1 Series",
			price: 1599,
			stock: 3,
			imageUrl: "/api/placeholder/300/200",
		},
		{
			id: "p15",
			name: "Samsung QLED 4K",
			brand: "Samsung",
			model: "Q80A",
			price: 1299,
			stock: 5,
			imageUrl: "/api/placeholder/300/200",
		},
		{
			id: "p16",
			name: "LG OLED TV",
			brand: "LG",
			model: "C1 Series",
			price: 1599,
			stock: 3,
			imageUrl: "/api/placeholder/300/200",
		},
		{
			id: "p17",
			name: "Samsung QLED 4K",
			brand: "Samsung",
			model: "Q80A",
			price: 1299,
			stock: 5,
			imageUrl: "/api/placeholder/300/200",
		},
		{
			id: "p18",
			name: "LG OLED TV",
			brand: "LG",
			model: "C1 Series",
			price: 1599,
			stock: 3,
			imageUrl: "/api/placeholder/300/200",
		},
		{
			id: "p19",
			name: "Samsung QLED 4K",
			brand: "Samsung",
			model: "Q80A",
			price: 1299,
			stock: 5,
			imageUrl: "/api/placeholder/300/200",
		},
		{
			id: "p20",
			name: "LG OLED TV",
			brand: "LG",
			model: "C1 Series",
			price: 1599,
			stock: 3,
			imageUrl: "/api/placeholder/300/200",
		},
		{
			id: "p21",
			name: "Samsung QLED 4K",
			brand: "Samsung",
			model: "Q80A",
			price: 1299,
			stock: 5,
			imageUrl: "/api/placeholder/300/200",
		},
		{
			id: "p22",
			name: "LG OLED TV",
			brand: "LG",
			model: "C1 Series",
			price: 1599,
			stock: 3,
			imageUrl: "/api/placeholder/300/200",
		},
		{
			id: "p23",
			name: "Samsung QLED 4K",
			brand: "Samsung",
			model: "Q80A",
			price: 1299,
			stock: 5,
			imageUrl: "/api/placeholder/300/200",
		},
		{
			id: "p24",
			name: "LG OLED TV",
			brand: "LG",
			model: "C1 Series",
			price: 1599,
			stock: 3,
			imageUrl: "/api/placeholder/300/200",
		},
	];

	return { customers, products };
};

export default generateMockData;
