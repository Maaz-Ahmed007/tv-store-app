"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, Plus, ArrowLeft, Calendar } from "lucide-react";

import Header from "@/components/newcomponents/Header";

interface Expense {
	id: number;
	name: string;
	amount: number;
	date: string;
	category: string;
}

export default function Expenses() {
	const [expenses, setExpenses] = useState<Expense[]>([
		{
			id: 1,
			name: "Rent",
			amount: 2000,
			date: "2023-05-01",
			category: "Utilities",
		},
		{
			id: 2,
			name: "Utilities",
			amount: 500,
			date: "2023-05-05",
			category: "Utilities",
		},
		{
			id: 3,
			name: "Inventory",
			amount: 5000,
			date: "2023-05-10",
			category: "Inventory",
		},
		{
			id: 4,
			name: "Salaries",
			amount: 8000,
			date: "2023-05-15",
			category: "Payroll",
		},
		{
			id: 5,
			name: "Marketing",
			amount: 1000,
			date: "2023-05-20",
			category: "Marketing",
		},
	]);
	const [showForm, setShowForm] = useState(false);
	const [newExpense, setNewExpense] = useState<Omit<Expense, "id">>({
		name: "",
		amount: 0,
		date: new Date().toISOString().split("T")[0],
		category: "",
	});
	const [errors, setErrors] = useState<
		Partial<Record<keyof Omit<Expense, "id">, string>>
	>({});

	const handleReload = () => {
		// Implement reload logic here
		console.log("Reloading expenses...");
	};

	const validateForm = () => {
		const newErrors: Partial<Record<keyof Omit<Expense, "id">, string>> =
			{};
		if (!newExpense.name.trim())
			newErrors.name = "Expense name is required";
		if (newExpense.amount <= 0)
			newErrors.amount = "Amount must be greater than 0";
		if (!newExpense.category.trim())
			newErrors.category = "Category is required";
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleAddExpense = (e: React.FormEvent) => {
		e.preventDefault();
		if (validateForm()) {
			const id = Math.max(...expenses.map((e) => e.id), 0) + 1;
			setExpenses([...expenses, { ...newExpense, id }]);
			setNewExpense({
				name: "",
				amount: 0,
				date: new Date().toISOString().split("T")[0],
				category: "",
			});
			setShowForm(false);
		}
	};

	const handleDateClick = () => {
		const dateInput = document.createElement("input");
		dateInput.type = "datetime-local";
		dateInput.value = newExpense.date;
		dateInput.onchange = (e) => {
			const target = e.target as HTMLInputElement;
			setNewExpense({ ...newExpense, date: target.value });
		};
		dateInput.click();
	};

	return (
		<div className="flex flex-col h-full">
			<Header title="Expenses" showReload onReload={handleReload}>
				<button
					className="p-2 text-blue-600 hover:bg-blue-100 rounded-full"
					aria-label="Search">
					<Search className="w-6 h-6" />
				</button>
				<button
					className="p-2 text-blue-600 hover:bg-blue-100 rounded-full"
					aria-label="Filter">
					<Filter className="w-6 h-6" />
				</button>
			</Header>
			<div className="flex-grow overflow-auto">
				<div className="p-4 space-y-4">
					{expenses.map((expense) => (
						<div
							key={expense.id}
							className="bg-white p-4 rounded-lg shadow">
							<div className="flex justify-between items-center mb-2">
								<h2 className="text-lg font-semibold">
									{expense.name}
								</h2>
								<span className="text-red-600 font-bold">
									${expense.amount}
								</span>
							</div>
							<p className="text-gray-600">
								Date: {expense.date}
							</p>
							<p className="text-gray-600">
								Category: {expense.category}
							</p>
						</div>
					))}
				</div>
			</div>
			{!showForm && (
				<button
					onClick={() => setShowForm(true)}
					className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg flex items-center"
					style={{ zIndex: 1000 }}>
					<Plus className="w-5 h-5 mr-2" />
					Add Expense
				</button>
			)}
			<AnimatePresence>
				{showForm && (
					<motion.div
						initial={{ opacity: 0, y: "100%" }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: "100%" }}
						transition={{
							type: "spring",
							damping: 25,
							stiffness: 500,
						}}
						className="fixed inset-0 bg-white z-50 flex flex-col">
						<header className="bg-white shadow-sm p-4 flex items-center">
							<button
								onClick={() => setShowForm(false)}
								className="mr-4">
								<ArrowLeft className="w-6 h-6 text-blue-600" />
							</button>
							<h1 className="text-xl font-semibold">
								Add Expense
							</h1>
						</header>
						<form
							onSubmit={handleAddExpense}
							className="p-4 space-y-6 flex-grow overflow-auto">
							<div>
								<label
									htmlFor="name"
									className="block text-sm font-medium text-gray-700 mb-1">
									Expense Name
								</label>
								<input
									type="text"
									id="name"
									value={newExpense.name}
									onChange={(e) =>
										setNewExpense({
											...newExpense,
											name: e.target.value,
										})
									}
									className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
									required
								/>
								{errors.name && (
									<p className="mt-1 text-sm text-red-600">
										{errors.name}
									</p>
								)}
							</div>
							<div>
								<label
									htmlFor="amount"
									className="block text-sm font-medium text-gray-700 mb-1">
									Amount
								</label>
								<input
									type="number"
									id="amount"
									value={newExpense.amount}
									onChange={(e) =>
										setNewExpense({
											...newExpense,
											amount: Number.parseFloat(
												e.target.value
											),
										})
									}
									className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
									required
								/>
								{errors.amount && (
									<p className="mt-1 text-sm text-red-600">
										{errors.amount}
									</p>
								)}
							</div>
							<div>
								<label
									htmlFor="category"
									className="block text-sm font-medium text-gray-700 mb-1">
									Category
								</label>
								<input
									type="text"
									id="category"
									value={newExpense.category}
									onChange={(e) =>
										setNewExpense({
											...newExpense,
											category: e.target.value,
										})
									}
									className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
									required
								/>
								{errors.category && (
									<p className="mt-1 text-sm text-red-600">
										{errors.category}
									</p>
								)}
							</div>
							<button
								type="button"
								onClick={handleDateClick}
								className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
								<Calendar className="mr-2 h-5 w-5 text-gray-400" />
								{new Date(newExpense.date).toLocaleString()}
							</button>
						</form>
						<div className="p-4">
							<button
								type="submit"
								onClick={handleAddExpense}
								className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
								Save
							</button>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}