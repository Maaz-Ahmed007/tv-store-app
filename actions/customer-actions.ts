"use server";

import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

import {
	customerSchema,
	createCustomerSchema,
	updateCustomerSchema,
} from "@/lib/validations/customer-validations";
import type {
	CustomerTypes,
	CreateCustomerTypes,
	UpdateCustomerTypes,
} from "@/lib/validations/customer-validations";

type CustomerActionResponse = {
	success: boolean;
	error?: string;
	customer?: CustomerTypes;
};

// Helper function to handle errors
const handleError = (error: unknown): CustomerActionResponse => {
	if (error instanceof Prisma.PrismaClientKnownRequestError) {
		if (error.code === "P2002") {
			return {
				success: false,
				error: "A product with same name already exists.",
			};
		}
	}
	if (error instanceof Error) {
		return { success: false, error: error.message };
	}
	return { success: false, error: "An unexpected error occurred." };
};

// Create a new customer
export async function createCustomer(
	data: CreateCustomerTypes
): Promise<CustomerActionResponse> {
	try {
		if (!data) {
			throw new Error("Customer data is required");
		}
		const validatedData = createCustomerSchema.parse(data);
		const customer = await prisma.customer.create({
			data: validatedData,
		});
		revalidatePath("/sales");
		return { success: true, customer: customerSchema.parse(customer) };
	} catch (error) {
		return handleError(error);
	}
}

// Get all customers
export async function getCustomers(): Promise<
	CustomerActionResponse & { customers?: CustomerTypes[] }
> {
	try {
		const customers = await prisma.customer.findMany();
		const validatedCustomers = customers.map((customer) =>
			customerSchema.parse(customer)
		);
		return { success: true, customers: validatedCustomers };
	} catch (error) {
		return handleError(error);
	}
}

// Update an existing customer
export async function updateCustomer(
	data: UpdateCustomerTypes
): Promise<CustomerActionResponse> {
	try {
		const validatedData = updateCustomerSchema.parse(data);
		const { id, ...updateData } = validatedData;
		const customer = await prisma.customer.update({
			where: { id },
			data: updateData,
		});
		revalidatePath("/sales");
		return { success: true, customer: customerSchema.parse(customer) };
	} catch (error) {
		return handleError(error);
	}
}

// Delete a customer
export async function deleteCustomer(
	id: string
): Promise<CustomerActionResponse> {
	try {
		await prisma.customer.delete({ where: { id } });
		revalidatePath("/sales");
		return { success: true };
	} catch (error) {
		return handleError(error);
	}
}