"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// ✅ Customer Schema
import { customerSchema, CustomerTypes } from "@/utils/validations";

// ✅ Get Customers
export async function getCustomers() {
	try {
		const customers = await prisma.customer.findMany({
			orderBy: { createdAt: "desc" },
			include: { sales: true },
		});

		return { success: true, customers };
	} catch (error) {
		return {
			error: { general: "Something went wrong while fetching customers. Please try again." },
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
