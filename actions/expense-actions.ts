"use server";

import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

import {
	expenseSchema,
    createExpenseSchema,
    updateExpenseSchema
} from "@/lib/validations/expense-validations";
import type {
	ExpenseTypes,
    CreateExpenseTypes,
    UpdateExpenseTypes
} from "@/lib/validations/expense-validations";

type ExpenseActionResponse = {
	success: boolean;
	error?: string;
	expense?: ExpenseTypes;
};

// Helper function to handle errors
const handleError = (error: unknown): ExpenseActionResponse => {
	if (error instanceof Error) {
		return { success: false, error: error.message };
	}
	return { success: false, error: "An unexpected error occurred." };
};

// Create a new expense
export async function createExpense(
	data: CreateExpenseTypes
): Promise<ExpenseActionResponse> {
	try {
		if (!data) {
			throw new Error("Expense data is required");
		}
		const validatedData = createExpenseSchema.parse(data);
		const expense = await prisma.expense.create({
			data: validatedData,
		});
		revalidatePath("/expenses");
		return { success: true, expense: expenseSchema.parse(expense) };
	} catch (error) {
		return handleError(error);
	}
}

// Get all expenses
export async function getExpenses(): Promise<
	ExpenseActionResponse & { expenses?: ExpenseTypes[] }
> {
	try {
		const expenses = await prisma.expense.findMany();
		const validatedExpenses = expenses.map((expense) =>
			expenseSchema.parse(expense)
		);
		return { success: true, expenses: validatedExpenses };
	} catch (error) {
		return handleError(error);
	}
}

// Update an existing expense
export async function updateExpense(
	data: UpdateExpenseTypes
): Promise<ExpenseActionResponse> {
	try {
		const validatedData = updateExpenseSchema.parse(data);
		const { id, ...updateData } = validatedData;
		const expense = await prisma.expense.update({
			where: { id },
			data: updateData,
		});
		revalidatePath("/expenses");
		return { success: true, expense: expenseSchema.parse(expense) };
	} catch (error) {
		return handleError(error);
	}
}

// Delete a customer
export async function deleteExpense(
	id: string
): Promise<ExpenseActionResponse> {
	try {
		await prisma.expense.delete({ where: { id } });
		revalidatePath("/expenses");
		return { success: true };
	} catch (error) {
		return handleError(error);
	}
}