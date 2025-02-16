import { z } from "zod";

// Product
export const getProductSchema = z.object({
	id: z.string(),
	name: z.string().min(3, "Name must be at least 3 characters"),
	description: z.string().nullable(),
	cost: z.number().min(0, "Cost must be positive"),
	price: z.number().min(0, "Price must be positive"),
	quantity: z.number().int().min(0).default(0),
	sold: z.number().int().min(0).default(0),
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

// Customer
export const getCustomerSchema = z.object({
	id: z.string(),
	name: z.string().min(3, "Name must be at least 3 characters"),
	phone: z.string().optional().nullable(),
	// TODO: complete to fetch proper customers with their sales
	sales: z
		.array(
			z.object({
				id: z.string(),
				totalAmount: z.number(),
				createdAt: z.date(),
			})
		)
		.optional(),
	createdAt: z.date().optional(),
	updatedAt: z.date().optional(),
});

export type GetCustomerTypes = z.infer<typeof getCustomerSchema>;

export const customerSchema = z.object({
	name: z.string().min(3, "Name must be at least 3 characters"),
	phone: z.string().optional(),
});

export type CustomerTypes = z.infer<typeof customerSchema>;
