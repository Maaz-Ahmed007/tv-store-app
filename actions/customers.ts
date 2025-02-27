"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// ✅ Customer Schema
import {
	getCustomerSchema,
	customerSchema,
	saleSchema,
	CustomerTypes,
	SaleTypes,
	PaymentTypes,
	getPaymentSchema,
} from "@/utils/validations";

// ✅ Sale total Calculation
import { calculateSaleTotalAmount } from "@/utils/calculations";

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
				payments: true,
			},
			orderBy: { createdAt: "desc" },
		});

		const parsedCustomers = getCustomerSchema.array().safeParse(customers);

		if (!parsedCustomers.success) {
			console.error("Data validation error:", parsedCustomers.error);
			return { error: { general: "Data validation error occurred." } };
		}

		return { success: true, customers: parsedCustomers.data };
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
export async function addSale(data: SaleTypes) {
	const parsedData = saleSchema.safeParse(data);

	if (!parsedData.success) {
		return { error: parsedData.error.flatten().fieldErrors };
	}

	try {
		const totalAmount = calculateSaleTotalAmount(parsedData.data.items)
		
		const sale = await prisma.sale.create({
			data: {
				customerId: parsedData.data.customerId,
				totalAmount,
				items: {
					create: parsedData.data.items.map((item) => ({
						productId: item.productId,
						quantity: item.quantity,
						price: item.price,
					})),
				},
			},
			include: {
				items: {
					include: {
						product: true,
					},
				},
			},
		});

		// Update product quantities
		for (const item of parsedData.data.items) {
			await prisma.product.update({
				where: { id: item.productId },
				data: {
					quantity: { decrement: item.quantity },
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

// ✅ Add Payment
export async function addPayment(data: PaymentTypes) {
	const parsedData = getPaymentSchema.safeParse(data);

	if (!parsedData.success) {
		return { error: parsedData.error.flatten().fieldErrors };
	}

	try {
		const payment = await prisma.payment.create({
			data: parsedData.data,
		});

		revalidatePath("/");
		return { success: true, payment };
	} catch (error) {
		return {
			error: { general: "Something went wrong. Please try again." },
		};
	}
}

// export async function addTransaction(data: TransactionTypes) {
// 	const parsedData = transactionSchema.safeParse(data);

// 	if (!parsedData.success) {
// 		return { error: parsedData.error.flatten().fieldErrors };
// 	}

// 	try {
// 		const transaction = await prisma.transaction.create({
// 			data: parsedData.data,
// 		});

// 		revalidatePath("/");
// 		return { success: true, transaction };
// 	} catch (error) {
// 		return {
// 			error: { general: "Something went wrong. Please try again." },
// 		};
// 	}
// }

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
