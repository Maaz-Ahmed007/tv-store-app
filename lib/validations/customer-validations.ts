import { z } from "zod";

export const customerSchema = z.object({
	id: z.string().uuid("Invalid customer ID"),
	name: z.string().min(1, "Required"),
	phone: z.string().optional(),
});

export const createCustomerSchema = customerSchema.omit({ id: true });

export const updateCustomerSchema = customerSchema.partial();

export type CustomerTypes = z.infer<typeof customerSchema>;
export type CreateCustomerTypes = z.infer<typeof createCustomerSchema>;
export type UpdateCustomerTypes = z.infer<typeof updateCustomerSchema>;