"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

// ✅ Product Schema
import { productSchema, ProductTypes } from "@/utils/validations";

// ✅ Get Products
export async function getProducts() {
	try {
		const products = await prisma.product.findMany({
			orderBy: { createdAt: "desc" },
		});

		return { success: true, products };
	} catch (error) {
		return {
			error: { general: "Something went wrong. Please try again." },
		};
	}
}

// ✅ Add or Update Product
export async function saveProduct(id: string | null, data: ProductTypes) {
	const parsedData = productSchema.safeParse(data);

	if (!parsedData.success) {
		return { error: parsedData.error.flatten().fieldErrors };
	}

	try {
		const product = id
			? await prisma.product.update({
					where: { id },
					data: parsedData.data,
			  })
			: await prisma.product.create({ data: parsedData.data });

		revalidatePath("/products");
		return { success: true, product };
	} catch (error) {
		if (
			error instanceof PrismaClientKnownRequestError &&
			error.code === "P2002"
		) {
			return {
				error: { name: "A product with this name already exists." },
			};
		}
		return {
			error: { general: "Something went wrong. Please try again." },
		};
	}
}

// ✅ Update Product Quantity
export async function updateProductQuantity(id: string, quantity: number) {
	if (quantity < 0)
		return { error: { quantity: "Quantity cannot be negative" } };

	try {
		const product = await prisma.product.update({
			where: { id },
			data: { quantity },
		});

		revalidatePath("/products");
		return { success: true, product };
	} catch (error) {
		return { error: { general: "Failed to update quantity." } };
	}
}

// ✅ Deduct Sold Quantity When a Sale Happens
export async function deductSoldQuantity(id: string, soldAmount: number) {
	if (soldAmount <= 0)
		return { error: { sold: "Sold quantity must be greater than 0." } };

	try {
		const product = await prisma.product.findUnique({ where: { id } });
		if (!product) return { error: { general: "Product not found." } };

		if (product.quantity < soldAmount) {
			return { error: { sold: "Not enough stock available." } };
		}

		const updateProduct = await prisma.product.update({
			where: { id },
			data: {
				quantity: product.quantity - soldAmount,
				sold: product.sold + soldAmount,
			},
		});

		revalidatePath("/products");
		return { success: true, updateProduct };
	} catch (error) {
		return { error: { general: "Failed to update sold and quantity." } };
	}
}

// ✅ Delete Products
export async function deleteProduct(id: string) {
	try {
		await prisma.product.delete({ where: { id } });
		revalidatePath("/products");
		return { success: true };
	} catch (error) {
		return { error: { general: "Failed to delete product." } };
	}
}
