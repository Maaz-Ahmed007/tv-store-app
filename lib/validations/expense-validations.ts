import { z } from "zod";

export const expenseSchema = z.object({
	id: z.string().uuid("Invalid customer ID").optional(),
	details: z.string().optional(),
	amount: z.number().positive("Required Positive Amount"),
	date: z
		.string()
		.regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format. Use YYYY-MM-DD"),
});

export type ExpenseTypes = z.infer<typeof expenseSchema>;
