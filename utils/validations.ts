import { z } from "zod";

// Product
export const getProductSchema = z.object({
	id: z.string(),
	name: z.string().min(3, "Name must be at least 3 characters"),
	description: z.string().nullable(),
	cost: z.number().min(0, "Cost must be positive"),
	price: z.number().min(0, "Price must be positive"),
	quantity: z.number().int().min(0),
	createdAt: z.date().optional(),
	updatedAt: z.date().optional(),
});

export type getProductTypes = z.infer<typeof getProductSchema>;

export const productSchema = z.object({
	name: z.string().min(3, "Name must be at least 3 characters"),
	description: z.string().optional(),
	cost: z.number().min(0, "Cost must be positive"),
	price: z.number().min(0, "Price must be positive"),
});

export type ProductTypes = z.infer<typeof productSchema>;

// Sale Item
export const getSaleItemSchema = z.object({
	id: z.string(),
	productId: z.string(),
	quantity: z.number().int().min(1, "Quantity must be at least 1"),
	price: z.number().min(0, "Price must be positive"),
	product: getProductSchema,
	createdAt: z.date().optional(),
	updatedAt: z.date().optional(),
});

export type GetSaleItemTypes = z.infer<typeof getSaleItemSchema>;

export const saleItemSchema = z.object({
	productId: z.string(),
	quantity: z.number().int().min(1, "Quantity must be at least 1"),
	price: z.number().min(0, "Price must be positive"),
});

export type SaleItemTypes = z.infer<typeof saleItemSchema>;

// Sale
export const getSaleSchema = z.object({
	id: z.string(),
	customerId: z.string(),
	items: z.array(getSaleItemSchema),
	totalAmount: z.number().min(0, "Total amount must be positive"),
	createdAt: z.date().optional(),
	updatedAt: z.date().optional(),
});

export type GetSaleTypes = z.infer<typeof getSaleSchema>;

export const saleSchema = z.object({
	customerId: z.string(),
	items: z.array(saleItemSchema).min(1, "At least one item is required"),
});

export type SaleTypes = z.infer<typeof saleSchema>;

// Transaction

export const getTransactionSchema = z.object({
	id: z.string(),
	customerId: z.string(),
	type: z.enum(["credit", "debit"]),
	amount: z.number().min(0, "Amount must be positive"),
	description: z.string().optional(),
	createdAt: z.date().optional(),
	updatedAt: z.date().optional(),
});

export type GetTransactionTypes = z.infer<typeof getTransactionSchema>;

export const transactionSchema = z.object({
	customerId: z.string(),
	type: z.enum(["credit", "debit"]),
	amount: z.number().min(0, "Amount must be positive"),
	description: z.string().optional(),
});

export type TransactionTypes = z.infer<typeof transactionSchema>;

// Customer
export const getCustomerSchema = z.object({
	id: z.string(),
	name: z.string().min(3, "Name must be at least 3 characters"),
	phone: z.string().optional().nullable(),
	createdAt: z.date().optional(),
	updatedAt: z.date().optional(),
	sales: z
		.array(
			z.object({
				id: z.string(),
				totalAmount: z.number(),
				createdAt: z.date().optional(),
				updatedAt: z.date().optional(),
			})
		)
		.optional(),
	transactions: z.array(getTransactionSchema).optional(),
});

export type GetCustomerTypes = z.infer<typeof getCustomerSchema>;

export const customerSchema = z.object({
	name: z.string().min(3, "Name must be at least 3 characters"),
	phone: z.string().optional(),
});

export type CustomerTypes = z.infer<typeof customerSchema>;
