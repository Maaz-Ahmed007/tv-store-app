"use server";

import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

import {
	productSchema,
	updateProductSchema,
	addStockSchema,
	fullProductSchema,
} from "@/lib/validations/product-validations";
import type {
	ProductTypes,
	UpdateProductTypes,
	AddStockTypes,
	FullProductTypes,
} from "@/lib/validations/product-validations";

type ProductActionResponse = {
	success: boolean;
	error?: string;
	product?: FullProductTypes;
};

// Helper function to handle errors
const handleError = (error: unknown): ProductActionResponse => {
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

// Create a new product
export async function createProduct(
	data: ProductTypes
): Promise<ProductActionResponse> {
	try {
		if (!data) {
			throw new Error("Product data is required");
		}
		const validatedData = productSchema.parse(data);
		const product = await prisma.product.create({
			data: {
				...validatedData,
				quantity: 0,
				sold: 0,
			},
		});
		revalidatePath("/products");
		return { success: true, product: fullProductSchema.parse(product) };
	} catch (error) {
		return handleError(error);
	}
}

// Get all products
export async function getProducts(): Promise<
	ProductActionResponse & { products?: FullProductTypes[] }
> {
	try {
		const products = await prisma.product.findMany();
		const validatedProducts = products.map((product) =>
			fullProductSchema.parse(product)
		);
		return { success: true, products: validatedProducts };
	} catch (error) {
		return handleError(error);
	}
}

// Update an existing product
export async function updateProduct(
	data: UpdateProductTypes
): Promise<ProductActionResponse> {
	try {
		const validatedData = updateProductSchema.parse(data);
		const { id, ...updateData } = validatedData;
		const product = await prisma.product.update({
			where: { id },
			data: updateData,
		});
		revalidatePath("/products");
		return { success: true, product: fullProductSchema.parse(product) };
	} catch (error) {
		return handleError(error);
	}
}

// Delete a product
export async function deleteProduct(
	id: string
): Promise<ProductActionResponse> {
	try {
		await prisma.product.delete({ where: { id } });
		revalidatePath("/products");
		return { success: true };
	} catch (error) {
		return handleError(error);
	}
}

// Update product stock
export async function updateStock(
	data: AddStockTypes
): Promise<ProductActionResponse> {
	try {
		const validatedData = addStockSchema.parse(data);
		const { id, quantity } = validatedData;
		const product = await prisma.product.update({
			where: { id },
			data: { quantity },
		});
		revalidatePath("/products");
		return { success: true, product: fullProductSchema.parse(product) };
	} catch (error) {
		return handleError(error);
	}
}
