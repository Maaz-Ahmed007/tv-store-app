"use server";

import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

import {
	saleSchema,
	createSaleSchema,
	updateSaleSchema,
} from "@/lib/validations/sale-validations";
import type {
	SaleTypes,
	CreateSaleTypes,
	UpdateSaleTypes,
} from "@/lib/validations/sale-validations";

type SaleActionResponse = {
	success: boolean;
	error?: string;
	sale?: SaleTypes;
};

// Helper function to handle errors
const handleError = (error: unknown): SaleActionResponse => {
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

// Create a new sale
export async function createSale(
	data: CreateSaleTypes
): Promise<SaleActionResponse> {
	try {
		if (!data) {
			throw new Error("Sale data is required");
		}
		const validatedData = createSaleSchema.parse(data);
		const sale = await prisma.sale.create({
			data: validatedData,
		});

		// Update product quantity and sold count
		await prisma.product.update({
			where: { id: validatedData.productId },
			data: {
				quantity: { decrement: validatedData.quantity },
				sold: { increment: validatedData.quantity },
			},
		});

		revalidatePath("/sales");
		return { success: true, sale: saleSchema.parse(sale) };
	} catch (error) {
		return handleError(error);
	}
}

// Get all sales
export async function getSales(): Promise<
	SaleActionResponse & { sales?: SaleTypes[] }
> {
	try {
		const sales = await prisma.sale.findMany({
			include: {
				customer: true,
				product: true,
			},
		});
		const validatedSales = sales.map((sale) => saleSchema.parse(sale));
		return { success: true, sales: validatedSales };
	} catch (error) {
		return handleError(error);
	}
}

// Update an existing sale
export async function updateSale(
	data: UpdateSaleTypes
): Promise<SaleActionResponse> {
	try {
		const validatedData = updateSaleSchema.parse(data);
		const { id, ...updateData } = validatedData;
		const sale = await prisma.sale.update({
			where: { id },
			data: updateData,
			include: {
				customer: true,
				product: true,
			},
		});
		revalidatePath("/sales");
		return { success: true, sale: saleSchema.parse(sale) };
	} catch (error) {
		return handleError(error);
	}
}

// Delete a sale
export async function deleteSale(id: string): Promise<SaleActionResponse> {
	try {
		const sale = await prisma.sale.delete({
			where: { id },
			include: { product: true },
		});

		await prisma.product.update({
			where: { id: sale.productId },
			data: {
				quantity: { increment: sale.quantity },
				sold: { decrement: sale.quantity },
			},
		});

		revalidatePath("/sales");
		return { success: true };
	} catch (error) {
		return handleError(error);
	}
}
