type Customer = {
	id: string;
	name: string;
	email: string;
	phone: string;
	totalPurchases: number;
	remainingPayment: number;
	transactions: Transaction[];
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

type Transaction = {
	id: string;
	customerId: string;
	productId: string;
	date: string;
	amount: number;
	isPaid: boolean;
};

const generateMockData = () => {
	const customers: Customer[] = [
		{
			id: "1",
			name: "John Doe",
			email: "john.doe@example.com",
			phone: "123-456-7890",
			totalPurchases: 5000,
			remainingPayment: 1500,
			transactions: [
				{
					id: "t1",
					customerId: "1",
					productId: "p1",
					date: "2024-03-15",
					amount: 1200,
					isPaid: false,
				},
			],
		},
		{
			id: "2",
			name: "Jane Smith",
			email: "jane.smith@example.com",
			phone: "987-654-3210",
			totalPurchases: 7500,
			remainingPayment: 2500,
			transactions: [
				{
					id: "t2",
					customerId: "2",
					productId: "p2",
					date: "2024-03-20",
					amount: 2000,
					isPaid: true,
				},
			],
		},
		{
			id: "2",
			name: "Jane Smith",
			email: "jane.smith@example.com",
			phone: "987-654-3210",
			totalPurchases: 7500,
			remainingPayment: 2500,
			transactions: [
				{
					id: "t2",
					customerId: "2",
					productId: "p2",
					date: "2024-03-20",
					amount: 2000,
					isPaid: true,
				},
			],
		},
		{
			id: "2",
			name: "Jane Smith",
			email: "jane.smith@example.com",
			phone: "987-654-3210",
			totalPurchases: 7500,
			remainingPayment: 2500,
			transactions: [
				{
					id: "t2",
					customerId: "2",
					productId: "p2",
					date: "2024-03-20",
					amount: 2000,
					isPaid: true,
				},
			],
		},
		{
			id: "2",
			name: "Jane Smith",
			email: "jane.smith@example.com",
			phone: "987-654-3210",
			totalPurchases: 7500,
			remainingPayment: 2500,
			transactions: [
				{
					id: "t2",
					customerId: "2",
					productId: "p2",
					date: "2024-03-20",
					amount: 2000,
					isPaid: true,
				},
			],
		},
		{
			id: "2",
			name: "Jane Smith",
			email: "jane.smith@example.com",
			phone: "987-654-3210",
			totalPurchases: 7500,
			remainingPayment: 2500,
			transactions: [
				{
					id: "t2",
					customerId: "2",
					productId: "p2",
					date: "2024-03-20",
					amount: 2000,
					isPaid: true,
				},
			],
		},
		{
			id: "2",
			name: "Jane Smith",
			email: "jane.smith@example.com",
			phone: "987-654-3210",
			totalPurchases: 7500,
			remainingPayment: 2500,
			transactions: [
				{
					id: "t2",
					customerId: "2",
					productId: "p2",
					date: "2024-03-20",
					amount: 2000,
					isPaid: true,
				},
			],
		},
		{
			id: "2",
			name: "Jane Smith",
			email: "jane.smith@example.com",
			phone: "987-654-3210",
			totalPurchases: 7500,
			remainingPayment: 2500,
			transactions: [
				{
					id: "t2",
					customerId: "2",
					productId: "p2",
					date: "2024-03-20",
					amount: 2000,
					isPaid: true,
				},
			],
		},
		{
			id: "2",
			name: "Jane Smith",
			email: "jane.smith@example.com",
			phone: "987-654-3210",
			totalPurchases: 7500,
			remainingPayment: 2500,
			transactions: [
				{
					id: "t2",
					customerId: "2",
					productId: "p2",
					date: "2024-03-20",
					amount: 2000,
					isPaid: true,
				},
			],
		},
		{
			id: "2",
			name: "Jane Smith",
			email: "jane.smith@example.com",
			phone: "987-654-3210",
			totalPurchases: 7500,
			remainingPayment: 2500,
			transactions: [
				{
					id: "t2",
					customerId: "2",
					productId: "p2",
					date: "2024-03-20",
					amount: 2000,
					isPaid: true,
				},
			],
		},
		{
			id: "2",
			name: "Jane Smith",
			email: "jane.smith@example.com",
			phone: "987-654-3210",
			totalPurchases: 7500,
			remainingPayment: 2500,
			transactions: [
				{
					id: "t2",
					customerId: "2",
					productId: "p2",
					date: "2024-03-20",
					amount: 2000,
					isPaid: true,
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
	];

	return { customers, products };
};

export default generateMockData;
