import {
	GetCustomerTypes,
	GetSaleTypes,
	GetSaleItemTypes,
	GetTransactionTypes,
} from "@/utils/validations";

/**
 * Calculates the total amount for a sale based on its items.
 * @param items - Array of sale items
 * @returns The total amount of the sale
 */
export function calculateSaleTotalAmount(items: GetSaleItemTypes[]): number {
	return items.reduce((total, item) => total + item.price * item.quantity, 0);
}

/**
 * Calculates the balance for a customer based on their sales and transactions.
 * @param customer - Customer object with optional sales and transactions
 * @returns The calculated balance for the customer
 */
export function calculateCustomerBalance(customer: GetCustomerTypes): number {
	const salesTotal =
		customer.sales?.reduce(
			(total, sale) => total + (sale.totalAmount ?? 0),
			0
		) ?? 0;
	const transactionsTotal =
		customer.transactions?.reduce((total, transaction) => {
			const amount = transaction.amount ?? 0;
			return transaction.type === "credit"
				? total + amount
				: total - amount;
		}, 0) ?? 0;

	return salesTotal + transactionsTotal;
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
 * Sorts transactions by date in descending order.
 * @param transactions - Array of transaction objects
 * @returns Sorted array of transactions
 */
export function sortTransactionsByDate(
	transactions: GetTransactionTypes[]
): GetTransactionTypes[] {
	return [...transactions].sort((a, b) => {
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
 * Calculates the net transaction amount for a customer.
 * @param customer - Customer object
 * @returns The net transaction amount (positive for credit, negative for debit)
 */
export function calculateNetTransactions(customer: GetCustomerTypes): number {
	return (
		customer.transactions?.reduce((total, transaction) => {
			const amount = transaction.amount ?? 0;
			return transaction.type === "credit"
				? total + amount
				: total - amount;
		}, 0) ?? 0
	);
}
