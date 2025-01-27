import { z } from "zod";

export const saleSchema = z.object({
	id: z.string().uuid("Invalid sale ID"),
	customerId: z.string().uuid("Invalid customer ID"),
	productId: z.string().uuid("Invalid product ID"),
	quantity: z.number().int().positive("Required Positive Quantity"),
	totalAmount: z.number().positive("Required Positive Total Amount"),
	createdAt: z.date(),
	updatedAt: z.date(),
	customer: z.object({
		id: z.string().uuid("Invalid customer ID"),
		name: z.string(),
		phone: z.string().optional(),
	}),
	product: z.object({
		id: z.string().uuid("Invalid product ID"),
		name: z.string(),
		price: z.number(),
	}),
});

export const createSaleSchema = saleSchema.omit({
	id: true,
	createdAt: true,
	updatedAt: true,
});

export const updateSaleSchema = saleSchema.partial();

export type SaleTypes = z.infer<typeof saleSchema>;
export type CreateSaleTypes = z.infer<typeof createSaleSchema>;
export type UpdateSaleTypes = z.infer<typeof updateSaleSchema>;
