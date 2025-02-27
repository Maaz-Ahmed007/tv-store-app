import type {
	GetCustomerTypes,
	GetSaleTypes,
	GetPaymentTypes,
} from "@/utils/validations";

/**
 * Calculates the total amount for a sale based on its items.
 * @param items - Array of sale items
 * @returns The total amount of the sale
 */
export function calculateSaleTotalAmount(
	items: { quantity: number; price: number }[]
): number {
	return items.reduce((total, item) => total + item.price * item.quantity, 0);
}

/**
 * Calculates the balance for a customer based on their sales and payments.
 * @param customer - Customer object with optional sales and payments
 * @returns The calculated balance for the customer
 */
export function calculateCustomerBalance(customer: GetCustomerTypes): number {
	const salesTotal =
		customer.sales?.reduce(
			(total, sale) => total + (sale.totalAmount ?? 0),
			0
		) ?? 0;
	const paymentsTotal =
		customer.payments?.reduce(
			(total, payment) => total + (payment.amount ?? 0),
			0
		) ?? 0;

	return salesTotal - paymentsTotal;
}

/**
 * Calculates the total credit across all customers.
 * @param customers - Array of customer objects
 * @returns The total credit amount
 */
export function calculateTotalCredit(customers: GetCustomerTypes[]): number {
	return customers.reduce((total, customer) => {
		const balance = calculateCustomerBalance(customer);
		return balance > 0 ? total + balance : total;
	}, 0);
}

/**
 * Calculates the total debit across all customers.
 * @param customers - Array of customer objects
 * @returns The total debit amount
 */
export function calculateTotalDebit(customers: GetCustomerTypes[]): number {
	return customers.reduce((total, customer) => {
		const balance = calculateCustomerBalance(customer);
		return balance < 0 ? total + Math.abs(balance) : total;
	}, 0);
}

/**
 * Filters customers based on their balance type (credit or debit).
 * @param customers - Array of customer objects
 * @param balanceType - Type of balance to filter by ("credit", "debit", or null for all)
 * @returns Filtered array of customers
 */
export function filterCustomersByBalanceType(
	customers: GetCustomerTypes[],
	balanceType: "credit" | "debit" | null
): GetCustomerTypes[] {
	if (!balanceType) return customers;
	return customers.filter((customer) => {
		const balance = calculateCustomerBalance(customer);
		return balanceType === "credit" ? balance > 0 : balance < 0;
	});
}

/**
 * Sorts sales by date in descending order.
 * @param sales - Array of sale objects
 * @returns Sorted array of sales
 */
export function sortSalesByDate(sales: GetSaleTypes[]): GetSaleTypes[] {
	return [...sales].sort((a, b) => {
		const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
		const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
		return dateB - dateA;
	});
}

/**
 * Sorts payments by date in descending order.
 * @param payments - Array of payment objects
 * @returns Sorted array of payments
 */
export function sortPaymentsByDate(
	payments: GetPaymentTypes[]
): GetPaymentTypes[] {
	return [...payments].sort((a, b) => {
		const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
		const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
		return dateB - dateA;
	});
}

/**
 * Calculates the total sales amount for a customer.
 * @param customer - Customer object
 * @returns The total sales amount
 */
export function calculateTotalSales(customer: GetCustomerTypes): number {
	return (
		customer.sales?.reduce(
			(total, sale) => total + (sale.totalAmount ?? 0),
			0
		) ?? 0
	);
}

/**
 * Calculates the total payments made by a customer.
 * @param customer - Customer object
 * @returns The total payments amount
 */
export function calculateTotalPayments(customer: GetCustomerTypes): number {
	return (
		customer.payments?.reduce(
			(total, payment) => total + (payment.amount ?? 0),
			0
		) ?? 0
	);
}

/**
 * Calculates the final balance for a customer, including sales and payments.
 * @param customer - Customer object
 * @returns The final balance for the customer
 */
export function calculateCustomerFinalBalance(
	customer: GetCustomerTypes
): number {
	const salesTotal = calculateTotalSales(customer);
	const paymentsTotal = calculateTotalPayments(customer);

	return salesTotal - paymentsTotal;
}

/**
 * Calculates the total balance across all customers.
 * @param customers - Array of customer objects
 * @returns The total balance amount
 */
export function calculateTotalBalance(customers: GetCustomerTypes[]): number {
	return customers.reduce(
		(total, customer) => total + calculateCustomerFinalBalance(customer),
		0
	);
}
