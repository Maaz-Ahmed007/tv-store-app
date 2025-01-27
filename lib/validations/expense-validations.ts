import { z } from "zod";

export const expenseSchema = z.object({
    id: z.string().uuid("Invalid customer ID"),
	details: z.string().optional(),
	amount: z.number().positive("Required Positive Amount"),
    date: z.date(),
});

export const createExpenseSchema = expenseSchema.omit({ id: true });

export const updateExpenseSchema = expenseSchema.partial();

export type ExpenseTypes = z.infer<typeof expenseSchema>;
export type CreateExpenseTypes = z.infer<typeof createExpenseSchema>;
export type UpdateExpenseTypes = z.infer<typeof updateExpenseSchema>;