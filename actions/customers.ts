"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// ✅ Customer Schema
import {
	customerSchema,
	saleSchema,
	transactionSchema,
	CustomerTypes,
	SaleType,
	TransactionType,
} from "@/utils/validations";

// ✅ Get Customers
export async function getCustomers() {
	try {
		const customers = await prisma.customer.findMany({
			include: {
				sales: {
					include: {
						items: {
							include: {
								product: true,
							},
						},
					},
				},
				transactions: true,
			},
			orderBy: { createdAt: "desc" },
		});

		return { success: true, customers };
	} catch (error) {
		return {
			error: { general: "Something went wrong. Please try again." },
		};
	}
}

// ✅ Add or Update Customer
export async function saveCustomer(id: string | null, data: CustomerTypes) {
	const parsedData = customerSchema.safeParse(data);

	if (!parsedData.success) {
		return { error: parsedData.error.flatten().fieldErrors };
	}

	try {
		const customer = id
			? await prisma.customer.update({
					where: { id },
					data: parsedData.data,
			  })
			: await prisma.customer.create({ data: parsedData.data });

		revalidatePath("/");
		return { success: true, customer };
	} catch (error) {
		return {
			error: { general: "Something went wrong. Please try again." },
		};
	}
}

// ✅ Add Sale
export async function addSale(data: SaleType) {
	const parsedData = saleSchema.safeParse(data);

	if (!parsedData.success) {
		return { error: parsedData.error.flatten().fieldErrors };
	}

	try {
		const sale = await prisma.sale.create({
			data: {
				customerId: parsedData.data.customerId,
				totalAmount: parsedData.data.totalAmount,
				items: {
					create: parsedData.data.items,
				},
			},
			include: {
				items: {
					include: {
						product: true,
					}
				},
			},
		});

		// Update product quantities
		for (const item of parsedData.data.items) {
			await prisma.product.update({
				where: { id: item.productId },
				data: {
					quantity: { decrement: item.quantity },
					// sold: { increment: item.quantity },
				},
			});
		}

		revalidatePath("/");
		return { success: true, sale };
	} catch (error) {
		return {
			error: { general: "Something went wrong. Please try again." },
		};
	}
}

// ✅ Add Transaction (Credit or Debit)
export async function addTransaction(data: TransactionType) {
	const parsedData = transactionSchema.safeParse(data);

	if (!parsedData.success) {
		return { error: parsedData.error.flatten().fieldErrors };
	}

	try {
		const transaction = await prisma.transaction.create({
			data: parsedData.data,
		});

		revalidatePath("/");
		return { success: true, transaction };
	} catch (error) {
		return {
			error: { general: "Something went wrong. Please try again." },
		};
	}
}

// ✅ Delete Customer
export async function deleteCustomer(id: string) {
	try {
		await prisma.customer.delete({ where: { id } });
		revalidatePath("/");
		return { success: true };
	} catch (error) {
		return { error: { general: "Failed to delete customer." } };
	}
}
