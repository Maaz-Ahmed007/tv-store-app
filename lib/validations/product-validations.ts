import { z } from "zod";

// Product Schema for creating a new product
export const productSchema = z.object({
	name: z.string().min(1, "Required"),
	description: z.string().nullable().optional(),
	size: z.string().min(1, "Required"),
	panel: z.string().min(1, "Required"),
	company: z.string().nullable().optional(),
	price: z.number().positive("Required Positive Price"),
	cost: z.number().positive("Required Positive Cost"),
	quantity: z.number().int().nonnegative().optional(),
});

// Update Product Schema for updating a product
export const updateProductSchema = productSchema.partial().extend({
	id: z.string().uuid("Invalid Product ID"),
});

export const addStockSchema = z.object({
	id: z.string().uuid("Invalid Product ID"),
	quantity: z.number().int().nonnegative(),
});

// Full Product Schema including auto-generated fields
export const fullProductSchema = productSchema.extend({
	id: z.string().uuid("Invalid Product ID"),
	quantity: z.number().int().nonnegative(),
	sold: z.number().int().nonnegative(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export type ProductTypes = z.infer<typeof productSchema>;
export type UpdateProductTypes = z.infer<typeof updateProductSchema>;
export type AddStockTypes = z.infer<typeof addStockSchema>;
export type FullProductTypes = z.infer<typeof fullProductSchema>;
