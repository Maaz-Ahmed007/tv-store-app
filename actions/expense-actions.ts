"use server";

import prisma from "@/lib/prisma";
// import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { expenseSchema } from "@/lib/validations/expense-validations";

// Create a new expense
export async function createExpense(formData: FormData) {
	const rawFormData = {
		details: formData.get("details"),
		amount: formData.get("amount"),
		date: formData.get("date"),
	};

	const validatedFields = expenseSchema.safeParse({
		details: rawFormData.details,
		amount: Number(rawFormData.amount),
		date: rawFormData.date,
	});

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: "Failed to create expense.",
		};
	}

	try {
		await prisma.expense.create({
			data: {
				details: validatedFields.data.details,
				amount: validatedFields.data.amount,
				date: new Date(validatedFields.data.date),
			},
		});
	} catch (error) {
		return {
			message: "Database Error: Failed to create expense.",
		};
	}

	revalidatePath("/expenses");
	return { message: "Expense created successfully." };
}

// Get all expenses
export async function getExpenses() {
	try {
		const expenses = await prisma.expense.findMany();
		const validatedExpenses = expenses.map((expense) =>
			expenseSchema.parse(expense)
		);
		return { success: true, expenses: validatedExpenses };
	} catch (error) {
		return {
			message: "Database Error: Failed to create expense.",
		};
	}
}

// // Update an existing expense
// export async function updateExpense(
// 	data: UpdateExpenseTypes
// ): Promise<ExpenseActionResponse> {
// 	try {
// 		const validatedData = updateExpenseSchema.parse(data);
// 		const { id, ...updateData } = validatedData;
// 		const expense = await prisma.expense.update({
// 			where: { id },
// 			data: updateData,
// 		});
// 		revalidatePath("/expenses");
// 		return { success: true, expense: expenseSchema.parse(expense) };
// 	} catch (error) {
// 		return handleError(error);
// 	}
// }

// // Delete a customer
// export async function deleteExpense(
// 	id: string
// ): Promise<ExpenseActionResponse> {
// 	try {
// 		await prisma.expense.delete({ where: { id } });
// 		revalidatePath("/expenses");
// 		return { success: true };
// 	} catch (error) {
// 		return handleError(error);
// 	}
// }
